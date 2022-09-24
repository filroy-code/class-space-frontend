import React from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { ClassBox } from "./ClassBox";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { CreateNewClassForm } from "./CreateNewClassForm";

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

  //fetches list of classes.
  const { data, error } = useSWR(`http://localhost:8000/${user}`);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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
          ></CreateNewClassForm>
        }
      ></Modal>
      <>
        <div className="classBox" onClick={() => setModalOpen(true)}>
          <AddIcon></AddIcon>
        </div>
        {data ? (
          data.classList.map((classInList: ClassSelectionDataShape) => {
            return (
              <ClassBox classData={classInList} key={classInList.id}></ClassBox>
            );
          })
        ) : (
          <h1>
            {error ? "There was an error getting your classes." : "Loading..."}
          </h1>
        )}
      </>
    </div>
  );
};
