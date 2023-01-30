import React, { useCallback, useEffect, useState } from "react";
import { TextField, Container, Grid, Button } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function ReactQueryPage() {
  const [status, setStatus] = useState<string>("one");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const queryClient = useQueryClient();

  // key is like useEffect action
  const statusQuery = useQuery(
    ["status", status],
    () => {
      return fetch(
        `https://ui.dev/api/courses/react-query/status?param=${status}`
      ).then((res) => res.json());
    },
    {
      staleTime: 10000,
      // cacheTime: 5000,
      refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: 500,
      // onError: (error: any) => {
      //   alert(error.messsage);
      // },
      retry: false,
      //initialData will be in cache
      // initialData: { status: "OK Initial" },
      //placeHolder not be in cache
      placeholderData: { status: "OK Initial" },
    }
  );

  const issuesQuery = useQuery(
    ["issues", { selectedLabel }],
    () =>
      fetch(
        `https://ui.dev/api/courses/react-query/issues?labels[]=${selectedLabel}`
      ).then((res) => res.json()),
    {
      enabled: !!selectedLabel,
    }
  );

  return (
    <Container sx={{ padding: "1rem" }}>
      {statusQuery.isLoading ? "Loading..." : JSON.stringify(statusQuery.data)}
      <Button onClick={() => setStatus("two")}>new fetching</Button>
      {/* This will filter all status key */}
      <Button onClick={() => queryClient.refetchQueries(["status", status])}>
        Refetch will query although inactive
      </Button>
      {/* This will filter exact status key */}
      <Button
        onClick={() => queryClient.refetchQueries(["status"], { exact: true })}
      >
        Refetch Exact
      </Button>
      <Button onClick={() => queryClient.refetchQueries({ type: "active" })}>
        Refetch All
      </Button>
      <Button onClick={() => queryClient.invalidateQueries(["status"])}>
        Invalidate only active
      </Button>

      {issuesQuery.status + "status"}

      {issuesQuery.status === "loading" &&
      issuesQuery.fetchStatus === "idle" ? null : (
        <>
          <h2>Issues</h2>
          {issuesQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {issuesQuery.data.map((issue: any) => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
      <Button onClick={() => setSelectedLabel("Hello")}>
        Start label fetch
      </Button>
      <Button onClick={() => setSelectedLabel("")}>End label fetch</Button>
    </Container>
  );
}

export default ReactQueryPage;
