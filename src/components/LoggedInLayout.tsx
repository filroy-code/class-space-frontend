import { useParams, useNavigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const LoggedInLayout: React.FC = (props) => {
  const { user } = useParams();

  return (
    <div className="loggedInLayout">
      <NavBar></NavBar>
      <hr></hr>
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
