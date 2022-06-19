import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface MultiProps {
  title: string[];
}

function MultiPath({ title }: MultiProps) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>{JSON.stringify(title)}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  //you can fetching api here to get all paths
  return {
    paths: [
      { params: { slug: ["one", "two", "three"] } },
      { params: { slug: ["three", "two", "one"] } },
    ],
    fallback: true,
  };
}

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<MultiProps>> => {
  //you can fetching api here
  const { slug } = context.params as IParams;

  return {
    props: {
      title: slug,
    },
  };
};

export default MultiPath;
