import React, { ReactElement } from "react";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useParams } from "react-router-dom";

export const CreateNewAssignmentForm = (props: { modalController: any }) => {
  const { user, classID } = useParams();

  const iconButtonStyle = {
    margin: "20px 0px",
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

  type IconButtonType = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    name: string;
  };

  function modalClick(e: any) {
    e.stopPropagation();
  }

  type FormState = {
    assignmentName: string;
    totalMarks: string;
    formType: "assignment";
  };

  const [formState, setFormState] = React.useState<FormState>({
    assignmentName: "",
    totalMarks: "",
    formType: "assignment",
  });

  function textFieldChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setFormState({
      ...formState,
      [target.name]: target.value.replaceAll(" ", "_"),
    });
  }

  const [textfieldError, setTextfieldError] = React.useState<boolean>(false);

  async function createNewAssignmentSubmit(formState: FormState) {
    if (isNaN(parseInt(formState.totalMarks))) {
      setTextfieldError(true);
      return;
    }
    let response = await fetch(`http://localhost:8000/${user}/${classID}`, {
      method: "POST",
      mode: "cors",
      headers: { Origin: "localhost:8000", "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (response.status === 200) {
      props.modalController(false);
    } else {
      console.log("there was an error");
    }
    console.log(formState);
  }

  return (
    <form
      onClick={(e) => modalClick(e)}
      onSubmit={(e) => {
        e.preventDefault();
        createNewAssignmentSubmit(formState);
      }}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>New Assignment:</h2>
        <div style={textFieldStyle}>
          <label htmlFor="assignmentName">Assignment Name:</label>
          <TextField
            onChange={textFieldChangeHandler}
            name="assignmentName"
            style={{ backgroundColor: "white" }}
            placeholder="e.g. Chemistry Unit Test"
            value={formState.assignmentName}
          ></TextField>
        </div>
        <div style={textFieldStyle}>
          <label htmlFor="totalMarks">Total Marks:</label>
          <TextField
            error={textfieldError ? true : false}
            onChange={textFieldChangeHandler}
            name="totalMarks"
            style={{ backgroundColor: "white" }}
            placeholder="out of ____"
            value={formState.totalMarks ? formState.totalMarks : ""}
            helperText={textfieldError && "This value must be a number."}
          ></TextField>
        </div>
      </div>
      <Button type="submit" style={iconButtonStyle}>
        Create Assignment
      </Button>
    </form>
  );
};