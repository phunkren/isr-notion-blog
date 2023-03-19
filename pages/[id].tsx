import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMdx from "remark-mdx";
import { getPostData, getPostsIds } from "../lib/notion";
import { ONE_WEEK_IN_SECONDS } from "../util/constants";

type Props = {
  postData: string;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsIds();

  return {
    paths,
    fallback: false,
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
