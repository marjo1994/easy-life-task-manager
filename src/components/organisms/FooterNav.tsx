import { NavLink } from "react-router-dom";
import ListIcon from "../../assets/list-icon.svg";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import AddTaskIcon from "../../assets/add-task-icon.svg";

export const FooterNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex w-full justify-around bg-neutral-300 px-8 pt-4 pb-6 text-neutral-100 lg:hidden">
      <NavLink to="/" className="flex flex-col items-center">
        <img src={DashboardIcon} alt="dashboard icon" className="mb-1" />
        Dashboard
      </NavLink>
      <NavLink to="/" className="flex flex-col items-center">
        <img src={AddTaskIcon} alt="plus icon" className="mb-1" />
        Add Task
      </NavLink>
      <NavLink to="/my-tasks" className="flex flex-col items-center">
        <img src={ListIcon} alt="tasks icon" className="mb-1" />
        My Task
      </NavLink>
    </nav>
  );
};
