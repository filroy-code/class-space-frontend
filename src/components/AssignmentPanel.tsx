import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { AssignmentMarksTable } from "./AssignmentMarksTable";

export const AssignmentPanel = (): JSX.Element => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  const { data: classAssignmentData, error: classAssignmentError } = useSWR(
    `http://localhost:8000/${user}/${classID}/`
  );

  const [selectedAssignment, setSelectedAssignment] = React.useState<string>();

  //   type ClassInfo = {
  //     students: string;
  //     assignments: string;
  //     admins: string;
  //   };

  // to do: add a message for when no assignments are found
  return (
    <div className="assignmentPanel">
      {classAssignmentData ? (
        classAssignmentData.classInfo.map((item: any) => {
          if (item.assignments) {
            return (
              <div
                className="assignmentBox"
                key={item.assignments}
                data-assignmentname={item.assignments}
                onClick={(event) => {
                  const result = (event.target as HTMLDivElement).dataset
                    .assignmentname;
                  setSelectedAssignment(result);
                }}
              >
                {item.assignments}
              </div>
            );
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
          {classAssignmentError
            ? "There was an error retrieving your assignments."
            : "Loading..."}
        </h1>
      )}
      {selectedAssignment ? (
        <AssignmentMarksTable
          selectedAssignment={selectedAssignment}
        ></AssignmentMarksTable>
      ) : null}
    </div>
  );
};
