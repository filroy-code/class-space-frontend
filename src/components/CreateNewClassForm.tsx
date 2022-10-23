import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useParams } from "react-router-dom";
import { ActionButton } from "./ActionButton";

export const CreateNewClassForm = (props: {
  modalController: any;
  mutate: any;
}) => {
  type ClassParams = {
    user: string;
  };

  const { user } = useParams<keyof ClassParams>() as ClassParams;

  const iconButtonStyle = {
    margin: "10px 0px",
    backgroundColor: "rgb(238, 240, 235)",
    color: "rgb(21, 50, 67)",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1rem",
    zIndex: "1",
  };

  const selectedIconButtonStyle = {
    margin: "5px 0px",
    backgroundColor: "rgb(21, 50, 67)",
    color: "rgb(238, 240, 235)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  type IconButtonType = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    name: string;
  };

  const iconButtonArray: IconButtonType[] = [
    { icon: ScienceIcon, name: "science" },
    { icon: GroupsIcon, name: "social" },
    { icon: EngineeringIcon, name: "tech" },
    { icon: SportsBasketballIcon, name: "physed" },
  ];

  function modalClick(e: any) {
    e.stopPropagation();
  }

  type FormState = {
    nameOfNewClass: string;
    selectedIcon: string;
  };

  const [formState, setFormState] = React.useState<FormState>({
    nameOfNewClass: "",
    selectedIcon: "",
  });

  function textFieldChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setFormState({
      nameOfNewClass: target.value.replaceAll(" ", "_"),
      selectedIcon: formState.selectedIcon,
    });
  }

  function selectedIconChangeHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = e.target as HTMLButtonElement;
    setFormState({
      nameOfNewClass: formState.nameOfNewClass,
      selectedIcon: target.id,
    });
  }

  const [textfieldError, setTextfieldError] = React.useState<boolean>(false);

  async function createNewClassSubmit(user: string, formState: FormState) {
    if (formState.nameOfNewClass.length < 1) {
      setTextfieldError(true);
      return;
    }
    setTextfieldError(false);
    let response = await fetch(`https://class-space.herokuapp.com/${user}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (response.status === 200) {
      props.modalController(false);
      props.mutate(`https://class-space.herokuapp.com/${user}`);
    } else {
      console.log("there was an error");
    }
  }

  return (
    <form
      className="createNewClassForm"
      onClick={modalClick}
      onSubmit={(e) => {
        e.preventDefault();
        createNewClassSubmit(user, formState);
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
      <h2>New Class:</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="nameOfNewClass">Class Name: </label>
          <TextField
            error={textfieldError ? true : false}
            helperText={textfieldError && "This field cannot be left blank."}
            onChange={textFieldChangeHandler}
            name="nameOfNewClass"
            style={{ backgroundColor: "white", padding: "10px" }}
            placeholder="e.g. Science 101"
            value={formState.nameOfNewClass}
          ></TextField>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          border: "1px solid black",
          padding: "5px",
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        {iconButtonArray.map((icon) => {
          return (
            <IconButton
              key={icon.name}
              onClick={selectedIconChangeHandler}
              id={icon.name}
              size="large"
              style={
                formState.selectedIcon === icon.name
                  ? selectedIconButtonStyle
                  : iconButtonStyle
              }
            >
              <icon.icon
                style={{ pointerEvents: "none" }}
                fontSize="large"
              ></icon.icon>
            </IconButton>
          );
        })}
      </div>
      <ActionButton type="submit">Create Class</ActionButton>
    </form>
  );
};
