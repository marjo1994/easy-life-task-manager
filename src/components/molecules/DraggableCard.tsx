import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";
import type { GetTasksQuery } from "../../__generated__/graphql";

type Task = GetTasksQuery["tasks"][number];

interface DraggableCardProps {
  task: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const DraggableCard = ({
  task,
  onEditClick,
  onDeleteClick,
}: DraggableCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "cursor-grabbing" : "cursor-grab"}
    >
      <Card
        task={task}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};
