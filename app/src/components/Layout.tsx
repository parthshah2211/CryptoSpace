import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="flex flex-col h-screen">
       <Header />

      <div className="flex flex-grow bg-gray-100">
    

        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
      <footer className="bg-primary text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>Welcome to the Crypto Dashboard!</p>
          <p>
            {currentYear} | Current Time:{" "}
            <span className="font-bold">{currentTime}</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
