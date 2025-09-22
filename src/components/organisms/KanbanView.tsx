import type {
  GetTasksQuery,
  Status,
  UpdateTaskInput,
} from "../../__generated__/graphql";
import { STATUS_LABELS } from "../../utils/statusLabels";
import { useState } from "react";
import { Modal } from "../molecules/Modal";
import { Card } from "../molecules/Card";
import { EditTaskForm } from "./EditTaskForm";
import { DeleteModal } from "../molecules/DeleteModal";
import { ColumnContainer } from "../molecules/ColumnContainer";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useUpdateTask } from "../../hooks/useEditTask";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

export const KanbanView = ({ tasks }: { tasks: GetTasksQuery["tasks"] }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const {
    deleteTask,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteTask();

  const { updateTask } = useUpdateTask();

  type Task = GetTasksQuery["tasks"][number];

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask({ id: taskToDelete.id });
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const ALL_STATUSES = Object.keys(STATUS_LABELS) as Status[];

  const completeGroupedTasks = ALL_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    } else {
      setActiveTask(null);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overContainer = over.id.toString();

    if (activeTask && activeTask.status !== overContainer) {
      try {
        const updateData: UpdateTaskInput = {
          id: activeTask.id,
          status: overContainer as Status,
        };

        //console.log("Update data:", updateData);

        await updateTask(updateData);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full min-w-max gap-8">
        {ALL_STATUSES.map((status) => (
          <ColumnContainer
            key={status}
            id={status}
            title={`${STATUS_LABELS[status]} (${String(completeGroupedTasks[status].length).padStart(2, "0")})`}
            tasks={completeGroupedTasks[status]}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-5 transform opacity-80 shadow-xl">
            <Card
              task={activeTask}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
            />
          </div>
        )}
      </DragOverlay>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        error={deleteError?.message}
      />
      <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        {editingTask && (
          <EditTaskForm task={editingTask} onClose={handleCloseModal} />
        )}
      </Modal>
    </DndContext>
  );
};
