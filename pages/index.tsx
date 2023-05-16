import { GetStaticProps } from "next";
import { createPosts, getPosts } from "../lib/notion";
import { filterPosts, sortPosts } from "../util/notion";
import { BlogPost } from "../types/notion";
import { ONE_DAY_IN_SECONDS } from "../util/constants";

type Props = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(process.env.NOTION_DATABASE_ID);
  const publishedPosts = filterPosts(posts);
  const sortedPosts = sortPosts(publishedPosts);

  // This prevents the files being created on every local build
  if (process.env.NODE_ENV === "production") {
    await createPosts(posts);
  }

  return {
    props: {
      posts: sortedPosts,
    },
    revalidate: ONE_DAY_IN_SECONDS,
  };
};

export default function Home({ posts }: Props) {
  return (
    <main>
      <h1>ISR Notion Example</h1>

      <section>
        <h2>Blog posts</h2>

        {posts.map((post) => {
          const title = post.properties.page.title[0].plain_text;
          const description = post.properties.abstract.rich_text[0].plain_text;
          const publishDate = post.properties.date.date.start;
          const url = `/${post.properties.slug.rich_text[0].plain_text}`;
          const tags = post.properties.tags.multi_select
            .map(({ name }) => name)
            .join(", ");

          return (
            <article key={post.id}>
              <a href={url}>
                <h3>{title}</h3>
              </a>

              <p>{description}</p>

              <ul>
                <li>Published: {publishDate}</li>
                <li>Tags: {tags}</li>
              </ul>
            </article>
          );
        })}
      </section>
    </main>
  );
}
