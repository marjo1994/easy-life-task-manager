import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

    screen.debug();

    expect(screen.getByText("Ios")).toBeInTheDocument();
    expect(screen.getByText("Rails")).toBeInTheDocument();
    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });
});
