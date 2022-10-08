import { useParams, useNavigate, Outlet } from "react-router-dom";

const LoggedInLayout: React.FC = (props) => {
  const { user } = useParams();

  return (
    <div className="loggedInLayout">
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
