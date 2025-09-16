import { FormProvider, useForm } from "react-hook-form";
//import { zodResolver } from "@hookform/resolvers/zod";
import estimateicon from "../../assets/control-estimate-icon.svg";
import labelicon from "../../assets/label-icon.svg";
import duedateIcon from "../../assets/due-date-icon.svg";
import { ListBoxField } from "../molecules/ListBoxField";
import { UserSelector } from "../molecules/userSelector";
import { MultiListBoxField } from "../molecules/MultiListBoxField";
import { TaskTagOptions } from "../../utils/taskTagOptions";
import { PointEstimateOptions } from "../../utils/pointEstimateOptions";
import { DatePickerField } from "../molecules/DatePickerField";

type AddTaskFormProps = {
  onSubmit: () => void;
};

export const AddTaskForm = ({ onSubmit }: AddTaskFormProps) => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      estimate: "",
      assignee: "",
      name: "",
      dueDate: "",
      label: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log("Form submitted:", data);
          onSubmit();
          methods.reset();
        })}
      >
        <div className="mb-6">
          <label className="hidden">Task Name</label>
          <input
            className="text-body-xl font-semibold text-neutral-50 placeholder-neutral-100 focus:outline-none"
            {...methods.register("name")}
            placeholder="Task Title"
          ></input>
        </div>

        <div className="mb-6 flex flex-row items-center gap-4 text-neutral-50">
          <ListBoxField
            name="estimate"
            options={[
              { value: "", label: "Estimate" },
              ...PointEstimateOptions,
            ]}
            icon={estimateicon}
          />

          <UserSelector />

          <MultiListBoxField
            name="label"
            options={TaskTagOptions}
            icon={labelicon}
          />

          <DatePickerField
            name="dueDate"
            icon={duedateIcon}
            placeholder="Due Date"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-6 bg-transparent p-2 font-normal text-neutral-50"
            onClick={() => methods.reset()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-300 rounded-lg p-2 font-normal text-neutral-50"
          >
            Create
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
