import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { ListBoxField } from "../ListBoxField";

const mockOptions = [
  { value: "option1", label: "Option 1", avatar: "avatar1.jpg" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", icon: "icon3.svg" },
];

describe("ListBoxField", () => {
  const defaultProps = {
    name: "testField",
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default selected option", () => {
    const TestComponent = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <ListBoxField {...defaultProps} />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("displays selected value from form context", () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { testField: "option2" } });
      return (
        <FormProvider {...methods}>
          <ListBoxField {...defaultProps} />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("opens dropdown and shows options when clicked", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <ListBoxField {...defaultProps} />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const button = screen.getByRole("button");
    await user.click(button);

    const dropdownOptions = screen.getAllByRole("option");
    expect(dropdownOptions).toHaveLength(mockOptions.length);

    dropdownOptions.forEach((option, index) => {
      expect(option.textContent).toBe(mockOptions[index].label);
    });
  });
});
