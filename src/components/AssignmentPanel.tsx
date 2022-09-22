import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { AssignmentMarksTable } from "./AssignmentMarksTable";
import { CreateNewAssignmentForm } from "./CreateNewAssignmentForm";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";

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

  const [assignmentModalOpen, setAssignmentModalOpen] =
    React.useState<boolean>(false);

  //   type ClassInfo = {
  //     students: string;
  //     assignments: string;
  //     admins: string;
  //   };

  // to do: add a message for when no assignments are found
  return (
    <div className="assignmentPanel">
      <Modal
        open={assignmentModalOpen}
        closeModal={() => {
          setAssignmentModalOpen(false);
        }}
        children={<CreateNewAssignmentForm></CreateNewAssignmentForm>}
      ></Modal>
      <div className="assignmentSelectorColumn">
        <div
          className="assignmentBox"
          onClick={() => setAssignmentModalOpen(true)}
        >
          <AddIcon></AddIcon>
        </div>
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
      </div>
      {selectedAssignment ? (
        <div className="markUpdatePanel">
          <h2>{selectedAssignment}</h2>
          <AssignmentMarksTable
            selectedAssignment={selectedAssignment}
          ></AssignmentMarksTable>
        </div>
      ) : null}
    </div>
  );
};
