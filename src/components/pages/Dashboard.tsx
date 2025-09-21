import { useTasks } from "../../hooks/useTasks";
import { useSearchFiltes } from "../../hooks/useSearchFilters";
import { TaskListView } from "../organisms/ListView";
import { KanbanView } from "../organisms/KanbanView";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import DashboardTab from "../../assets/dashboard-tab.svg";
import ListTab from "../../assets/list-tab.svg";
import { classNames } from "../../utils/utils";
import plusBtn from "../../assets/plus-btn.svg";
import { Modal } from "../molecules/Modal";
import { AddTaskForm } from "../organisms/AddTaskForm";
import { LoadingState } from "../molecules/Loading";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../../graphql/queries/getUsers";

/*const normalize = (str: string) => {
  return str.replace(/\s+/g, "").toLowerCase();
};*/

export const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const backendFilters = useSearchFiltes();
  const { tasks, loading, error } = useTasks(backendFilters);
  useQuery(GET_USERS, { fetchPolicy: "cache-and-network" });

  /*console.log("Backend filters:", backendFilters);
  console.log("Frontend filters:", frontendFilters);
  console.log("Tasks from backend:", tasks);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    if (!frontendFilters.searchText) {
      return tasks;
    }

    console.log("Filtering with search text:", frontendFilters.searchText);

    const normalizedSearch = normalize(frontendFilters.searchText);
    console.log("normalizeSearch", normalizedSearch);
    return tasks.filter(
      (task) => task.name && normalize(task.name).includes(normalizedSearch)
    );
  }, [tasks, frontendFilters.searchText]);

  console.log(filteredTasks, "filteredTasks");*/

  if (loading) return <LoadingState />;
  if (error) return <p>Error: {error.message}</p>;
  if (!tasks) return <p>Not found data</p>;

  const tabs = [
    { id: 0, label: "Dashboard", icon: DashboardTab },
    { id: 1, label: "Task", icon: ListTab },
  ];

  return (
    <div className="mt-4 h-full xl:mt-3">
      <TabGroup>
        <TabList
          className={classNames(
            "mx-8 flex rounded-[10px] bg-neutral-300",
            "lg:mx-0 lg:space-x-2 lg:rounded-none lg:bg-transparent"
          )}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  "px-7 py-3 text-center lg:px-2 lg:py-2",
                  "flex-1 lg:flex-none",
                  selected
                    ? "lg:border-primary-300 rounded-lg bg-neutral-100 lg:rounded-md lg:border lg:bg-transparent"
                    : "lg:hover:border-primary-300 lg:rounded-md lg:border-transparent",
                  "text-neutral-50",
                  "focus:ring-0 focus:outline-none"
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className="hidden justify-center lg:flex">
                    <img
                      src={tab.icon}
                      alt={tab.label + " Icon"}
                      className={selected ? "filter-custom-red" : ""}
                    />
                  </div>

                  <div className="text-subheadline-s-mobile lg:hidden">
                    {tab.label}
                  </div>
                </>
              )}
            </Tab>
          ))}
          <button
            type="button"
            className="ml-auto hidden lg:block"
            onClick={() => setIsOpen(true)}
          >
            <img src={plusBtn} alt="plus-icon" />
          </button>
        </TabList>

        <TabPanels className="mt-6 ml-4 lg:mt-4 lg:ml-0">
          <TabPanel className="h-[calc(100vh-195px)] flex-1 overflow-x-auto pb-24 lg:pb-0">
            <KanbanView tasks={tasks} />
          </TabPanel>

          <TabPanel className="h-[calc(100vh-195px)] flex-1 overflow-x-auto pb-24 lg:pb-0">
            <TaskListView tasks={tasks} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddTaskForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};
