import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import avatarImg from "../../assets/avatar.png";

type Option = {
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

  return (
    <>
      <Listbox value={value} onChange={(val) => setValue(name, val)}>
        <ListboxButton
          className={`text-body- flex flex-1 flex-row items-center rounded-sm ${isOptionSelected ? "bg-transparent p-0" : "bg-neutral-100/10 px-4 py-1"}`}
        >
          {icon && <img src={icon} alt={`${name} icon`} className="mr-2" />}
          {options.find((opt) => opt.value === value)?.label ||
            options[0].label}
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
                {idx != 0 && avatar && (
                  <img src={avatarImg} alt={option.label} className="mr-2" />
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
