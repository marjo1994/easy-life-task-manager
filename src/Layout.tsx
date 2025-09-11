import { type ReactNode } from "react";
import { Sidebar } from "./components/organisms/Sidebar";
import { SearchBar } from "./components/organisms/SearchBar";
import { FooterNav } from "./components/organisms/FooterNav";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-400">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col px-4 pt-6 lg:pr-6 lg:pl-0">
        <SearchBar />
        {children}
      </div>
      <FooterNav />
    </div>
  );
};
