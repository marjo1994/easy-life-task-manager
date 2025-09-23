import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Card } from "../Card";
import type { GetTasksQuery } from "../../../__generated__/graphql";

vi.mock("../../../utils/utils", () => ({
  formatDate: vi.fn(() => ({ text: "Tomorrow", color: "text-warning" })),
}));

vi.mock("../../../utils/pointEstimateToNumber", () => ({
  pointEstimateToNumber: vi.fn(() => "4"),
}));

vi.mock("../../../utils/getAvatar", () => ({
  getAvatar: vi.fn(() => "avatar-url.png"),
}));

vi.mock("../../assets/file-icon.svg", () => "file-icon.svg");
vi.mock("../../assets/comment-icon.svg", () => "comment-icon.svg");
vi.mock("../../assets/three-dots.svg", () => "three-dots.svg");
vi.mock("../../assets/avatar.png", () => "avatar.png");
vi.mock("../../assets/alarm-icon.svg", () => "alarm-icon.svg");
vi.mock("../../assets/edit-icon.svg", () => "edit-icon.svg");
vi.mock("../../assets/delete-icon.svg", () => "delete-icon.svg");

type Task = GetTasksQuery["tasks"][number];

const mockTask: Task = {
  id: "1",
  name: "Test Task",
  pointEstimate: "FOUR",
  dueDate: new Date().toISOString(),
  tags: ["ANDROID", "IOS"],
  assignee: {
    id: "user-1",
    fullName: "John Doe",
  },
  status: "TODO",
  position: 0,
};

const defaultProps = {
  task: mockTask,
  onEditClick: vi.fn(),
  onDeleteClick: vi.fn(),
  isDragging: false,
};

describe("Card", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render task information correctly", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText("Tomorrow")).toBeInTheDocument();
    expect(screen.getByText("ANDROID")).toBeInTheDocument();
    expect(screen.getByText("IOS")).toBeInTheDocument();
  });

  it("should render assignee avatar when assignee exists", () => {
    render(<Card {...defaultProps} />);

    const avatarImg = screen.getByAltText("John Doe profile");
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", "avatar-url.png");
  });

  it("should render default avatar when no assignee", () => {
    const taskWithoutAssignee = {
      ...mockTask,
      assignee: null,
    };

    render(<Card {...defaultProps} task={taskWithoutAssignee} />);
    const defaultAvatar = screen.getByAltText("profile");
    expect(defaultAvatar).toBeInTheDocument();
  });

  it("should handle menu button click and show option", () => {
    render(<Card {...defaultProps} />);
    const menuButton = screen.getByAltText("three dots");
    fireEvent.click(menuButton);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
