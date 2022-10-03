import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { TextField } from "@mui/material";

export const SummaryHome = (props: {}) => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;

  const { data, error, mutate, isValidating } = useSWR(
    `http://localhost:8000/${user}/${classID}/summary`
  );

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }
  return (
    <div className="summaryPanel">
      <div className="summaryRow">
        <div className="summaryColumn">
          <b>Assignment Name</b>
        </div>
        <div className="summaryColumn">
          <b>Weight</b>
        </div>
        <div className="summaryColumn">
          <b>Class Median</b>
        </div>
      </div>
      {data
        ? data.map((entry: any) => {
            if (entry.assignments) {
              return (
                <div className="summaryRow" key={entry.assignments}>
                  <div className="summaryColumn">{entry.assignments}</div>
                  <div className="summaryColumn">
                    <TextField>{entry.assignment_weight}</TextField>
                  </div>
                  <div className="summaryColumn"></div>
                </div>
              );
            }
          })
        : null}
    </div>
  );
};
