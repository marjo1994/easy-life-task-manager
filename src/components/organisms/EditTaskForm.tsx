import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import estimateicon from "../../assets/control-estimate-icon.svg";
import labelicon from "../../assets/label-icon.svg";
import duedateIcon from "../../assets/due-date-icon.svg";
import { ListBoxField } from "../molecules/ListBoxField";
import { UserSelector } from "../molecules/userSelector";
import { MultiListBoxField } from "../molecules/MultiListBoxField";
import { TaskTagOptions } from "../../utils/taskTagOptions";
import { PointEstimateOptions } from "../../utils/pointEstimateOptions";
import { DatePickerField } from "../molecules/DatePickerField";
import closeBtn from "../../assets/close-btn.svg";
import {
  TaskTag,
  type Task,
  type UpdateTaskInput,
} from "../../__generated__/graphql";
import { taskSchema } from "../../schemas/taskSchema";
import { useUpdateTask } from "../../hooks/useEditTask";

const ErrorMessage = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return errors[name] ? (
    <p className="text-body-s text-primary-300 font-normal">
      {errors[name]?.message as string}
    </p>
  ) : null;
};

type EditTaskFormProps = {
  task: Task;
  onClose: () => void;
};

export const EditTaskForm = ({ onClose, task }: EditTaskFormProps) => {
  const [successMessage, setSuccessMessage] = useState("");
  const { updateTask, loading, error } = useUpdateTask();

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(taskSchema),
    defaultValues: {
      pointEstimate: task.pointEstimate,
      assigneeId: task.assignee?.id || "",
      name: task.name,
      dueDate: task.dueDate ? task.dueDate : "",
      tags: task.tags as TaskTag[],
      status: task.status,
    },
  });

  type TaskFormValues = Omit<UpdateTaskInput, "id">;

  const handleSubmit = async (formValues: TaskFormValues) => {
    try {
      await updateTask({
        id: task.id,
        ...formValues,
      });
      methods.reset();
      setSuccessMessage("¡Tarea actualizada exitosamente!");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    methods.reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {error && <p className="text-primary-200 mt-2">{error.message}</p>}
        {successMessage && (
          <div className="bg-secondary-300 mb-4 rounded p-3 text-neutral-50">
            {successMessage}
          </div>
        )}
        <div className="mb-6 flex justify-between lg:hidden">
          <button
            type="button"
            className="mr-6 bg-transparent p-2 font-normal text-neutral-100"
            onClick={handleCancel}
          >
            <img src={closeBtn} alt="close btn" />
          </button>
          <button
            type="submit"
            className="rounded-lg bg-transparent p-2 font-normal text-neutral-100"
            disabled={loading}
          >
            {loading ? "Updating" : "Update"}
          </button>
        </div>
        <div className="mb-6">
          <label className="hidden">Task Name</label>
          <input
            className="text-body-xl font-semibold text-neutral-50 placeholder-neutral-100 focus:outline-none"
            {...methods.register("name")}
            placeholder="Task Title"
          ></input>
          <ErrorMessage name="name" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 text-neutral-50 md:grid-cols-[1fr_1.2fr_0.8fr_1.2fr]">
          <div className="flex flex-1 flex-col">
            <ListBoxField
              name="pointEstimate"
              options={[
                { value: "", label: "Estimate" },
                ...PointEstimateOptions,
              ]}
              icon={estimateicon}
            />
            <ErrorMessage name="pointEstimate" />
          </div>

          <div className="flex flex-1 flex-col">
            <UserSelector />
            <ErrorMessage name="assigneeId" />
          </div>
          <div className="flex flex-1 flex-col">
            <MultiListBoxField
              name="tags"
              options={TaskTagOptions}
              icon={labelicon}
            />
            <ErrorMessage name="tags" />
          </div>
          <div className="flex flex-1 flex-col">
            <DatePickerField
              name="dueDate"
              icon={duedateIcon}
              placeholder="Due Date"
            />
            <ErrorMessage name="dueDate" />
          </div>
        </div>
        <div className="hidden justify-end md:flex">
          <button
            type="button"
            className="mr-6 bg-transparent p-2 font-normal text-neutral-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-300 rounded-lg p-2 font-normal text-neutral-50"
            disabled={loading}
          >
            {loading ? "Updating" : "Update"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
