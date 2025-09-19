import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isValid } from "date-fns";

type DatePickerFieldProps = {
  name: string;
  icon?: string;
  placeholder?: string;
};

const isoToDateOnly = (isoString: string | null): string | null => {
  if (!isoString) return null;
  return isoString.split("T")[0];
};

const dateOnlyToISO = (dateOnly: string | null): string | null => {
  if (!dateOnly) return null;
  return `${dateOnly}T00:00:00.000Z`;
};

const formatToDateOnly = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

const parseDateOnly = (dateOnly: string | null): Date | null => {
  if (!dateOnly) return null;
  try {
    const parsed = parseISO(dateOnly);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
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
      setValue(name, isoDate);
    } else {
      setValue(name, null);
    }
  };

  return (
    <div className="flex flex-row items-center rounded-sm bg-neutral-100/10 px-4 py-1">
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
