import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

export const AssignmentMarksTable = (props: {
  selectedAssignment: string;
}): JSX.Element => {
  React.useEffect(() => {
    setStudentMarks([]);
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
    `http://localhost:8000/${user}/${classID}/assignments/${props.selectedAssignment}`
  );

  type FormattedMarksData = {
    student: { id: string; firstname: string; lastname: string };
    score: number | null | undefined;
  };

  const [studentMarks, setStudentMarks] = React.useState<FormattedMarksData[]>(
    []
  );

  const [studentMarksInitial, setStudentMarksInitial] = React.useState<
    FormattedMarksData[]
  >([]);

  if (data) {
    console.log(data);
  }

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
    setStudentMarksInitial([...studentMarks]);
  }, [data]);

  async function submitMarkUpdate(studentMarks: FormattedMarksData[]) {
    let response = await fetch(
      `http://localhost:8000/${user}/${classID}/${props.selectedAssignment}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Origin: "localhost:8000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentMarks),
      }
    );
    if (response.status === 200) {
      console.log("success!");
    } else {
      console.log("there was an error");
    }
  }

  return data ? (
    <div>
      {studentMarks.map((singleStudent: any, index: number) => {
        return (
          <div className="tableRow" key={singleStudent.student.id}>
            <div>{`${singleStudent.student.firstname} ${singleStudent.student.lastname}`}</div>
            <div>
              <TextField
                value={singleStudent.score ? `${singleStudent.score}` : ""}
                id={`${index}`}
                onChange={(event) => {
                  setStudentMarks((prev: any) =>
                    prev.map((dataPoint: any, index: number) => {
                      if (isNaN(parseInt(event.target.value))) {
                        return {
                          ...dataPoint,
                          score: null,
                        };
                      }
                      if (index !== parseInt(event.target.id)) {
                        return dataPoint;
                      } else {
                        return {
                          ...dataPoint,
                          score: parseInt(event.target.value),
                        };
                      }
                    })
                  );
                }}
              ></TextField>
            </div>
            <div
              style={{ padding: "10px" }}
            >{`/${assignmentMetaData.outof}`}</div>
          </div>
        );
      })}
      <button onClick={() => submitMarkUpdate(studentMarks)}>CLICK</button>
    </div>
  ) : (
    <h1>{error ? "There was an error." : "Loading..."}</h1>
  );
};
