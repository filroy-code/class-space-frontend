import React from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { ActionButton } from "./ActionButton";

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
      `https://class-space.herokuapp.com/${user}/${classID}/students/${props.selectedStudentDetails.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails),
      }
    );
    if (response.status === 200) {
      props.mutate(
        `https://class-space.herokuapp.com/${user}/${classID}/students`
      );
      // props.setSelectedStudent(updatedStudentDetails);
      props.setEditState(false);
    } else {
      console.log("there was an error");
    }
  }

  const inputRef = React.useRef<any>(null);

  React.useEffect(() => {
    setInitialStudentDetails(props.selectedStudentDetails);
    setUpdatedStudentDetails(props.selectedStudentDetails);
  }, []);
  return updatedStudentDetails ? (
    <>
      <div className="studentDetailsGrid">
        <div className="studentDetailsRow">
          <b>First Name:</b>
          <input
            type="text"
            value={updatedStudentDetails.firstname}
            name="firstname"
            onChange={(e) => textFieldChangeHandler(e)}
            onClick={(event) => {
              inputRef.current = event.target;
              inputRef.current.select();
            }}
          ></input>
        </div>
        <div className="studentDetailsRow">
          <b>Last Name:</b>
          <input
            type="text"
            value={updatedStudentDetails.lastname}
            name="lastname"
            onClick={(event) => {
              inputRef.current = event.target;
              inputRef.current.select();
            }}
            onChange={(e) => textFieldChangeHandler(e)}
          ></input>
        </div>
        <div className="studentDetailsRow">
          <b>Student ID:</b>
          <input
            type="text"
            value={updatedStudentDetails.id}
            name="id"
            onClick={(event) => {
              inputRef.current = event.target;
              inputRef.current.select();
            }}
            onChange={(e) => textFieldChangeHandler(e)}
          ></input>
        </div>
        <div className="studentDetailsRow">
          <b>Email:</b>
          <input
            type="email"
            value={updatedStudentDetails.email}
            name="email"
            onClick={(event) => {
              inputRef.current = event.target;
              inputRef.current.select();
            }}
            onChange={(e) => textFieldChangeHandler(e)}
          ></input>
        </div>
      </div>
      <div className="editMarksAndStudentDetailsButtonContainer">
        <ActionButton
          className="muiButton"
          variant="outlined"
          onClick={() => submitStudentDetailChanges(updatedStudentDetails)}
        >
          SAVE
        </ActionButton>
        <ActionButton
          className="muiButton"
          onClick={() => props.setEditState(false)}
          variant="outlined"
        >
          DISCARD
        </ActionButton>
      </div>
    </>
  ) : null;
};
