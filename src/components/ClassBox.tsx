import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSelectionDataShape } from "./ClassSelection";

export const ClassBox = (props: {
  classData: ClassSelectionDataShape;
  onClick?: (event: React.MouseEvent) => void;
  deleteMode: string | undefined;
}): JSX.Element => {
  const navigate = useNavigate();
  type Params = {
    user: string;
  };
  const { user } = useParams<keyof Params>() as Params;

  const styleWhileSelecting = {};

  const [selected, setSelected] = React.useState<boolean>(false);
  return (
    <div
      style={
        selected && props.deleteMode ? { backgroundColor: "red" } : undefined
      }
      className={props.deleteMode ? "classBox classBoxSelecting" : "classBox"}
      onClick={
        props.deleteMode
          ? () => {
              setSelected((prev) => !prev);
            }
          : () => navigate(`/${user}/${props.classData.name}`)
      }
    >
      {props.classData.name}
    </div>
  );
};
