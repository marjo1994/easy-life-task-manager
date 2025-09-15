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

type AddTaskFormProps = {
  onSubmit: () => void;
};

export const AddTaskForm = ({ onSubmit }: AddTaskFormProps) => {
  const methods = useForm({ mode: "onChange" });

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
            name="labels"
            options={TaskTagOptions}
            icon={labelicon}
          />

          {/*<div className="flex flex-row items-center rounded-sm bg-neutral-100/10 px-4 py-1">
            <img src={duedateIcon} alt="Due Date Icon" className="mr-2" />
            <input
              type="date"
              {...methods.register("dueDate")}
              placeholder="Due Date"
              className="bg-transparent text-neutral-50 focus:outline-none"
            />
          </div>*/}
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
