import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { useFormContext } from "react-hook-form";

type Option = {
  avatar?: string;
  value: string;
  label: string;
  icon?: string;
};

type ListBoxFieldProps = {
  name: string;
  options: Option[];
  icon?: string;
  avatar?: boolean;
  disabled?: boolean;
};

export const ListBoxField = ({
  name,
  options,
  icon,
  disabled = false,
  avatar = false,
}: ListBoxFieldProps) => {
  const { watch, setValue, register } = useFormContext();
  const value = watch(name);

  const isOptionSelected = value && value !== options[0]?.value;
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <>
      <Listbox value={value} onChange={(val) => setValue(name, val)}>
        <ListboxButton
          className={`text-body- flex flex-row items-center rounded-sm ${isOptionSelected ? "bg-transparent p-0" : "bg-neutral-100/10 px-4 py-1"}`}
        >
          {isOptionSelected && selectedOption.avatar && (
            <img
              src={selectedOption.avatar}
              alt={selectedOption.label}
              className="mr-2 h-6 w-6 rounded-full object-cover"
            />
          )}
          {!selectedOption.avatar && icon && (
            <img src={icon} alt={`${name} icon`} className="mr-2" />
          )}

          {selectedOption.label}
        </ListboxButton>
        {!disabled && (
          <ListboxOptions
            anchor="bottom start"
            className="z-50 mt-2 rounded-lg border border-neutral-100 bg-neutral-200 py-2"
          >
            {options.map((option, idx) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={`${idx != 0 ? "text-body-m flex cursor-pointer flex-row items-center px-4 py-2 text-neutral-50" : "text-body-xl cursor-pointer px-4 py-1 font-semibold text-neutral-100"}`}
              >
                {idx != 0 && icon && !avatar && (
                  <img src={icon} alt={`${name} icon`} className="mr-2" />
                )}
                {idx !== 0 && avatar && option.avatar && (
                  <img
                    src={option.avatar}
                    alt={option.label}
                    className="mr-2 h-6 w-6 rounded-full object-cover"
                  />
                )}
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </Listbox>
      <input type="hidden" {...register(name)} />
    </>
  );
};
