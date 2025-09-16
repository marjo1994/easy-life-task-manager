import { useMutation } from "@apollo/client/react";
import { DELETE_TASK } from "../graphql/mutations/deleteTask";
import { GET_TASKS } from "../graphql/queries/getTasks";
import type { DeleteTaskInput } from "../__generated__/graphql";

export const useDeleteTask = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_TASK);

  const deleteTask = async (input: DeleteTaskInput) => {
    await mutate({
      variables: { input },
      update: (cache, { data }) => {
        if (!data?.deleteTask) return;

        const deleteId = data.deleteTask.id;
        const existing = cache.readQuery({
          query: GET_TASKS,
          variables: { input: {} },
        });

        if (existing?.tasks) {
          const updatedTasks = existing.tasks.filter(
            (task) => task.id !== deleteId
          );
          cache.writeQuery({
            query: GET_TASKS,
            variables: { input: {} },
            data: {
              tasks: updatedTasks,
            },
          });
        }
      },
    });
  };

  return { deleteTask, loading, error };
};
