import React, { useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

const withAuthen = (Component: any) => (props: any) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log(loading);
    console.log(JSON.stringify(session));
    if (!loading) {
      if (!session) {
        console.log("Logout");
        // signIn();
        signOut({ callbackUrl: "/api/auth/signin" });
      }
    }
  }, [loading]);

  //   useEffect(() => {
  //     if (!loading) {
  //       if (
  //         session?.error === "RefreshAccessTokenError" ||
  //         status !== "unauthenticated"
  //       ) {
  //         signOut({ callbackUrl: "/api/auth/signin" });
  //       }
  //     }
  //   }, [session]);

  return <Component {...props} />;
};

export default withAuthen;
