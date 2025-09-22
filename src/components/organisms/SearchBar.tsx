import { useState, useRef, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSearchStore } from "../../store/searchStore";
import { useUsers } from "../../hooks/useUsers";
import { PointEstimate, Status, TaskTag } from "../../__generated__/graphql";
import searchIcon from "../../assets/search-icon.svg";
import alertIcon from "../../assets/alert-icon.svg";
import profile from "../../assets/profile-pic.png";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { usersOptions } = useUsers();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const SUGGESTIONS = {
    status: Object.values(Status),
    tags: Object.values(TaskTag),
    estimate: Object.values(PointEstimate),
    assignee: usersOptions.map((user) => user.label),
    due: [],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(false);
    setActiveFilter(null);
  };

  const focusInputAtEnd = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 5);
  };

  const addFilter = (filterType: string) => {
    const newFilter = `${filterType}:`;
    const newSearchTerm = searchTerm ? `${searchTerm} ${newFilter}` : newFilter;
    setSearchTerm(newSearchTerm);
    setActiveFilter(filterType);
    setShowSuggestions(filterType !== "due");
    focusInputAtEnd();
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!activeFilter) return;

    const value =
      activeFilter === "assignee" && suggestion.includes(" ")
        ? `"${suggestion}"`
        : suggestion;

    const newSearchTerm = searchTerm.replace(
      `${activeFilter}:`,
      `${activeFilter}:${value}`
    );
    setSearchTerm(newSearchTerm);
    setShowSuggestions(false);
    setActiveFilter(null);
    focusInputAtEnd();
  };

  const handleDateSelect = (date: string) => {
    const newSearchTerm = searchTerm.replace(/due:$/, `due:${date}`);
    setSearchTerm(newSearchTerm);
    setShowSuggestions(false);
    setActiveFilter(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showSuggestions && !target?.closest(".suggestions-container")) {
        setShowSuggestions(false);
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSuggestions]);

  const filterButtons = [
    { type: "status", label: "status:" },
    { type: "tags", label: "tags:" },
    { type: "estimate", label: "estimate:" },
    { type: "assignee", label: "assignee:" },
    { type: "due", label: "due:" },
  ];

  return (
    <>
      <div className="relative flex w-full flex-row rounded-2xl bg-neutral-300 px-6 py-3">
        <div className="flex w-full flex-row items-center">
          <img src={searchIcon} alt="search icon" className="mr-6 h-6 w-6" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            className="text-body-m mr-2 w-full text-neutral-100 placeholder-neutral-100 focus:outline-none"
          />
        </div>

        {showSuggestions && activeFilter && activeFilter !== "due" && (
          <div className="suggestions-container absolute top-full left-12 z-20 mt-1 w-72 rounded-lg bg-neutral-200 shadow-lg">
            {SUGGESTIONS[activeFilter as keyof typeof SUGGESTIONS]?.map(
              (suggestion) => {
                return (
                  <div
                    key={suggestion}
                    className="text-body-s cursor-pointer px-4 py-2 text-neutral-50 hover:bg-neutral-300"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                );
              }
            )}
          </div>
        )}

        {activeFilter === "due" && (
          <div className="suggestions-container absolute top-full left-12 z-20 mt-1 w-72 rounded-lg bg-neutral-200 p-3 shadow-lg">
            <input
              type="date"
              onChange={(e) => handleDateSelect(e.target.value)}
              className="w-full rounded border border-neutral-300 bg-neutral-100 px-2 py-1 text-neutral-800"
            />
          </div>
        )}

        <div className="ml-auto flex flex-row items-center">
          <img className="mr-6 h-6 w-6" src={alertIcon} alt="alert icon" />
          <Menu>
            <MenuButton>
              <img src={profile} alt="profile image" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-2 min-w-38 rounded-lg border border-neutral-100 bg-neutral-200 p-2"
            >
              <MenuItem
                as="button"
                className="flex w-full flex-row items-center px-4 py-1.5 text-left text-neutral-50"
              >
                <a href="/profile">View Profile</a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {filterButtons.map((button) => (
          <button
            key={button.type}
            onClick={() => addFilter(button.type)}
            className="focus:ring-opacity-50 rounded-md border border-neutral-200 bg-neutral-300 px-3 py-1.5 text-sm text-neutral-100 transition-colors duration-200 hover:bg-neutral-200 hover:text-white focus:ring-2 focus:ring-neutral-100 focus:outline-none"
          >
            {button.label}
          </button>
        ))}
      </div>
    </>
  );
};
