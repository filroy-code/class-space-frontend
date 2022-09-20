import React from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { ClassBox } from "./ClassBox";

export const ClassSelection: React.FC = () => {
  type Params = {
    user: string;
  };

  type ClassSelectionDataShape = {
    id: number;
    name: string;
    icon: string;
    admins: string;
  };

  const { user } = useParams<keyof Params>() as Params;
  const { data, error } = useSWR(`http://localhost:8000/${user}`);

  return (
    <div className="classSelection">
      <>
        {data ? (
          data.classList.map((classInList: ClassSelectionDataShape) => {
            return (
              <ClassBox
                nameOfClass={classInList.name}
                key={classInList.id}
              ></ClassBox>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    </div>
  );
};
