import React from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export const EditStudentDetails = (props: {
  selectedStudentDetails: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  setSelectedStudent: any;
  editState: boolean;
  setEditState: any;
  mutate: any;
}) => {
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;

  type StudentDetailsData = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };

  const iconButtonStyle = {
    margin: "10px 0px",
    backgroundColor: "rgb(238, 240, 235)",
    color: "rgb(21, 50, 67)",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1rem",
    zIndex: "1",
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

  async function submitStudentDetailChanges(
    studentDetails: StudentDetailsData
  ) {
    let response = await fetch(
      `http://localhost:8000/${user}/${classID}/students/${props.selectedStudentDetails.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Origin: "localhost:8000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails),
      }
    );
    if (response.status === 200) {
      props.mutate(`http://localhost:8000/${user}/${classID}/students`);
      // props.setSelectedStudent(updatedStudentDetails);
      props.setEditState(false);
    } else {
      console.log("there was an error");
    }
  }

  React.useEffect(() => {
    setInitialStudentDetails(props.selectedStudentDetails);
    setUpdatedStudentDetails(props.selectedStudentDetails);
  }, []);
  return updatedStudentDetails ? (
    <>
      {" "}
      <div className="editMarksAndStudentDetailsButtonContainer">
        <Button
          className="muiButton"
          style={iconButtonStyle}
          variant="outlined"
          onClick={() => submitStudentDetailChanges(updatedStudentDetails)}
        >
          SAVE
        </Button>
        <Button
          className="muiButton"
          onClick={() => props.setEditState(false)}
          variant="outlined"
          style={iconButtonStyle}
        >
          DISCARD
        </Button>
      </div>
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
      </div>
    </>
  ) : null;
};
