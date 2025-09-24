import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";

const MockPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

vi.mock("react-dom", () => ({
  createPortal: (children: React.ReactNode) => (
    <MockPortal>{children}</MockPortal>
  ),
}));

describe("Modal Component", () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: false,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeAll(() => {
    if (!document.body) {
      document.body = document.createElement("body");
    }
  });

  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />, {
      container: document.getElementById("root")!,
    });

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    expect(container.innerHTML).toBe("");
  });

  it("should render when isOpen is true", () => {
    render(<Modal {...defaultProps} isOpen={true} />, {
      container: document.getElementById("root")!,
    });

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call onClose when backdrop is clicked", () => {
    render(<Modal {...defaultProps} isOpen={true} />, {
      container: document.getElementById("root")!,
    });

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    if (!backdrop) {
      throw new Error("Backdrop element not found");
    }

    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when modal content is clicked", () => {
    render(<Modal {...defaultProps} isOpen={true} />, {
      container: document.getElementById("root")!,
    });

    const modalContent = screen.getByRole("dialog");
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should render children correctly", () => {
    const customChildren = (
      <div>
        <h1>Test Title</h1>
        <button>Click me</button>
      </div>
    );

    render(
      <Modal {...defaultProps} isOpen={true} children={customChildren} />,
      {
        container: document.getElementById("root")!,
      }
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should be accessible with dialog role", () => {
    render(<Modal {...defaultProps} isOpen={true} />, {
      container: document.getElementById("root")!,
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
