import React from "react";
import LoggedInLayout from "./LoggedInLayout";
import { ClassSelection } from "./ClassSelection";
import { ClassHome } from "./ClassHome";
import { AssignmentPanel } from "./AssignmentPanel";
import { StudentPanel } from "./StudentPanel";
import { SummaryHome } from "./SummaryHome";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Login } from "./Login";
import { AnimatePresence } from "framer-motion";

export default function AnimatedRoutes(props: { setNavState: any }) {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/:user" element={<LoggedInLayout />}>
          <Route
            index
            element={
              <ClassSelection setNavState={props.setNavState}></ClassSelection>
            }
          />

          <Route
            path=":classID"
            element={<ClassHome setNavState={props.setNavState}></ClassHome>}
          />

          <Route
            path=":classID/students"
            element={
              <StudentPanel setNavState={props.setNavState}></StudentPanel>
            }
          />

          <Route
            path=":classID/assignments"
            element={
              <AssignmentPanel
                setNavState={props.setNavState}
              ></AssignmentPanel>
            }
          />

          <Route
            path=":classID/summary"
            element={
              <SummaryHome setNavState={props.setNavState}></SummaryHome>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
