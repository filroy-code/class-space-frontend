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

  //this exists as a value to compare updates against to determine if there's been a change
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
    setUpdatedStudentDetails({
      ...updatedStudentDetails,
      [event.target.name]: event.target.value,
    });
  }

  React.useEffect(() => {
    setInitialStudentDetails(props.selectedStudentDetails);
    setUpdatedStudentDetails(props.selectedStudentDetails);
  }, []);
  return updatedStudentDetails ? (
    <div className="studentDetailsGrid">
      <div className="studentDetailsRow">
        <b>First Name:</b>
        <TextField
          value={updatedStudentDetails.firstname}
          name="firstname"
          onChange={(e) => textFieldChangeHandler(e)}
        ></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Last Name:</b>
        <TextField
          value={updatedStudentDetails.lastname}
          name="lastname"
          onChange={(e) => textFieldChangeHandler(e)}
        ></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Student ID:</b>
        <TextField
          value={updatedStudentDetails.id}
          name="id"
          onChange={(e) => textFieldChangeHandler(e)}
        ></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Email:</b>
        <TextField
          value={updatedStudentDetails.email}
          name="email"
          onChange={(e) => textFieldChangeHandler(e)}
        ></TextField>
      </div>
      <div className="editMarksAndStudentDetailsButtonContainer">
        <Button
          variant="outlined"
          onClick={() => console.log(updatedStudentDetails)}
        >
          SAVE
        </Button>
        <Button onClick={() => props.setEditState(false)} variant="outlined">
          DISCARD
        </Button>
      </div>
    </div>
  ) : null;
};
