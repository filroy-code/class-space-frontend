import React from "react";
import "./App.css";
import { SWRConfig } from "swr";
import LoggedInLayout from "./components/LoggedInLayout";
import { ClassSelection } from "./components/ClassSelection";
import { ClassHome } from "./components/ClassHome";
import { AssignmentPanel } from "./components/AssignmentPanel";
import { StudentPanel } from "./components/StudentPanel";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const App = (): JSX.Element => {
  const fetcher = (...args: any) =>
    fetch(args).then((response) => response.json());

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              {
                //to add: authentication at route "/"}
              }
              <Route path="/:user" element={<LoggedInLayout />}>
                <Route index element={<ClassSelection></ClassSelection>} />

                <Route path=":classID" element={<ClassHome></ClassHome>} />

                <Route
                  path=":classID/students"
                  element={<StudentPanel></StudentPanel>}
                />

                <Route
                  path=":classID/assignments"
                  element={<AssignmentPanel></AssignmentPanel>}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </SWRConfig>
    </>
  );
};

export default App;
