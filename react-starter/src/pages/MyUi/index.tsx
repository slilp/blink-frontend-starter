import React from "react";
import { Button } from "@slil.pua/blink-ui";

function MyUi() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Button variant="primary">สวัสดี primary</Button>
      <Button variant="secondary">สวัสดี secondary</Button>
      <Button variant="error">สวัสดี error</Button>
      <Button variant="warning">สวัสดี warning</Button>
      <Button variant="success">สวัสดี success</Button>
    </div>
  );
}

export default MyUi;
