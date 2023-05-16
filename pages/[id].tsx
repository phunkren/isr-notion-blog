import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMdx from "remark-mdx";
import { createPosts, getPostData, getPosts, getPostsIds } from "../lib/notion";
import { ONE_WEEK_IN_SECONDS } from "../util/constants";
import { filterPosts } from "../util/notion";

type Props = {
  postData: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(process.env.NOTION_DATABASE_ID);
  const publishedPosts = filterPosts(posts);

  await createPosts(publishedPosts);

  const paths = getPostsIds();

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params.id as string;
  const postData = await getPostData(postId);

  return {
    props: {
      postData,
    },
    revalidate: ONE_WEEK_IN_SECONDS,
  };
};

export default function BlogPost({ postData }: Props) {
  return (
    <main>
      <Link href="/">Back to homepage</Link>

      <article>
        <ReactMarkdown remarkPlugins={[remarkMdx]}>{postData}</ReactMarkdown>
      </article>
    </main>
  );
}
