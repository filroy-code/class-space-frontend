import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useParams } from "react-router-dom";

export const CreateNewStudentForm = (props: {
  modalController: any;
  mutate: any;
}) => {
  const { user, classID } = useParams();

  const iconButtonStyle = {
    margin: "5px 0px",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  const selectedIconButtonStyle = {
    margin: "5px 0px",
    backgroundColor: "rgb(50, 200, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  const textFieldStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  };

  function modalClick(e: any) {
    e.stopPropagation();
  }

  type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    studentID: string;
    formType: "student";
  };

  const [formState, setFormState] = React.useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    studentID: "",
    formType: "student",
  });

  function textFieldChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setFormState({ ...formState, [target.name]: target.value });
  }

  async function createNewStudentSubmit(formState: FormState) {
    let response = await fetch(`http://localhost:8000/${user}/${classID}`, {
      method: "POST",
      mode: "cors",
      headers: { Origin: "localhost:8000", "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (response.status === 200) {
      props.modalController(false);
      props.mutate(`http://localhost:8000/${user}/${classID}/students`);
    } else {
      console.log("there was an error");
    }
    console.log(formState);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createNewStudentSubmit(formState);
      }}
      onClick={modalClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "30rem",
        width: "30rem",
        padding: "20px",
      }}
    >
      <h2>New Student:</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={textFieldStyle}>
          <label htmlFor="firstName">First Name:</label>
          <TextField
            onChange={textFieldChangeHandler}
            name="firstName"
            style={{ backgroundColor: "white" }}
            placeholder="First Name"
            value={formState.firstName}
          ></TextField>
        </div>
        <div style={textFieldStyle}>
          <label htmlFor="lastName">Last Name:</label>
          <TextField
            onChange={textFieldChangeHandler}
            name="lastName"
            style={{ backgroundColor: "white" }}
            placeholder="Last Name"
            value={formState.lastName}
          ></TextField>
        </div>
        <div style={textFieldStyle}>
          <label htmlFor="email">Email:</label>
          <TextField
            type="email"
            onChange={textFieldChangeHandler}
            name="email"
            style={{ backgroundColor: "white" }}
            placeholder="Email"
            value={formState.email}
          ></TextField>
        </div>
        <div style={textFieldStyle}>
          <label htmlFor="studentID">Student ID:</label>
          <TextField
            type="studentID"
            onChange={textFieldChangeHandler}
            name="studentID"
            style={{ backgroundColor: "white" }}
            placeholder="Student ID"
            value={formState.studentID}
          ></TextField>
        </div>
      </div>
      <Button type="submit" style={iconButtonStyle}>
        Add Student
      </Button>
    </form>
  );
};
