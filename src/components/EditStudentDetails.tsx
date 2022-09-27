import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const EditStudentDetails = (props: {
  selectedStudentDetails: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  editState: boolean;
  setEditState: any;
}) => {
  type StudentDetailsData = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  const [initialStudentDetails, setInitialStudentDetails] =
    React.useState<StudentDetailsData>({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
    });
  const [updatedStudentDetails, setUpdatedStudentDetails] =
    React.useState<StudentDetailsData>({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
    });

  function textFieldChangeHandler(event: any) {
    console.log(event);
  }

  React.useEffect(() => {
    setInitialStudentDetails(props.selectedStudentDetails);
    setUpdatedStudentDetails(props.selectedStudentDetails);
  }, []);
  return updatedStudentDetails ? (
    <>
      <div className="studentDetailsRow">
        <b>First Name:</b>
        <TextField
          value={updatedStudentDetails.firstname}
          onChange={(e) => textFieldChangeHandler(e)}
        ></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Last Name:</b>
        <TextField value={updatedStudentDetails.lastname}></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Student ID:</b>
        <TextField value={updatedStudentDetails.id}></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Email:</b>
        <TextField value={updatedStudentDetails.email}></TextField>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "15px",
          margin: "15px",
        }}
      >
        <Button variant="outlined">SAVE</Button>
        <Button onClick={() => props.setEditState(false)} variant="outlined">
          DISCARD
        </Button>
      </div>
    </>
  ) : null;
};
