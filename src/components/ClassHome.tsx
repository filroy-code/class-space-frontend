import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BarChartIcon from "@mui/icons-material/BarChart";

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
        <h3>Students</h3>
        <PeopleIcon></PeopleIcon>
      </div>
      <div
        className="classHomeSelector"
        onClick={() => navigate(`/${user}/${classID}/assignments`)}
      >
        <h3>Assignments</h3>
        <LibraryBooksIcon></LibraryBooksIcon>
      </div>
      <div
        className="classHomeSelector"
        onClick={() => navigate(`/${user}/${classID}/summary`)}
      >
        <h3>Summary</h3>
        <BarChartIcon></BarChartIcon>
      </div>
      {/* <div
        className="classHomeSelector"
        // onClick={() => navigate(`/${user}/${classID}/assignments`)}
      >
        Tracker
      </div> */}
    </div>
  );
};
