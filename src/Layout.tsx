import { useState, type ReactNode } from "react";
import { Sidebar } from "./components/organisms/Sidebar";
import { SearchBar } from "./components/organisms/SearchBar";
import { FooterNav } from "./components/organisms/FooterNav";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/organisms/ErrorFallback";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-neutral-400 px-0 pt-2 lg:px-6 lg:pt-6">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-4 shrink-0 lg:mx-0">
          <SearchBar />
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
      </div>
      <FooterNav />
    </div>
  );
};
