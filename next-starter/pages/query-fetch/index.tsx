import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useFetchPokemon = (name: string) =>
  useQuery(
    ["pokemon", name],
    async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return await response.json();
    },
    {
      enabled: name !== "",
    }
  );

function ReactQueryPage() {
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const pokemonQuery = useFetchPokemon(search);
  return (
    <div>
      Pokemon
      <input onChange={(e) => setInputText(e.target.value)}></input>
      <button type="button" onClick={() => setSearch(inputText)}>
        Search
      </button>
      {pokemonQuery.isLoading && pokemonQuery.fetchStatus === "idle" ? null : (
        <>
          {pokemonQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {pokemonQuery.data && <p>{JSON.stringify(pokemonQuery.data)}</p>}
              {pokemonQuery.isError && (
                <p>{JSON.stringify(pokemonQuery.error)}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReactQueryPage;
