import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Card } from "../molecules/Card";
import DashboardTab from "../../assets/dashboard-tab.svg";
import ListTab from "../../assets/list-tab.svg";
import { classNames } from "../../utils/utils";

export const Dashboard: React.FC = () => {
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
            <div className="flex h-full min-w-max gap-8">
              {[
                { title: "Working", count: 3 },
                { title: "In progress", count: 3 },
                { title: "Completed", count: 3 },
              ].map((column) => (
                <div
                  key={column.title}
                  className="flex w-70 flex-shrink-0 flex-col rounded-lg xl:w-87"
                >
                  <h2 className="sticky top-0 z-10 mb-4 text-neutral-50">
                    {column.title} ({column.count})
                  </h2>
                  <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <h2>List View</h2>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
