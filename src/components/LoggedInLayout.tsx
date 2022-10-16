import { useParams, useNavigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const LoggedInLayout: React.FC = (props) => {
  const { user } = useParams();

  return (
    <>
      <header>
        <h1>Class Space</h1>
      </header>
      <div className="loggedInLayout">
        <div className="navBar">
          <hr className="navhr"></hr>
          <NavBar></NavBar>
          <hr className="navhr"></hr>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default LoggedInLayout;
