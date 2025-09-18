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
import { useCreateTask } from "../../hooks/useCreateTask";
import {
  Status,
  TaskTag,
  type CreateTaskInput,
  type PointEstimate,
} from "../../__generated__/graphql";
import { taskSchema } from "../../schemas/taskSchema";

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

type AddTaskFormProps = {
  onClose: () => void;
};

export const AddTaskForm = ({ onClose }: AddTaskFormProps) => {
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(taskSchema),
    defaultValues: {
      pointEstimate: "" as PointEstimate,
      assigneeId: "",
      name: "",
      dueDate: "",
      tags: [] as TaskTag[],
      status: Status.Backlog,
    },
  });

  const { createTask, loading, error } = useCreateTask();

  const handleSubmit = async (values: CreateTaskInput) => {
    try {
      //console.log("Form submitted:", values);
      await createTask(values);
      methods.reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    methods.reset();
    onClose();
  };

  const isFormValid = taskSchema.safeParse(methods.watch()).success;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {error && <p className="text-primary-200 mt-2">{error.message}</p>}
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
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-6 bg-transparent p-2 font-normal text-neutral-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-lg p-2 font-normal text-neutral-50 ${isFormValid ? "bg-primary-300" : "bg-primary-100 cursor-not-allowed"}`}
            disabled={loading || !isFormValid}
          >
            {loading ? "Creating" : "Create"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
