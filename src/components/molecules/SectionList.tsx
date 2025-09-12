import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

type Task = {
  id: number;
  title: string;
  estimate?: string;
  taskTags: string[];
  assignee: string;
  due: string;
};

type SectionProps = {
  title: string;
  tasks: Task[];
};

export const Section = ({ title, tasks }: SectionProps) => {
  return (
    <div className="mb-4 bg-neutral-300 text-neutral-50 shadow-md">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="text-title-s-mobile md:text-body-l flex w-full items-center rounded-t-sm border border-neutral-200 p-4 font-semibold">
              <span
                className={`mr-3 inline-block h-0 w-0 border-x-6 border-b-6 border-x-transparent border-b-neutral-100 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              ></span>
              <span>{title}</span>
            </DisclosureButton>

            <DisclosurePanel className="divide-y divide-neutral-200">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="text-body-m grid grid-cols-[2fr_1fr_1fr_1fr_1fr] divide-x divide-neutral-200 hover:bg-neutral-400"
                >
                  <span className="py-4 pr-5 pl-10">{task.title}</span>

                  <div className="flex gap-1 px-2 py-4">
                    {task.taskTags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded bg-neutral-300 px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="px-2 py-4">{task.estimate ?? "-"}</span>
                  <span className="px-2 py-4">{task.assignee}</span>
                  <span className="px-2 py-4">{task.due}</span>
                </div>
              ))}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
