import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ClassHome = (): JSX.Element => {
  const navigate = useNavigate();
  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;
  return (
    <div className="classHome">
      <div
        className="classHomeSelector"
        onClick={() => navigate(`/${user}/${classID}/students`)}
      >
        Students
      </div>
      <div
        className="classHomeSelector"
        onClick={() => navigate(`/${user}/${classID}/assignments`)}
      >
        Assignments
      </div>
      <div
        className="classHomeSelector"
        onClick={() => navigate(`/${user}/${classID}/summary`)}
      >
        Summary
      </div>
      <div
        className="classHomeSelector"
        // onClick={() => navigate(`/${user}/${classID}/assignments`)}
      >
        Tracker
      </div>
    </div>
  );
};
