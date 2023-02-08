import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useFetchGithubUser = () =>
  useQuery(
    ["github"],
    async () => {
      const response = await fetch("https://api.github.com/user", {
        headers: new Headers({
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_TOKEN,
        }),
      });
      return await response.json();
    },
    {
      cacheTime: 0,
    }
  );

const editName = async (name: string) => {
  const response = await fetch("https://api.github.com/user", {
    method: "PATCH",
    headers: new Headers({
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    }),
    body: JSON.stringify({
      name,
    }),
  });
  return await response.json();
};

function ReactQueryPage() {
  const [inputText, setInputText] = useState("");
  const user = useFetchGithubUser();
  const queryClient = useQueryClient();

  const changeNameMutation = useMutation({
    mutationFn: editName,
    onError: (error) => alert(error),
    onSuccess: (data) => queryClient.invalidateQueries(["github"]),
  });

  return (
    <div>
      Github
      <input onChange={(e) => setInputText(e.target.value)}></input>
      <button
        type="button"
        disabled={changeNameMutation.isLoading}
        onClick={() => changeNameMutation.mutate(inputText)}
      >
        Save
      </button>
      <p>
        My name is {user.isFetching ? "..." : JSON.stringify(user.data.name)}
      </p>
    </div>
  );
}

export default ReactQueryPage;
