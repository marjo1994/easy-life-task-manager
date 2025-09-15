import { Section } from "../molecules/SectionList";
import type { GetTasksQuery } from "../../__generated__/graphql";
import { STATUS_LABELS } from "../../utils/statusLabels";

export const TaskListView = ({ tasks }: { tasks: GetTasksQuery["tasks"] }) => {
  const groupedTasks = tasks.reduce<Record<string, any[]>>((acc, task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});

  return (
    <div className="w-full">
      <div className="min-w-[900px] lg:min-w-0">
        <div className="mb-4 rounded-sm border border-neutral-200 bg-neutral-300 text-neutral-50">
          <div className="text-body-m grid grid-cols-[2fr_1fr_1fr_1fr_1fr] divide-x divide-neutral-200 xl:grid-cols-[3fr_1fr_1fr_1fr_1fr]">
            <span className="p-4"># Task Name</span>
            <span className="p-4">Task Tags</span>
            <span className="p-4">Estimate</span>
            <span className="p-4">Task Assignee</span>
            <span className="p-4">Due Date</span>
          </div>
        </div>

        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <Section
            key={status}
            title={STATUS_LABELS[status] ?? status}
            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
};
