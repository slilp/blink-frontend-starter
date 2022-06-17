import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  title: string;
}

function NestPost({ title }: PostProps) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  //you can fetching api here to get all paths
  return {
    paths: [
      { params: { id: "post-1", slug: "nest-post-1" } },
      { params: { id: "post-2", slug: "nest-post-2" } },
      { params: { id: "post-3", slug: "nest-post-3" } },
    ],
    fallback: true,
  };
}

interface IParams extends ParsedUrlQuery {
  id: string;
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PostProps>> => {
  //you can fetching api here
  const { id, slug } = context.params as IParams;

  return {
    props: {
      title: "Post " + id + " has nest " + slug,
    },
  };
};

export default NestPost;
