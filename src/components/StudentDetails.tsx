import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { EditStudentDetails } from "./EditStudentDetails";

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
  const iconButtonStyle = {
    margin: "10px 0px",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1rem",
  };

  const selectedIconButtonStyle = {
    margin: "10px 0px",
    backgroundColor: "rgb(50, 200, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

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
      {!props.editState && (
        <div className="editMarksAndStudentDetailsButtonContainer">
          <IconButton
            onClick={() => props.setEditState((prev: boolean) => !prev)}
            style={props.editState ? selectedIconButtonStyle : iconButtonStyle}
          >
            <span>Edit Details </span>
            <EditIcon style={{ marginLeft: "10px" }}></EditIcon>
          </IconButton>
        </div>
      )}
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
    </div>
  );
};
