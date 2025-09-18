import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import searchIcon from "../../assets/search-icon.svg";
import alertIcon from "../../assets/alert-icon.svg";
import profile from "../../assets/profile-pic.png";
import { useSearchStore } from "../../store/searchStore";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex w-full flex-row rounded-2xl bg-neutral-300 px-6 py-3">
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
