import React from "react";
import { TextField } from "@mui/material";

export const EditStudentDetails = (props: {
  selectedStudentDetails: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  editState: boolean;
  setEditState: any;
}) => {
  return (
    <>
      <div className="studentDetailsRow">
        <b>First Name:</b>
        <TextField value={props.selectedStudentDetails.firstname}></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Last Name:</b>
        <TextField value={props.selectedStudentDetails.lastname}></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Student ID:</b>
        <TextField value={props.selectedStudentDetails.id}></TextField>
      </div>
      <div className="studentDetailsRow">
        <b>Email:</b>
        <TextField value={props.selectedStudentDetails.email}></TextField>
      </div>
    </>
  );
};
