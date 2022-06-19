import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface ProductProps {
  title: string;
}

function Product({ title }: ProductProps) {
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
      <h1>{title}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  //you can fetching api here to get all paths
  return {
    paths: [
      { params: { id: "product-1" } },
      { params: { id: "product-2" } },
      { params: { id: "priduct-3" } },
    ],
    fallback: true,
  };
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ProductProps>> => {
  //you can fetching api here
  const { id } = context.params as IParams;

  return {
    props: {
      title: id,
    },
  };
};

export default Product;
