import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
        <nav className="hidden md:flex space-x-6">
          <a
            href="/dashboard"
            className="hover:bg-secondary hover:text-white px-4 py-2 rounded-lg"
          >
            Dashboard
          </a>
          <a
            href="/overview"
            className="hover:bg-secondary hover:text-white px-4 py-2 rounded-lg"
          >
            Overview
          </a>
          <a
            href="/history"
            className="hover:bg-secondary hover:text-white px-4 py-2 rounded-lg"
          >
            History
          </a>
        </nav>
        <button
          className="md:hidden flex items-center justify-center p-2 bg-secondary rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
     {isMobileMenuOpen && (
        <nav className="bg-secondary md:hidden">
          <ul className="space-y-2 px-4 py-3 text-sm">
            <li>
              <a
                href="/dashboard"
                className="block text-white hover:bg-bullishDark px-4 py-2 rounded-lg"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/overview"
                className="block text-white hover:bg-bullishDark px-4 py-2 rounded-lg"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="/history"
                className="block text-white hover:bg-bullishDark px-4 py-2 rounded-lg"
              >
                History
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
