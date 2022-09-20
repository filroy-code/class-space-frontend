import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

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
  const { data: singleAssignmentData, error: singleAssignmentError } = useSWR(
    `http://localhost:8000/${user}/${classID}/${selectedAssignment}`
  );

  type ClassInfo = {
    students: string;
    assignments: string;
    admins: string;
  };

  const [assignments, setAssignments] = React.useState<ClassInfo[]>([]);

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
        <div className="assignmentMarksTable">
          <button onClick={() => console.log(singleAssignmentData)}>
            CLICK
          </button>
        </div>
      ) : null}
    </div>
  );
};
