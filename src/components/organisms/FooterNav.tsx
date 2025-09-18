import { NavLink } from "react-router-dom";
import ListIcon from "../../assets/list-icon.svg";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import AddTaskIcon from "../../assets/add-task-icon.svg";
import { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { Modal } from "../molecules/Modal";

export const FooterNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsAddTaskActive(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsAddTaskActive(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 z-100 flex w-full justify-between bg-neutral-300 px-8 pt-4 pb-6 text-neutral-100 lg:hidden">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center ${isActive && !isOpen ? "text-primary-300" : "text-neutral-100"}`
        }
        onClick={handleCloseModal}
      >
        {({ isActive }) => (
          <>
            <img
              src={DashboardIcon}
              alt="dashboard icon"
              className={`mb-1 ${isActive && !isOpen ? "filter-custom-red" : ""}`}
            />
            Dashboard
          </>
        )}
      </NavLink>
      <button
        className={`flex flex-col items-center ${isAddTaskActive ? "text-primary-300" : "text-neutral-100"}`}
        onClick={handleOpenModal}
      >
        <img
          src={AddTaskIcon}
          alt="plus icon"
          className={`mb-1 ${isAddTaskActive ? "filter-custom-red" : ""}`}
        />
        Add Task
      </button>

      <NavLink
        to="/my-tasks"
        className={({ isActive }) =>
          `flex flex-col items-center ${isActive && !isOpen ? "text-primary-300" : "text-neutral-100"}`
        }
        onClick={handleCloseModal}
      >
        {({ isActive }) => (
          <>
            <img
              src={ListIcon}
              alt="tasks icon"
              className={`mb-1 ${isActive && !isOpen ? "filter-custom-red" : ""}`}
            />
            My Task
          </>
        )}
      </NavLink>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <AddTaskForm onClose={handleCloseModal} />
      </Modal>
    </nav>
  );
};
