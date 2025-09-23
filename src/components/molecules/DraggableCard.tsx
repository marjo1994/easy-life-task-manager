import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../atoms/Card";
import type { GetTasksQuery } from "../../__generated__/graphql";

type Task = GetTasksQuery["tasks"][number];

type DraggableCardProps = {
  task: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const DraggableCard = ({
  task,
  onEditClick,
  onDeleteClick,
}: DraggableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: task.id });

  const setRefs = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
    transition: "opacity 0.2s ease",
  };

  const dragClass = isDragging ? "cursor-grabbing" : "cursor-grab";
  const overClass = isOver ? "scale-105" : "";

  return (
    <div
      ref={setRefs}
      style={style}
      {...listeners}
      {...attributes}
      className={`${dragClass} ${overClass}`}
    >
      <Card
        task={task}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        isDragging={isDragging}
      />
    </div>
  );
};
