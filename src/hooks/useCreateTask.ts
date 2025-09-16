import { useMutation } from "@apollo/client/react";
import { CREATE_TASK } from "../graphql/mutations/createTask";
import type { CreateTaskInput } from "../__generated__/graphql";
import { GET_TASKS } from "../graphql/queries/getTasks";

export const useCreateTask = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_TASK);

  const createTask = async (input: CreateTaskInput) => {
    await mutate({
      variables: { input },
      update(cache, { data }) {
        if (!data?.createTask) return;
        const newTask = data.createTask;
        const existing = cache.readQuery({
          query: GET_TASKS,
          variables: { input: {} },
        });
        if (existing?.tasks) {
          cache.writeQuery({
            query: GET_TASKS,
            variables: { input: {} },
            data: {
              tasks: [...existing.tasks, newTask],
            },
          });
        }
      },
    });
  };
  return { createTask, loading, error };
};
