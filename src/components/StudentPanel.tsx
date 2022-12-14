import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { CreateNewStudentForm } from "./CreateNewStudentForm";
import { StudentDetails } from "./StudentDetails";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import LoadingSkeletonBoxes from "./LoadingSkeletonBoxes";
import Divider from "@mui/material/Divider";

export const StudentPanel = (props: { setNavState: any }): JSX.Element => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  const { data, error, isValidating, mutate } = useSWR(
    `https://class-space.herokuapp.com/${user}/${classID}/students`
  );

  React.useEffect(() => props.setNavState("Students"));

  const [selectedStudent, setSelectedStudent] = React.useState<string>();

  const [studentModalOpen, setStudentModalOpen] =
    React.useState<boolean>(false);

  const [editState, setEditState] = React.useState<boolean>(false);

  return (
    <div className="studentPanel">
      <Modal
        open={studentModalOpen}
        closeModal={() => {
          setStudentModalOpen(false);
        }}
        children={
          <CreateNewStudentForm
            modalController={setStudentModalOpen}
            mutate={mutate}
          ></CreateNewStudentForm>
        }
      ></Modal>
      <div className="selectorColumn">
        <div
          className="assignmentOrStudentSelectorBox newAssignmentOrStudent"
          onClick={() => setStudentModalOpen(true)}
        >
          <AddIcon></AddIcon>
        </div>
        <Divider style={{ margin: "15px" }}></Divider>
        {data && !isValidating ? (
          data.classInfo && data.classInfo.length > 0 ? (
            data.classInfo.map((item: any) => {
              if (item.students) {
                return (
                  <div
                    className={
                      selectedStudent === item.students
                        ? "assignmentOrStudentSelectorBox selectedAssignmentOrStudent"
                        : "assignmentOrStudentSelectorBox"
                    }
                    key={item.students}
                    onClick={
                      selectedStudent === item.students
                        ? () => {
                            return;
                          }
                        : () => {
                            setEditState(false);
                            setSelectedStudent(item.students);
                          }
                    }
                  >
                    {`${item.firstname} ${item.lastname}`}
                  </div>
                );
              }
            })
          ) : (
            <h3>No students found.</h3>
          )
        ) : (
          <>
            {error ? (
              <h3>"There was an error retrieving your student list."</h3>
            ) : (
              <LoadingSkeletonBoxes type="" />
            )}
          </>
        )}
      </div>
      {selectedStudent && data ? (
        <StudentDetails
          editState={editState}
          setEditState={setEditState}
          classStudentData={data.classInfo}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          mutate={mutate}
        ></StudentDetails>
      ) : null}
    </div>
  );
};
