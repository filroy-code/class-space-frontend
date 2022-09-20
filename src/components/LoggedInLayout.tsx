import { useParams, useNavigate, Outlet } from "react-router-dom";

const LoggedInLayout: React.FC = (props) => {
  const { user } = useParams();

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoggedInLayout;
