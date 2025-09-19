import { NavLink } from "react-router-dom";
import ListIcon from "../../assets/list-icon.svg";
import RavnLogo from "../../assets/ravn-logo.svg";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import ActiveIndicator from "../../assets/active-indicator.svg";

export const Sidebar = () => {
  return (
    <aside className="hidden w-full rounded-3xl bg-neutral-200 lg:mr-6 lg:flex lg:h-full lg:w-56 lg:flex-col xl:w-[232px]">
      <div className="mt-3.5 mb-11 flex items-center justify-center">
        <img src={RavnLogo} alt="Ravn Logo" />
      </div>
      <NavLink
        to="/"
        className="custom-nav-icon relative flex items-center px-5 py-4"
        style={({ isActive }) =>
          isActive
            ? {
                background:
                  "linear-gradient(90deg, #BA252500 0%, #D24D4D1A 10%)",
              }
            : {}
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={DashboardIcon}
              alt="Dashboard Icon"
              className={`mr-4 ${isActive ? "filter-custom-red" : ""}`}
            />
            <span
              className={`text-body-m hover:text-primary-300 font-semibold ${
                isActive ? "text-primary-300" : "text-neutral-100"
              }`}
            >
              DASHBOARD
            </span>
            {isActive && (
              <img
                src={ActiveIndicator}
                alt="Active indicator"
                className="absolute top-1/2 right-0 -translate-y-1/2"
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink
        to="/my-tasks"
        className="custom-nav-icon relative flex items-center px-5 py-4"
        style={({ isActive }) =>
          isActive
            ? {
                background:
                  "linear-gradient(90deg, #BA252500 0%, #D24D4D1A 10%)",
              }
            : {}
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={ListIcon}
              alt="List Icon"
              className={`mr-4 ${isActive ? "filter-custom-red" : ""}`}
            />
            <span
              className={`text-body-m hover:text-primary-300 font-semibold ${
                isActive ? "text-primary-300" : "text-neutral-100"
              }`}
            >
              MY TASK
            </span>
            {isActive && (
              <img
                src={ActiveIndicator}
                alt="Active indicator"
                className="absolute top-1/2 right-0 -translate-y-1/2"
              />
            )}
          </>
        )}
      </NavLink>
    </aside>
  );
};
