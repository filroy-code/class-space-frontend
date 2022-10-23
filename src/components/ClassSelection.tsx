import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { ClassBox } from "./ClassBox";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { CreateNewClassForm } from "./CreateNewClassForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  INITIAL_STATE,
  classSelectReducer,
} from "../reducers/classSelectReducer";
import LoadingSkeletonBoxes from "./LoadingSkeletonBoxes";
import { ActionButton } from "./ActionButton";

export type ClassSelectionDataShape = {
  id: number;
  name: string;
  icon: string;
  admins: string;
};

export const ClassSelection = (props: { setNavState: any }): JSX.Element => {
  type Params = {
    user: string;
  };

  const { user } = useParams<keyof Params>() as Params;

  React.useEffect(() => props.setNavState(null));

  //fetches list of classes.
  const { data, error, isValidating, mutate } = useSWR(
    `http://localhost:8000/${user}`
  );

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [state, dispatch] = React.useReducer(classSelectReducer, INITIAL_STATE);

  async function deleteClass(selectedClass: string) {
    let response = await fetch(
      `http://localhost:8000/${user}/${selectedClass}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          Origin: "localhost:8000",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("success!");
    } else {
      console.log("there was an error");
    }
  }

  async function deleteSelectedClasses() {
    state.selectedClasses.forEach((selectedClass) => {
      deleteClass(selectedClass);
    });
    dispatch({ type: "RESET" });
    mutate(`http://localhost:8000/${user}`);
  }

  const [newClassMouseover, setNewClassMouseover] =
    React.useState<boolean>(false);

  function createClassMouseover(toggle: boolean) {
    setNewClassMouseover(toggle);
  }

  return (
    <div className="classSelection">
      <Modal
        open={modalOpen}
        closeModal={() => {
          setModalOpen(false);
        }}
        children={
          <CreateNewClassForm
            modalController={setModalOpen}
            mutate={mutate}
          ></CreateNewClassForm>
        }
      ></Modal>
      <div>
        <div
          className={
            state.selectionType
              ? "classBox newClassBox classBoxDisabled"
              : "classBox newClassBox"
          }
          onMouseEnter={
            state.selectionType
              ? () => {
                  return;
                }
              : () => createClassMouseover(true)
          }
          onMouseLeave={
            state.selectionType
              ? () => {
                  return;
                }
              : () => createClassMouseover(false)
          }
          onClick={
            state.selectionType
              ? () => {
                  return;
                }
              : () => setModalOpen(true)
          }
        >
          {newClassMouseover ? <h3>Create New Class</h3> : <AddIcon></AddIcon>}
        </div>
        <Divider style={{ margin: "15px" }}></Divider>
        <div className="classBoxContainer">
          {data && !isValidating ? (
            data.classList ? (
              data.classList.map((classInList: ClassSelectionDataShape) => {
                return (
                  <ClassBox
                    classData={classInList}
                    key={classInList.id}
                    deleteMode={state.selectionType}
                    selected={state.selectedClasses.includes(classInList.name)}
                    dispatch={dispatch}
                  ></ClassBox>
                );
              })
            ) : (
              <h3>No classes found.</h3>
            )
          ) : (
            <>
              {error ? (
                <h1>"There was an error getting your classes."</h1>
              ) : (
                <LoadingSkeletonBoxes type="classBoxContainer"></LoadingSkeletonBoxes>
              )}
            </>
          )}
        </div>
      </div>
      {state.selectionType ? (
        <div className="editMarksAndStudentDetailsButtonContainer">
          <ActionButton
            className="muiButton"
            variant="outlined"
            onClick={() => deleteSelectedClasses()}
          >
            DELETE CLASSES
          </ActionButton>
          <ActionButton
            className="muiButton"
            onClick={() => dispatch({ type: "RESET" })}
            variant="outlined"
          >
            CANCEL
          </ActionButton>
        </div>
      ) : (
        <Tooltip
          TransitionComponent={Zoom}
          title="Delete Classes"
          placement="left"
          className="classDeleteButton"
          arrow
        >
          <div className="classDeleteButton">
            <IconButton
              style={{
                color: "rgb(21, 50, 67)",
                backgroundColor: "rgb(238, 240, 235)",
                borderRadius: "5px",
              }}
              onClick={() => {
                dispatch({ type: "DELETE_ENABLE" });
              }}
            >
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
