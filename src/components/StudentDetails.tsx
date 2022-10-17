import React from "react";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { EditStudentDetails } from "./EditStudentDetails";
import { ActionButton } from "./ActionButton";

export const StudentDetails = (props: {
  selectedStudent: string;
  setSelectedStudent: any;
  classStudentData: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  }[];
  editState: boolean;
  setEditState: any;
  mutate: any;
}) => {
  type StudentDetailType = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };

  type Params = {
    user: string;
    classID: string;
  };

  const { user, classID } = useParams<keyof Params>() as Params;

  const [selectedStudentDetails, setSelectedStudentDetails] =
    React.useState<StudentDetailType>({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
    });

  React.useEffect(() => {
    props.classStudentData.forEach((student) => {
      if (props.selectedStudent === student.id) {
        setSelectedStudentDetails({
          id: student.id,
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
        });
      }
    });
  }, [props.selectedStudent]);

  return (
    <div className="studentDetailsPanel">
      {props.editState ? (
        <EditStudentDetails
          setSelectedStudent={props.setSelectedStudent}
          selectedStudentDetails={selectedStudentDetails}
          editState={props.editState}
          setEditState={props.setEditState}
          mutate={props.mutate}
        ></EditStudentDetails>
      ) : (
        <div className="studentDetailsGrid">
          <div className="studentDetailsRow">
            <b>First Name:</b>
            <div>{selectedStudentDetails.firstname}</div>
          </div>
          <div className="studentDetailsRow">
            <b>Last Name:</b> <div>{selectedStudentDetails.lastname}</div>
          </div>
          <div className="studentDetailsRow">
            <b>Student ID:</b> <div>{selectedStudentDetails.id}</div>
          </div>
          <div className="studentDetailsRow">
            <b>Email:</b> <div>{selectedStudentDetails.email}</div>
          </div>
        </div>
      )}
      {!props.editState && (
        <div className="editMarksAndStudentDetailsButtonContainer">
          <ActionButton
            className="muiButton"
            onClick={() => props.setEditState((prev: boolean) => !prev)}
          >
            <span>Edit Details </span>
            <EditIcon style={{ marginLeft: "10px" }}></EditIcon>
          </ActionButton>
        </div>
      )}
    </div>
  );
};
