import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchPokemon = (name: string) =>
  useQuery(
    ["pokemon", name],
    async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return await response.json();
    },
    {
      enabled: name !== "",
      staleTime: 1000 * 60,
    }
  );

function ReactQueryPage() {
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const pokemonQuery = useFetchPokemon(search);
  const queryClient = useQueryClient();

  return (
    <div>
      Pokemon
      <input onChange={(e) => setInputText(e.target.value)}></input>
      <button type="button" onClick={() => setSearch(inputText)}>
        Search
      </button>
      <button
        onClick={() => queryClient.refetchQueries(["pokemon", "pikachu"])}
      >
        refetchQueries
      </button>
      <button
        onClick={() => queryClient.invalidateQueries(["pokemon", "pikachu"])}
      >
        invalidateQueries
      </button>
      <button onClick={() => queryClient.refetchQueries(["pokemon"])}>
        refetchQueries ALL
      </button>
      <button onClick={() => queryClient.invalidateQueries(["pokemon"])}>
        invalidateQueries ALL
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
