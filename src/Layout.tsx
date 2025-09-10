import { type ReactNode } from "react";
import { Sidebar } from "./components/organisms/Sidebar";
import { SearchBar } from "./components/organisms/SearchBar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-400">
      <aside className="m-6 w-0 rounded-3xl bg-neutral-200 md:w-56 lg:w-[232px]">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col gap-6 pt-6 pr-6">
        <SearchBar />
        {children}
      </div>
    </div>
  );
};
