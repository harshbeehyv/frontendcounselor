import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CounselorLogo from "../counselor-app-assets/counselor-logo-removebg.png";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Summary Report", href: "#", current: false },
  { name: "Counselee-wise Report", href: "#", current: false },
  { name: "Date-wise Report", href: "#", current: false },
  { name: "Chanting Attendance", href: "#", current: false },
  { name: "Mangal Aarti Attendance", href: "#", current: false },
  { name: "SB Class Attendance", href: "", current: false },
  { name: "Chanting Completion Time", href: "", current: false },
  { name: "Book Reading Duration", href: "", current: false },
  { name: "Lecture Hearing Duration", href: "", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCounselorLoggedIn, setIsCounselorLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsUserLoggedIn(!!user);
  });

  useEffect(() => {
    const counselor = localStorage.getItem("loggedInCounselor");
    setIsCounselorLoggedIn(!!counselor);
  });

  const handleSignOut = () => {
    if (isUserLoggedIn) {
      localStorage.removeItem("loggedInUser");
      setIsUserLoggedIn(false);
      navigate("/user-login");
    } else {
      localStorage.removeItem("loggedInCounselor");
      setIsCounselorLoggedIn(false);
      navigate("/counselor-login");
    }
  };

  const handleSignIn = () => {
    navigate("/counselor-login");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <button
                  className="flex flex-shrink-0 items-center focus:outline-none"
                  onClick={() => navigate("/")}
                >
                  <img
                    className="h-10 w-auto"
                    src={CounselorLogo}
                    alt="Your Company"
                  />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isUserLoggedIn || isCounselorLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-white"
                  >
                    <GoSignOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="flex items-center space-x-1 text-white"
                  >
                    <GoSignIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
