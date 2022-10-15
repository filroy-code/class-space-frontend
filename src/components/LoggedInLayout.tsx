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
        <hr></hr>
        <NavBar></NavBar>
        <hr></hr>
        <Outlet />
      </div>
    </>
  );
};

export default LoggedInLayout;
