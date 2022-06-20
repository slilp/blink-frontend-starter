import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { useState } from "react";

function Signin({ providers }: any) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <input
        style={{ padding: "10px" }}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        style={{ padding: "10px" }}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  username: username,
                  password: password,
                })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
}
