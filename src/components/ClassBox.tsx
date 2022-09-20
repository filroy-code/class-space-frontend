import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSelectionDataShape } from "./ClassSelection";

export const ClassBox = (props: {
  classData: ClassSelectionDataShape;
  onClick: (event: React.MouseEvent) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  type Params = {
    user: string;
  };
  const { user } = useParams<keyof Params>() as Params;
  return (
    <div
      className="classBox"
      onClick={() => navigate(`/${user}/${props.classData.name}`)}
    >
      {props.classData.name}
    </div>
  );
};
