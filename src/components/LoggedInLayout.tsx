import { useParams, useNavigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const LoggedInLayout: React.FC = (props) => {
  const { user } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="loggedInLayout">
        <header>
          <h1
            onClick={() => {
              navigate(`/${user}`);
            }}
          >
            Class Space
          </h1>
        </header>
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
