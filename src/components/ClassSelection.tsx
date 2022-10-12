import React from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { ClassBox } from "./ClassBox";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { CreateNewClassForm } from "./CreateNewClassForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import {
  INITIAL_STATE,
  classSelectReducer,
  SelectionData,
} from "../reducers/classSelectReducer";
import LoadingSkeletonBoxes from "./LoadingSkeletonBoxes";

export type ClassSelectionDataShape = {
  id: number;
  name: string;
  icon: string;
  admins: string;
};

export const ClassSelection: React.FC = () => {
  type Params = {
    user: string;
  };

  const { user } = useParams<keyof Params>() as Params;

  const [deleteMode, setDeleteMode] = React.useState<boolean>(false);

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
      <div className="classSelection">
        <div
          className="classBox newClassBox"
          onMouseEnter={() => createClassMouseover(true)}
          onMouseLeave={() => createClassMouseover(false)}
          onClick={() => setModalOpen(true)}
        >
          {newClassMouseover ? <h3>Create New Class</h3> : <AddIcon></AddIcon>}
        </div>
        <Divider style={{ margin: "15px" }}></Divider>
        <div className="classBoxContainer">
          {data.classList && !isValidating ? (
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
          <Button variant="outlined" onClick={() => deleteSelectedClasses()}>
            DELETE CLASSES
          </Button>
          <Button
            onClick={() => dispatch({ type: "RESET" })}
            variant="outlined"
          >
            CANCEL
          </Button>
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
