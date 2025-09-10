import { NavLink } from "react-router-dom";
import ListIcon from "../../assets/list-icon.svg";
import RavnLogo from "../../assets/ravn-logo.svg";
import DashboardIcon from "../../assets/dashboard-icon.svg";

export const Sidebar = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img src={RavnLogo} alt="Ravn Logo" />
      </div>
      <NavLink to="/" className="flex items-center">
        <img src={DashboardIcon} alt="Dashboard Icon" className="mr-4" />
        <span className="text-body-m font-semibold text-neutral-100">
          DASHBOARD
        </span>
      </NavLink>
      <NavLink to="/my-task" className="flex items-center">
        <img src={ListIcon} alt="List Icon" className="mr-4" />
        <span className="text-body-m font-semibold text-neutral-100">
          MY TASK
        </span>
      </NavLink>
    </>
  );
};
