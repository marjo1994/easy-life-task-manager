import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { ListBoxField } from "../ListBoxField";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", icon: "icon3.svg" },
  { value: "option4", label: "Option 4", avatar: "avatar2.jpg" },
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

  it("selects an option when clicked", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({
        defaultValues: { testField: "option1" },
      });

      const currentValue = methods.watch("testField");

      return (
        <FormProvider {...methods}>
          <div>
            <ListBoxField {...defaultProps} />
            <div data-testid="current-value">{currentValue}</div>
          </div>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("current-value")).toHaveTextContent("option1");

    const button = screen.getByRole("button");
    await user.click(button);

    const options = await screen.findAllByRole("option");
    const option2 = options.find((opt) => opt.textContent === "Option 2");

    expect(option2).toBeDefined();
    await user.click(option2!);

    await waitFor(() => {
      expect(screen.getByTestId("current-value")).toHaveTextContent("option2");
    });
  });

  it("shows avatar for selected option when avatar prop is true", () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: { testField: "option4" },
      });
      return (
        <FormProvider {...methods}>
          <ListBoxField {...defaultProps} avatar={true} />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const avatarImg = screen.getByAltText("Option 4");
    expect(avatarImg).toBeInTheDocument();
  });

  it("shows icon when provided and option has no avatar", () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: { testField: "option3" },
      });
      return (
        <FormProvider {...methods}>
          <ListBoxField {...defaultProps} icon="custom-icon.svg" />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const iconImg = screen.getByAltText("testField icon");
    expect(iconImg).toBeInTheDocument();
  });
});
