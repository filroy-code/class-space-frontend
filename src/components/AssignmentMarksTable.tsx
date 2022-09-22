import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

export const AssignmentMarksTable = (props: {
  selectedAssignment: string;
}): JSX.Element => {
  React.useEffect(() => {
    setAssignmentMetaData({
      assignmentName: props.selectedAssignment,
      outof: undefined,
    });
  }, [props.selectedAssignment]);

  type AssignmentData = {
    assignmentInfo: {
      email: string;
      id: string;
      firstname: string;
      lastname: string;
      outof: number;
      score: number;
    }[];
  };

  const [assignmentMetaData, setAssignmentMetaData] = React.useState<{
    outof: number | undefined;
    assignmentName: string | undefined;
  }>({ outof: undefined, assignmentName: "" });

  type Params = {
    user: string;
    classID: string;
  };
  const { user, classID } = useParams<keyof Params>() as Params;

  const { data, error, isValidating } = useSWR<AssignmentData | undefined>(
    `http://localhost:8000/${user}/${classID}/${props.selectedAssignment}`
  );

  if (data) {
    console.log(data);
  }

  type FormattedMarksData = {
    student: { id: string; firstname: string; lastname: string };
    score: number | null | undefined;
  };

  const [studentMarks, setStudentMarks] = React.useState<FormattedMarksData[]>(
    []
  );

  React.useEffect(() => {
    data &&
      data.assignmentInfo.forEach((datum: any) => {
        if (datum.outof) {
          setAssignmentMetaData({ ...assignmentMetaData, outof: datum.outof });
        }
        if (datum.id) {
          setStudentMarks((prev) => [
            ...prev,
            {
              student: {
                firstname: datum.firstname,
                lastname: datum.lastname,
                id: datum.id,
              },
              score: datum.score,
            },
          ]);
        }
      });
  }, [data]);

  return data ? (
    <div>
      {studentMarks.map((singleStudent: any) => {
        return (
          <div className="tableRow" key={singleStudent.student.id}>
            <div>{`${singleStudent.student.firstname} ${singleStudent.student.lastname}`}</div>
            <div>
              <TextField
                value={singleStudent.score ? `${singleStudent.score}` : ""}
              ></TextField>
            </div>
            <div
              style={{ padding: "10px" }}
            >{`/${assignmentMetaData.outof}`}</div>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>{error ? "There was an error." : "Loading..."}</h1>
  );
};
