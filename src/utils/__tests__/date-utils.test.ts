import { describe, it, expect } from "vitest";
import { normalizeDate, formatDate } from "../utils";

describe("normalizeDate", () => {
  it("removes tiem from a date", () => {
    const date = new Date("2025-09-23T15:40:00");
    const normalized = normalizeDate(date);

    expect(normalized.getHours()).toBe(0);
    expect(normalized.getMinutes()).toBe(0);
    expect(normalized.getSeconds()).toBe(0);
  });
});

describe("formatDate", () => {
  it("returns 'No date' when input is empty", () => {
    const result = formatDate("");
    expect(result).toEqual({ text: "No date", color: "text-gray-400" });
  });
  it("returns 'Invalid Date' for wrong string", () => {
    const result = formatDate("not-a-date");
    expect(result).toEqual({ text: "Invalid date", color: "text-gray-400" });
  });

  it("returns TODAY for today's date", () => {
    const today = new Date();
    const iso = today.toISOString();
    const result = formatDate(iso);

    expect(result.text).toBe("TODAY");
  });

  it("returns YESTERDAY for yesterday's date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const iso = yesterday.toISOString();
    const result = formatDate(iso);

    expect(result.text).toBe("YESTERDAY");
  });

  it("formats a valid future date", () => {
    const date = new Date("2030-12-25T00:00:00.000Z");
    const iso = date.toISOString();
    const result = formatDate(iso);

    expect(result.text).toBe("25 DECEMBER, 2030");
    expect(result.color).toContain("text-green-500");
  });

  it("returns yellow when less than 2 days away", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString();
    const result = formatDate(iso);

    expect(result.color).toContain("text-yellow-");
  });

  it("returns red for past dates", () => {
    const past = new Date();
    past.setDate(past.getDate() - 5);
    const iso = past.toISOString();
    const result = formatDate(iso);

    expect(result.color).toContain("text-red-");
  });
});
