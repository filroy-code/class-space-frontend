import React from "react";
import "./App.css";
import { SWRConfig } from "swr";
import LoggedInLayout from "./components/LoggedInLayout";
import { ClassSelection } from "./components/ClassSelection";
import { ClassHome } from "./components/ClassHome";
import { AssignmentPanel } from "./components/AssignmentPanel";
import { StudentPanel } from "./components/StudentPanel";
import { SummaryHome } from "./components/SummaryHome";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NavigationContext } from "./contexts/NavigationContext";
import { Login } from "./components/Login";

const App = (): JSX.Element => {
  const fetcher = (...args: any) =>
    fetch(args, { mode: "cors" }).then((response) => response.json());

  const [navState, setNavState] = React.useState(null);

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <NavigationContext.Provider value={navState}>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/:user" element={<LoggedInLayout />}>
                  <Route
                    index
                    element={
                      <ClassSelection
                        setNavState={setNavState}
                      ></ClassSelection>
                    }
                  />

                  <Route
                    path=":classID"
                    element={<ClassHome setNavState={setNavState}></ClassHome>}
                  />

                  <Route
                    path=":classID/students"
                    element={
                      <StudentPanel setNavState={setNavState}></StudentPanel>
                    }
                  />

                  <Route
                    path=":classID/assignments"
                    element={
                      <AssignmentPanel
                        setNavState={setNavState}
                      ></AssignmentPanel>
                    }
                  />

                  <Route
                    path=":classID/summary"
                    element={
                      <SummaryHome setNavState={setNavState}></SummaryHome>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </NavigationContext.Provider>
      </SWRConfig>
    </>
  );
};

export default App;
