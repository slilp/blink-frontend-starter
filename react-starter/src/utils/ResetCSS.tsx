import React from "react";
import { Global, css, GlobalProps } from "@emotion/react";

export default function ResetCSS(props: GlobalProps) {
  return (
    <Global
      {...props}
      styles={css`
        * {
          font-family: Kanit;
        }
      `}
    />
  );
}
