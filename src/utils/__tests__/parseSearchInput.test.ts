import { describe, it, expect } from "vitest";
import { parseSearchInput } from "../parseSearchInput";

describe("parseSearchInput", () => {
  it("should return empty object for empty input", () => {
    expect(parseSearchInput("")).toEqual({});
    expect(parseSearchInput(" ")).toEqual({});
  });

  it("should parse name only when no special patterns", () => {
    expect(parseSearchInput("simple search")).toEqual({
      name: "simple search",
    });
  });
  it("should parse assignee with quotes", () => {
    expect(parseSearchInput('assignee:"John Doe"')).toEqual({
      assigneeName: "John Doe",
    });
  });
  it("should parse assignee without quotes", () => {
    expect(parseSearchInput("assignee:John")).toEqual({
      assigneeName: "John",
    });
  });
  it("should parse status with quotes", () => {
    expect(parseSearchInput('status:"todo"')).toEqual({
      status: "todo",
    });
  });
  it("should parse status without quotes", () => {
    expect(parseSearchInput("status:done")).toEqual({
      status: "done",
    });
  });
  it("should parse point estimate with quotes", () => {
    expect(parseSearchInput('estimate:"three"')).toEqual({
      pointEstimate: "three",
    });
  });

  it("should parse point estimate without quotes", () => {
    expect(parseSearchInput("estimate:one")).toEqual({
      pointEstimate: "one",
    });
  });
  it("should parse due date with quotes", () => {
    expect(parseSearchInput('due:"2025-09-20"')).toEqual({
      dueDate: "2025-09-20",
    });
  });

  it("should parse tags with quotes", () => {
    expect(parseSearchInput('tags:"react,node_js,android"')).toEqual({
      tags: ["react", "node_js", "android"],
    });
  });
  it("should parse tags without quotes", () => {
    expect(parseSearchInput("tags:react,node_js,android")).toEqual({
      tags: ["react", "node_js", "android"],
    });
  });
  it("should trim and clean tags", () => {
    expect(parseSearchInput('tags:" react, node_js, android"')).toEqual({
      tags: ["react", "node_js", "android"],
    });
  });
  it("should handle complex search with multiple parameters", () => {
    const input =
      'Set up assignee:"marjorie" status:done tags:"react,node_js" estimate:five due:"2023-12-31"';

    expect(parseSearchInput(input)).toEqual({
      name: "Set up",
      assigneeName: "marjorie",
      status: "done",
      tags: ["react", "node_js"],
      pointEstimate: "five",
      dueDate: "2023-12-31",
    });
  });
});
