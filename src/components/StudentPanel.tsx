import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { CreateNewStudentForm } from "./CreateNewStudentForm";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";

export const StudentPanel = (): JSX.Element => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  const { data, error } = useSWR(`http://localhost:8000/${user}/${classID}/`);

  const [selectedStudent, setSelectedStudent] = React.useState<string>();

  const [studentModalOpen, setStudentModalOpen] =
    React.useState<boolean>(false);

  if (data) {
    console.log(data);
  }
  // to do: add a message for when no students are found
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
          ></CreateNewStudentForm>
        }
      ></Modal>
      <div className="studentSelectorColumn">
        <div
          className="assignmentOrStudentSelectorBox"
          onClick={() => setStudentModalOpen(true)}
        >
          <AddIcon></AddIcon>
        </div>
        {data ? (
          data.classInfo.map((item: any) => {
            if (item.students) {
              return (
                <div
                  className="assignmentOrStudentSelectorBox"
                  key={item.students}
                  data-studentname={item.students}
                  onClick={(event) => {
                    const result = (event.target as HTMLDivElement).dataset
                      .studentname;
                    setSelectedStudent(result);
                  }}
                >
                  {item.students}
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
            {error
              ? "There was an error retrieving your student list."
              : "Loading..."}
          </h1>
        )}
      </div>
      {selectedStudent ? (
        <div className="markUpdatePanel">
          <h2>{selectedStudent}</h2>
        </div>
      ) : null}
    </div>
  );
};
