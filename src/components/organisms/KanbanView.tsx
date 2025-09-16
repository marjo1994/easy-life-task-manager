import type { GetTasksQuery, Task } from "../../__generated__/graphql";
import { STATUS_LABELS } from "../../utils/statusLabels";
import { useState } from "react";
import { Modal } from "../molecules/Modal";
import { Card } from "../molecules/Card";
import { EditTaskForm } from "./EditTaskForm";
import { DeleteModal } from "../molecules/DeleteModal";
import { useDeleteTask } from "../../hooks/useDeleteTask";

export const KanbanView = ({ tasks }: { tasks: GetTasksQuery["tasks"] }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { deleteTask, loading, error } = useDeleteTask();

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
                <Card
                  key={task.id}
                  task={task}
                  onEditClick={() => handleEditClick(task)}
                  onDeleteClick={() => handleDeleteClick(task)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        error={error?.message}
      />

      <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        {editingTask && (
          <EditTaskForm task={editingTask} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};
