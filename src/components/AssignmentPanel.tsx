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
    `http://localhost:8000/${user}/${classID}/assignments`
  );

  const [selectedAssignment, setSelectedAssignment] = React.useState<string>();

  const [assignmentModalOpen, setAssignmentModalOpen] =
    React.useState<boolean>(false);

  //   type ClassInfo = {
  //     students: string;
  //     assignments: string;
  //     admins: string;
  //   };

  if (classAssignmentData) {
    console.log(classAssignmentData);
  }

  // to do: add a message for when no assignments are found
  return (
    <div className="assignmentPanel">
      <Modal
        open={assignmentModalOpen}
        closeModal={() => {
          setAssignmentModalOpen(false);
        }}
        children={
          <CreateNewAssignmentForm
            modalController={setAssignmentModalOpen}
          ></CreateNewAssignmentForm>
        }
      ></Modal>
      <div className="selectorColumn">
        <div
          className="assignmentOrStudentSelectorBox"
          onClick={() => setAssignmentModalOpen(true)}
        >
          <AddIcon></AddIcon>
        </div>
        {classAssignmentData ? (
          classAssignmentData.classInfo.map((item: any) => {
            if (item.assignments) {
              return (
                <div
                  className="assignmentOrStudentSelectorBox"
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
