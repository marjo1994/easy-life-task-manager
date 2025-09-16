import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK } from "../graphql/mutations/updateTask";
import { GET_TASKS } from "../graphql/queries/getTasks";
import type { UpdateTaskInput } from "../__generated__/graphql";

export const useUpdateTask = () => {
  const [mutate, { loading, error }] = useMutation(UPDATE_TASK);

  const updateTask = async (input: UpdateTaskInput) => {
    await mutate({
      variables: { input },
      update: (cache, { data }) => {
        if (!data?.updateTask) return;

        const updatedTask = data.updateTask;
        const existingData = cache.readQuery({
          query: GET_TASKS,
          variables: { input: {} },
        });

        if (existingData?.tasks) {
          const updatedTasks = existingData.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );

          cache.writeQuery({
            query: GET_TASKS,
            variables: { input: {} },
            data: { tasks: updatedTasks },
          });
        }
      },
    });
  };

  return { updateTask, loading, error };
};
