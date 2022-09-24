import React, { ReactElement } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useParams } from "react-router-dom";

export const CreateNewClassForm = (props: { modalController: any }) => {
  type ClassParams = {
    user: string;
  };

  const { user } = useParams<keyof ClassParams>() as ClassParams;

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

  async function createNewClassSubmit(user: string, formState: FormState) {
    let response = await fetch(`http://localhost:8000/${user}`, {
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
        <label htmlFor="nameOfNewClass">Class Name:</label>
        <TextField
          onChange={textFieldChangeHandler}
          name="nameOfNewClass"
          style={{ backgroundColor: "white" }}
          placeholder="e.g. Science 101"
          value={formState.nameOfNewClass}
        ></TextField>
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
      <Button type="submit" style={iconButtonStyle}>
        Create Class
      </Button>
    </form>
  );
};
