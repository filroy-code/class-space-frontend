import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export const SummaryHome = (props: {}) => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;

  const { data, error, mutate, isValidating } = useSWR(
    `http://localhost:8000/${user}/${classID}/summary`
  );

  return <div>SummaryHome</div>;
};
