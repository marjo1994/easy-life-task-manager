import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerFieldProps = {
  name: string;
  icon?: string;
  placeholder?: string;
};

export const DatePickerField = ({
  name,
  icon,
  placeholder = "Due Date",
}: DatePickerFieldProps) => {
  const { watch, setValue, register } = useFormContext();
  const dateValue = watch(name);
  const selectedDate = dateValue ? new Date(dateValue) : null;

  const handleDateChange = (date: Date | null) => {
    const isoDate = date ? date.toISOString().split("T")[0] : null;
    setValue(name, isoDate);
  };

  return (
    <div className="flex flex-1 flex-row items-center rounded-sm bg-neutral-100/10 px-4 py-1">
      {icon && <img src={icon} alt="Date icon" className="mr-2" />}

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        className="w-full bg-transparent text-neutral-50 focus:outline-none"
        dateFormat="MMM d, yyyy"
        isClearable
      />

      <input type="hidden" {...register(name)} />
    </div>
  );
};
