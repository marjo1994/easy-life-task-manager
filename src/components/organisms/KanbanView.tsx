import { Card } from "../molecules/Card";
import type { GetTasksQuery } from "../../__generated__/graphql";
import { STATUS_LABELS } from "../../utils/statusLabels";

export const KanbanView = ({ tasks }: { tasks: GetTasksQuery["tasks"] }) => {
  const groupedTasks = tasks.reduce<Record<string, any[]>>((acc, task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});

  return (
    <div className="flex h-full min-w-max gap-8">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div
          key={status}
          className="flex w-80 flex-shrink-0 flex-col rounded-lg xl:w-87"
        >
          <h2 className="text-headline-s-mobile xl:text-body-l sticky top-0 z-10 mb-6 font-semibold text-neutral-50">
            {`${STATUS_LABELS[status] ?? status} (${String(tasks.length).padStart(2, "0")})`}
          </h2>
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {tasks.map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
