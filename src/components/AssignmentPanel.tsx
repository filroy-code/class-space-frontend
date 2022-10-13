import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { AssignmentMarksTable } from "./AssignmentMarksTable";
import { CreateNewAssignmentForm } from "./CreateNewAssignmentForm";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import LoadingSkeletonBoxes from "./LoadingSkeletonBoxes";
import Divider from "@mui/material/Divider";

export const AssignmentPanel = (): JSX.Element => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  const {
    data: classAssignmentData,
    error: classAssignmentError,
    mutate,
    isValidating,
  } = useSWR(`http://localhost:8000/${user}/${classID}/assignments`);

  const [selectedAssignment, setSelectedAssignment] = React.useState<string>();

  const [assignmentModalOpen, setAssignmentModalOpen] =
    React.useState<boolean>(false);

  const [assignmentsExist, setAssignmentsExist] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    if (classAssignmentData) {
      classAssignmentData.classInfo &&
        classAssignmentData.classInfo.forEach((entry: any) => {
          if (entry.assignments) {
            setAssignmentsExist(true);
          }
        });
    }
  }, classAssignmentData);

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
            mutate={mutate}
          ></CreateNewAssignmentForm>
        }
      ></Modal>
      <div className="selectorColumn">
        <div
          data-testid="newAssignmentButton"
          className="assignmentOrStudentSelectorBox newAssignmentOrStudent"
          onClick={() => setAssignmentModalOpen(true)}
        >
          <AddIcon></AddIcon>
        </div>
        <Divider style={{ margin: "15px" }}></Divider>
        {classAssignmentData && !isValidating ? (
          assignmentsExist ? (
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
            <h3>No assignments found.</h3>
          )
        ) : (
          <>
            {classAssignmentError ? (
              <h3>"There was an error retrieving your assignments."</h3>
            ) : (
              <LoadingSkeletonBoxes type="" />
            )}
          </>
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
