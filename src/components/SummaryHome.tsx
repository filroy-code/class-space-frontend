import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { TextField, Button } from "@mui/material";
import { SummaryPieChart } from "./SummaryPieChart";
import BarChart from "./BarChart";

export const SummaryHome = (props: { setNavState: any }) => {
  type Params = {
    user: string;
    classID: string;
  };

  const iconButtonStyle = {
    margin: "10px 0px",
    backgroundColor: "rgb(238, 240, 235)",
    color: "rgb(21, 50, 67)",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1rem",
    zIndex: "1",
  };

  const { user, classID } = useParams<keyof Params>() as Params;

  const { data, error, mutate, isValidating } = useSWR(
    `http://localhost:8000/${user}/${classID}/summary`
  );

  React.useEffect(() => props.setNavState("Summary"));

  type AssignmentData = {
    name: string;
    weight: number;
  };
  const [assignmentsData, setAssignmentsData] = React.useState<
    AssignmentData[]
  >([]);

  async function submitWeightingChanges(assignmentsData: AssignmentData[]) {
    console.log(assignmentsData);
    let response = await fetch(
      `http://localhost:8000/${user}/${classID}/summary/`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Origin: "localhost:8000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentsData),
      }
    );
    if (response.status === 200) {
      setTimeout(() => {
        mutate(`http://localhost:8000/${user}/${classID}/summary`);
      }, 1000);
    } else {
      console.log("there was an error");
    }
  }

  React.useEffect(() => {
    setAssignmentsData([]);
    if (data) {
      let assignmentArray: AssignmentData[] = [];
      if (data.classInfo) {
        data.classInfo.forEach((datum: any) => {
          if (datum.assignments) {
            assignmentArray.push({
              name: datum.assignments,
              weight: datum.assignment_weight,
            });
          }
        });
      }
      setAssignmentsData(assignmentArray);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  const [selectedAssignment, setSelectedAssignment] =
    React.useState<string>("");

  async function getSingleAssignmentData(selectedAssignment: string) {
    let response = await fetch(
      `http://localhost:8000/${user}/${classID}/assignments/${selectedAssignment}/distribution`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Origin: "localhost:8000",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let resJSON = await response.json();
      return resJSON.assignmentInfo;
    } else {
      console.log("there was an error");
    }
  }

  const [distribution, setDistribution] = React.useState([]);

  React.useEffect(() => {
    if (!selectedAssignment) {
      return;
    }
    if (selectedAssignment) {
      getSingleAssignmentData(selectedAssignment).then((res) => {
        setDistribution(res);
      });
    }
  }, [selectedAssignment]);

  if (data) {
    console.log(data);
  }

  return (
    <div className="summaryHome">
      <div className="summaryTable">
        <div className="summaryRow">
          <div className="summaryColumn">
            <b>Assignment Name</b>
          </div>
          <div className="summaryColumn">
            <b>Weight</b>
          </div>
          <div className="summaryColumn">
            <b>Class Average</b>
          </div>
        </div>
        <div className="overallRow">
          <div className="summaryColumn">Overall</div>
          <div
            className="summaryColumn"
            style={{ backgroundColor: "rgb(40, 75, 99)" }}
          ></div>
          <div className="summaryColumn">
            {data ? (data.overall * 100).toPrecision(3) : null}%
          </div>
        </div>
        {data && !isValidating ? (
          assignmentsData.map((entry: any, index: number) => {
            if (entry.name) {
              return (
                <div
                  className={
                    selectedAssignment === entry.name
                      ? "summaryRow summarySelected"
                      : "summaryRow"
                  }
                  key={entry.name}
                  onClick={() => setSelectedAssignment(entry.name)}
                >
                  <div className="summaryColumn">{entry.name}</div>
                  <div className="summaryColumn">
                    <TextField
                      onClick={(e) => e.stopPropagation()}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "center" },
                        },
                      }}
                      id={`${index}`}
                      value={entry.weight ? entry.weight : ""}
                      onChange={(event) => {
                        setAssignmentsData((prev: any) =>
                          prev.map((dataPoint: any, index: number) => {
                            if (isNaN(parseInt(event.target.value))) {
                              return {
                                ...dataPoint,
                                weight: null,
                              };
                            }
                            if (index !== parseInt(event.target.id)) {
                              return dataPoint;
                            } else {
                              return {
                                ...dataPoint,
                                weight: parseInt(event.target.value),
                              };
                            }
                          })
                        );
                      }}
                    ></TextField>
                  </div>
                  <div className="summaryColumn">
                    {(
                      (data.marksData[index].average /
                        parseInt(data.marksData[index].outof)) *
                      100
                    ).toPrecision(3)}
                    %
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h3>{error ? "There was an error." : "Loading..."}</h3>
        )}
        {!error && (
          <div className="editMarksAndStudentDetailsButtonContainer">
            {assignmentsData.length > 0 ? (
              <Button
                style={iconButtonStyle}
                className="muiButton"
                variant="outlined"
                onClick={() => {
                  submitWeightingChanges(assignmentsData);
                }}
              >
                Submit Weighting Adjustments
              </Button>
            ) : (
              <h3>No assignments found.</h3>
            )}
          </div>
        )}
      </div>
      <div className="graphPanel">
        {selectedAssignment && distribution.length > 0 ? (
          <BarChart
            selectedAssignment={selectedAssignment}
            distribution={distribution}
          ></BarChart>
        ) : null}
      </div>
    </div>
  );
};
