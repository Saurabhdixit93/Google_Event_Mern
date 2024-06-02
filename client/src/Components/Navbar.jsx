import React, { useState } from "react";
import DarkModeToggle from "../theme/DarkToggle";
import { Link } from "react-router-dom";
import HoverToolTip from "./hoverTip/HoverToolTip";
import LoginModal from "./Login/LoginModal";
import SyncGoogleCalander from "./SyncCalendar/SyncGoogleCalander";
import ViewProfileBtn from "./ProfleView/ViewProfileBtn";
import ViewProfileModal from "./ProfleView/ViewProfileModal";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const token = localStorage.getItem("token");

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarLinks = [
    {
      title: "Home",
      path: "/",
    },
    // {
    //   title: "About",
    //   path: "/about",
    // },
    // {
    //   title: "Contact",
    //   path: "/contact",
    // },
  ];
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white class-display-bold">
                Calendar System
              </h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navbarLinks.map((link, index) => (
                  <HoverToolTip key={index} textMessage={link.title}>
                    <Link
                      className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
                      to={link.path}
                    >
                      {link.title}
                    </Link>
                  </HoverToolTip>
                ))}

                {!token && (
                  <button
                    className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-medium dark:border-white border dark:bg-transparent  dark:text-white"
                    onClick={openLoginModal}
                  >
                    Login
                  </button>
                )}

                {token && (
                  <>
                    <ViewProfileBtn onClick={() => setIsProfile(!isProfile)} />
                    <div className="ml-3">
                      <SyncGoogleCalander />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <DarkModeToggle />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            {navbarLinks.map((link, index) => (
              <Link
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
                key={index}
                to={link.path}
              >
                {link.title}
              </Link>
            ))}

            {!token && (
              <button
                className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-medium dark:border-white border dark:bg-transparent  dark:text-white"
                onClick={openLoginModal}
              >
                Login
              </button>
            )}

            {token && (
              <>
                <ViewProfileBtn onClick={() => setIsProfile(!isProfile)} />
                <div className="ml-3">
                  <SyncGoogleCalander />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isProfile && (
        <ViewProfileModal
          isOpen={isProfile}
          onClose={() => setIsProfile(!isProfile)}
        />
      )}
    </nav>
  );
}
