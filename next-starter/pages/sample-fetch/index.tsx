import React, { useEffect, useState } from "react";

function SimpleFetch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search}`
      );
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(JSON.stringify(error));
    }
    setLoading(false);
  };
  useEffect(() => {
    if (search) fetchData();
  }, [search]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      Pokemon{inputText}
      <input onChange={(e) => setInputText(e.target.value)}></input>
      <button type="button" onClick={() => setSearch(inputText)}>
        Search
      </button>
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>{JSON.stringify(error)}</p>}
    </div>
  );
}

export default SimpleFetch;
