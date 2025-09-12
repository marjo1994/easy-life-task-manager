import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import DashboardTab from "../../assets/dashboard-tab.svg";
import ListTab from "../../assets/list-tab.svg";
import { classNames } from "../../utils/utils";
import { TaskListView } from "../organisms/ListView";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client/react";
import { KanbanView } from "../organisms/KanbanView";

const GET_TASKS = gql(`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      pointEstimate
      dueDate
      status
      tags
      assignee {
        fullName
      }
    }
  }
`);

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      input: {},
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("data", data);

  const tabs = [
    { id: 0, label: "Dashboard", icon: DashboardTab },
    { id: 1, label: "Task", icon: ListTab },
  ];
  return (
    <div className="mt-4 h-full">
      <TabGroup>
        <TabList
          className={classNames(
            "mx-8 flex space-x-2 rounded-[10px] bg-neutral-300",
            "lg:mx-0 lg:space-x-2 lg:rounded-none lg:bg-transparent"
          )}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  "px-7 py-1 text-center lg:px-2 lg:py-2",
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

                  <div className="lg:hidden">{tab.label}</div>
                </>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-4 ml-4 lg:ml-0">
          <TabPanel className="h-[calc(100vh-160px)] flex-1 overflow-x-auto pb-24 lg:pb-0">
            <KanbanView tasks={data?.tasks ?? []} />
          </TabPanel>

          <TabPanel className="h-[calc(100vh-160px)] flex-1 overflow-x-auto pb-24 lg:pb-0">
            <TaskListView />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
