/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const withAuthen = (Component: any) => (props: any) => {
  const { data: session, status }: any = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading) {
      if (!session || session?.user?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/api/auth/signin" });
      }
    }
  }, [loading]);

  return <Component {...props} />;
};

export default withAuthen;
