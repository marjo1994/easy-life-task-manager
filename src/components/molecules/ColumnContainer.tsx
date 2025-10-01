import { useDroppable } from "@dnd-kit/core";
import { DraggableCard } from "./DraggableCard";
import type { GetTasksQuery } from "../../__generated__/graphql";

type Task = GetTasksQuery["tasks"][number];

type ColumnContainerProps = {
  id: string;
  title: string;
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
};

export const ColumnContainer = ({
  id,
  title,
  tasks,
  onEditClick,
  onDeleteClick,
}: ColumnContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      status: id,
    },
  });

  return (
    <div className="flex w-80 flex-shrink-0 flex-col rounded-lg xl:w-87">
      <h2 className="text-headline-s-mobile xl:text-body-l sticky top-0 z-10 mb-6 font-semibold text-neutral-50">
        {title}
      </h2>

      <div
        ref={setNodeRef}
        data-cy={`column-${id}`}
        className={`flex-1 overflow-y-auto rounded-lg p-2 transition-colors ${
          isOver
            ? "bg-opacity-30 border-2 border-dashed border-neutral-100 bg-neutral-200"
            : "bg-transparent"
        }`}
      >
        {tasks.length === 0 && (
          <p
            className={`${isOver ? "hidden" : "text-body-md rounded-md bg-neutral-200 p-2 text-center font-semibold text-neutral-50"}`}
          >
            No tasks yet
          </p>
        )}
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <DraggableCard
              key={task.id}
              task={task}
              onEditClick={() => onEditClick(task)}
              onDeleteClick={() => onDeleteClick(task)}
            />
          ))}
        </div>

        {isOver && tasks.length === 0 && (
          <div className="mt-4 flex h-20 items-center justify-center">
            <span className="text-sm text-neutral-100">Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
};
