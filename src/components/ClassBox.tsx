import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSelectionDataShape } from "./ClassSelection";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import {
  SelectionData,
  classSelectReducer,
} from "../reducers/classSelectReducer";

export const ClassBox = (props: {
  classData: ClassSelectionDataShape;
  onClick?: (event: React.MouseEvent) => void;
  deleteMode: string | undefined;
  selected: boolean;
  dispatch: any;
}): JSX.Element => {
  const navigate = useNavigate();
  type Params = {
    user: string;
  };
  const { user } = useParams<keyof Params>() as Params;

  const displayedName = props.classData.name.split(/_(.*)/s)[1];

  let icon;
  switch (props.classData.icon) {
    case "science":
      icon = <ScienceIcon></ScienceIcon>;
      break;
    case "social":
      icon = <GroupsIcon></GroupsIcon>;
      break;
    case "physed":
      icon = <SportsBasketballIcon></SportsBasketballIcon>;
      break;
    case "tech":
      icon = <EngineeringIcon></EngineeringIcon>;
      break;
  }

  return (
    <div
      style={
        props.selected && props.deleteMode
          ? { backgroundColor: "red" }
          : undefined
      }
      className={props.deleteMode ? "classBox classBoxSelecting" : "classBox"}
      onClick={
        props.deleteMode
          ? () => {
              props.dispatch({
                type: "DELETE_SELECT",
                payload: { value: props.classData.name },
              });
            }
          : () => navigate(`/${user}/${props.classData.name}`)
      }
    >
      <div style={{ fontSize: "1.3rem" }}>{displayedName}</div>
      <div className="icon">{icon}</div>
    </div>
  );
};
