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
  //const [showFilters, setShowFilters] = useState(false);

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

  const addFilter = (filterType: string) => {
    // Agregar la estructura del filtro con placeholder
    const newFilter = `${filterType}:`; // ej: "status:" o "tag:"
    const newSearchTerm = searchTerm ? `${searchTerm} ${newFilter}` : newFilter;
    setSearchTerm(newSearchTerm);
    // Enfocar el input después de agregar el filtro
    setTimeout(() => {
      const input = document.querySelector(
        'input[type="search"]'
      ) as HTMLInputElement;
      if (input) input.focus();
    }, 100);
  };

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
            type="search"
            placeholder="Search"
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

      {/*searchTerm && (
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-sm text-gray-600">
            Escribe los valores después de los dos puntos:
          </p>
          <div className="rounded border border-gray-200 bg-white p-2">
            <code className="text-sm text-gray-800">{searchTerm}</code>
          </div>
        </div>
      )*/}
    </>
  );
};
