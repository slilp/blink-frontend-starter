import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import withAuthen from "../../auth/withAuth";

interface HomeProps {
  title: string;
  randomNumber: number;
}

function Home({ title, randomNumber }: HomeProps) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
      <h2>{randomNumber}</h2>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<HomeProps>> => {
  return {
    props: {
      title: "HELLO WORLD NEXT.JS ",
      randomNumber: Math.random(),
    },
  };
};

export default withAuthen(Home);
