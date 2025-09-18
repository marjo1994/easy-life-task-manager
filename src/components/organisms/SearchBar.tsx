import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import searchIcon from "../../assets/search-icon.svg";
import alertIcon from "../../assets/alert-icon.svg";
import profile from "../../assets/profile-pic.png";
import { useSearchStore } from "../../store/searchStore";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { usersOptions } = useUsers();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const lastAssigneeIndex = value.toLowerCase().lastIndexOf("assignee:");

    if (lastAssigneeIndex !== -1) {
      const textAfterAssignee = value.substring(lastAssigneeIndex + 9);
      const hasQuoteOrSpace = /["\s]/.test(textAfterAssignee);

      setShowSuggestions(!hasQuoteOrSpace);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectAssignee = (fullName: string) => {
    const newValue = searchTerm.replace(
      /assignee:"?[^"]*"?/i,
      `assignee:"${fullName}"`
    );
    setSearchTerm(newValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex w-full flex-row rounded-2xl bg-neutral-300 px-6 py-3">
      <div className="flex w-full flex-row items-center">
        <img src={searchIcon} alt="search icon" className="mr-6 h-6 w-6" />
        <input
          type="search"
          placeholder="Name assignee:xxx estimate:two tags:rails,react status:todo"
          value={searchTerm}
          onChange={handleInputChange}
          className="text-body-m text-neutral-100 placeholder-neutral-100 focus:outline-none lg:w-full"
        />
      </div>

      {showSuggestions && (
        <div className="absolute top-12 left-12 z-20 w-72 rounded-lg bg-neutral-200 shadow-lg">
          {usersOptions.map((u) => (
            <div
              key={u.value}
              className="hover:bg-neutral- cursor-pointer px-4 py-2 text-neutral-50"
              onClick={() => handleSelectAssignee(u.label)}
            >
              {u.label}
            </div>
          ))}
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
  );
};
