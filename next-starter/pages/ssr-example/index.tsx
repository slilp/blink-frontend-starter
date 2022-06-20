import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomeProps>> => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session || session?.error === "RefreshAccessTokenError") {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
    };
  }

  return {
    props: {
      title: "HELLO WORLD NEXT.JS ",
      randomNumber: Math.random(),
    },
  };
};

export default Home;
