import React, { useEffect } from "react";
import countStore from "../../zustand/countStore";
import { Link } from "react-router-dom";

function Zustand() {
  const inc = countStore((state) => state.inc);
  const count = countStore((state) => state.count);
  const count2 = countStore((state) => state.count2);
  const inc2 = countStore((state) => state.inc2);

  useEffect(() => {
    console.log("count");
  }, [count]);

  useEffect(() => {
    console.log("count2");
  }, [count2]);

  return (
    <div>
      <button data-testid="oneUp" onClick={inc}>
        one up
      </button>
      <h1 data-testid="oneUpText">{count}</h1>{" "}
      <Link to="/login">Change page</Link>
      <button onClick={inc2}>500 up</button>
      <h1 data-testid="twoUpText">{count2}</h1>
    </div>
  );
}

export default Zustand;
