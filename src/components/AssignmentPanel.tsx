import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export const AssignmentPanel = (): JSX.Element => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  const { data, error } = useSWR(`http://localhost:8000/${user}/${classID}/`);

  type ClassInfo = {
    students: string;
    assignments: string;
    admins: string;
  };

  const [assignments, setAssignments] = React.useState<ClassInfo[]>([]);

  console.log(data);
  return (
    <div>
      {data ? (
        data.classInfo.map((item: any) => {
          if (item.assignments) {
            return <div key={item.assignments}>{item.assignments}</div>;
          }
        })
      ) : (
        // data.classInfo.assignments ? (
        //   data.classInfo.assignments.map((assignment: string) => {
        //     return <div>{assignment}</div>;
        //   })
        // ) : (
        //   <h1>No assignments found.</h1>
        // )
        <h1>
          {error
            ? "There was an error retrieving your assignments."
            : "Loading..."}
        </h1>
      )}
    </div>
  );
};
