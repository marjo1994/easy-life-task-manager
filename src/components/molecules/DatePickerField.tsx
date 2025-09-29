import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../date-picker-styles.css";
import {
  dateOnlyToISO,
  formatToDateOnly,
  isoToDateOnly,
  parseDateOnly,
} from "../../utils/utils";

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
  const isoDateValue = watch(name);

  const dateOnlyValue = isoToDateOnly(isoDateValue);
  const selectedDate = parseDateOnly(dateOnlyValue);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateOnly = formatToDateOnly(date);
      const isoDate = dateOnlyToISO(dateOnly);
      setValue(name, isoDate, { shouldDirty: true });
    } else {
      setValue(name, null);
    }
  };

  return (
    <div className="flex flex-row items-center rounded-sm bg-neutral-100/10 px-4 py-1 text-neutral-50">
      {icon && <img src={icon} alt="Date icon" className="mr-2" />}

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        className="w-full bg-transparent text-white focus:outline-none"
        dateFormat="MMM d, yyyy"
        isClearable
      />

      <input type="hidden" {...register(name)} />
    </div>
  );
};
