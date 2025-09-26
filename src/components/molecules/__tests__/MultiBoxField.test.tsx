import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { MultiListBoxField } from "../MultiListBoxField";
import { TaskTag } from "../../../__generated__/graphql";

const mockOptions: { value: TaskTag; label: string }[] = [
  { value: TaskTag.Ios, label: "Ios" },
  { value: TaskTag.Android, label: "Android" },
  { value: TaskTag.NodeJs, label: "Nodejs" },
  { value: TaskTag.Rails, label: "Rails" },
];

describe("MultiListBoxField", () => {
  const defaultProps = {
    name: "tags",
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default label when no values are selected", () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { tags: [] } });
      return (
        <FormProvider {...methods}>
          <MultiListBoxField {...defaultProps} />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows icon when provided and no values are selected", () => {
    const TestComponent = () => {
      const methods = useForm({ defaultValues: { tags: [] } });
      return (
        <FormProvider {...methods}>
          <MultiListBoxField {...defaultProps} icon="tag-icon.svg" />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const iconImg = screen.getByAltText("tags icon");
    expect(iconImg).toBeInTheDocument();
    expect(iconImg).toHaveAttribute("src", "tag-icon.svg");
  });

  it("displays selected values as tags", () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: { tags: [TaskTag.Ios, TaskTag.Rails] },
      });
      return (
        <FormProvider {...methods}>
          <MultiListBoxField {...defaultProps} />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText("Ios")).toBeInTheDocument();
    expect(screen.getByText("Rails")).toBeInTheDocument();
    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });
  it("toggles value when checkbox is clicked", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({ defaultValues: { tags: [TaskTag.Ios] } });
      return (
        <FormProvider {...methods}>
          <div>
            <MultiListBoxField {...defaultProps} />
            <div data-testid="current-values">
              {JSON.stringify(methods.watch("tags"))}
            </div>
          </div>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("current-values")).toHaveTextContent(
      JSON.stringify([TaskTag.Ios])
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const options = screen.getAllByRole("option");
    const androidOption = options.find((opt) =>
      opt.textContent?.includes("Android")
    );
    expect(androidOption).toBeDefined();

    if (androidOption) {
      const androidCheckbox = androidOption.querySelector(
        'input[type="checkbox"]'
      )!;
      await user.click(androidCheckbox);
    }

    await waitFor(() => {
      expect(screen.getByTestId("current-values")).toHaveTextContent(
        JSON.stringify([TaskTag.Ios, TaskTag.Android])
      );
    });

    const iosOption = options.find((opt) => opt.textContent?.includes("Ios"));
    expect(iosOption).toBeDefined();

    if (iosOption) {
      const iosCheckbox = iosOption.querySelector('input[type="checkbox"]')!;
      await user.click(iosCheckbox);
    }

    await waitFor(() => {
      expect(screen.getByTestId("current-values")).toHaveTextContent(
        JSON.stringify([TaskTag.Android])
      );
    });
  });
});
