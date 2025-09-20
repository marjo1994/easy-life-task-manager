import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { TaskTag } from "../../__generated__/graphql";

type TaskTagOption = {
  value: TaskTag;
  label: string;
};

type MultiListBoxFieldProps = {
  name: string;
  options: TaskTagOption[];
  icon?: string;
};
export const MultiListBoxField = ({
  name,
  options,
  icon,
}: MultiListBoxFieldProps) => {
  const { watch, setValue, register } = useFormContext();
  const values: TaskTag[] = watch(name) || [];

  const toggleValue = (val: TaskTag) => {
    if (values.includes(val)) {
      setValue(
        name,
        values.filter((v) => v !== val)
      );
    } else {
      setValue(name, [...values, val]);
    }
  };

  const selectedOptions = options.filter((opt) => values.includes(opt.value));

  return (
    <>
      <Listbox value={values} onChange={() => {}} multiple>
        <ListboxButton
          className={`flex flex-row items-center rounded-sm ${selectedOptions.length > 0 ? "bg-transparent p-0" : "bg-neutral-100/10 px-4 py-1"}`}
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1">
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="text-body-m inline-flex items-center rounded-sm bg-neutral-100/10 px-4 py-1 font-medium text-neutral-50"
                >
                  {option.label}
                </span>
              ))}
            </div>
          ) : (
            <>
              {icon && <img src={icon} alt={`${name} icon`} className="mr-2" />}
              Label
            </>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="z-51 mt-2 rounded-lg border border-neutral-100 bg-neutral-200 py-2"
        >
          {options.map((opt) => (
            <ListboxOption
              key={opt.value}
              value={opt.value}
              as="div"
              className="text-body-m flex cursor-pointer items-center px-4 py-2 text-neutral-50"
            >
              <div className="relative mr-3 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={values.includes(opt.value)}
                  onClick={() => toggleValue(opt.value)}
                  readOnly
                  className="absolute h-5 w-5 cursor-pointer appearance-none rounded border-2 border-neutral-50"
                />
                {values.includes(opt.value) && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="-mt-1 h-3 w-2 origin-center rotate-45 transform border-r-2 border-b-2 border-neutral-50"></div>
                  </div>
                )}
              </div>
              {opt.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      <input type="hidden" {...register(name)} />
    </>
  );
};
