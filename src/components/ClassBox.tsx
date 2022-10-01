import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSelectionDataShape } from "./ClassSelection";
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
      {props.classData.name}
    </div>
  );
};
