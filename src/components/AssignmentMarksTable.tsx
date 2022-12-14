import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ActionButton } from "./ActionButton";
import { flexbox } from "@mui/system";

export const AssignmentMarksTable = (props: {
  selectedAssignment: string;
  editState: boolean;
  setEditState: any;
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
    `https://class-space.herokuapp.com/${user}/${classID}/assignments/${props.selectedAssignment}`
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

  const inputRef = React.useRef<any>(null);

  React.useEffect(() => {
    setStudentMarks([]);
    data && data.assignmentInfo ? (
      data.assignmentInfo.forEach((datum: any) => {
        if (datum.outof) {
          setAssignmentMetaData({ ...assignmentMetaData, outof: datum.outof });
        }
        if (datum.student && datum.id) {
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
      })
    ) : (
      <h3>No data found.</h3>
    );
  }, [data]);

  React.useEffect(() => {
    setStudentMarksInitial([...studentMarks]);
  }, [props.selectedAssignment]);

  async function submitMarkUpdate(studentMarks: FormattedMarksData[]) {
    let response = await fetch(
      `https://class-space.herokuapp.com/${user}/${classID}/assignments/${props.selectedAssignment}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentMarks),
      }
    );
    if (response.status === 200) {
      return;
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {props.editState ? (
                <input
                  type="text"
                  onClick={(event) => {
                    inputRef.current = event.target;
                    inputRef.current.select();
                  }}
                  style={{
                    width: "2rem",
                    textAlign: "center",
                    justifySelf: "center",
                  }}
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
                ></input>
              ) : (
                <div style={{ display: "flexbox", textAlign: "right" }}>
                  {singleStudent.score}
                </div>
              )}
            </div>
            <div
              style={{ padding: "10px" }}
            >{`/ ${assignmentMetaData.outof}`}</div>
          </div>
        );
      })}
      <Divider style={{ margin: "15px" }}></Divider>
      {studentMarks.length > 0 ? (
        props.editState ? (
          <div className="editMarksAndStudentDetailsButtonContainer">
            <ActionButton
              className="muiButton"
              variant="outlined"
              onClick={() => {
                submitMarkUpdate(studentMarks);
                props.setEditState(false);
              }}
            >
              SAVE
            </ActionButton>
            <ActionButton
              className="muiButton"
              onClick={() => {
                setStudentMarks([...studentMarksInitial]);
                props.setEditState(false);
              }}
              variant="outlined"
            >
              DISCARD
            </ActionButton>
          </div>
        ) : (
          <div className="editMarksAndStudentDetailsButtonContainer">
            <ActionButton
              className="muiButton"
              onClick={() => {
                props.setEditState(true);
                setStudentMarksInitial([...studentMarks]);
              }}
              variant="outlined"
            >
              EDIT
            </ActionButton>
          </div>
        )
      ) : (
        <h3>No students found.</h3>
      )}
    </div>
  ) : (
    <h3>
      {error ? (
        "There was an error."
      ) : (
        <div>
          <div className="tableRow" style={{ padding: "20px" }}>
            Loading...
          </div>
          <div></div>
          <div></div>
          <div className="tableRow" style={{ padding: "20px" }}>
            Loading...
          </div>
          <div></div>
          <div></div>
          <div className="tableRow" style={{ padding: "20px" }}>
            Loading...
          </div>
          <div></div>
          <div></div>
          <div className="tableRow" style={{ padding: "20px" }}>
            Loading...
          </div>
          <div></div>
          <div></div>
        </div>
      )}
    </h3>
  );
};
