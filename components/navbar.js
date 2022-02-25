import { React, Fragment } from "react";
import Search from "./search";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavbarSearch from "./navbarSearch";

let navbar_items = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Top 200",
    href: "/top/200",
  },
];

const Navbar = ({ darkMode , enableDark}) => {
  const router = useRouter();
  const current_locale = router.query.locale
  let searchbar_active = true
  let current_route = router.asPath
  if (current_route == "/")
  {
    searchbar_active = false
  }
  else if (current_route.startsWith("/search?q="))
  {
    searchbar_active = false
  }
  
  function enableDarkMode()
  {
      enableDark(!darkMode)
  }

  return (
    <div className="shadow px-4 py-4 lg:py-2 sticky top-0 z-50 bg-white dark:bg-black dark:shadow dark:shadow-slate-900 outline-none">
      <nav>
        <Menu>
          <div className="flex items-center justify-between">
          <Link href="/" passHref>
            <a>
            <div className="flex justify-items-center cursor-pointer">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-primary-600 dark:stroke-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              
                <div className="mx-2 font-bold text-primary-600 dark:text-primary-500 cursor-pointer">
                 UpToWord
                </div>
           
              
            </div>
            </a>
            </Link>
           
            
            
            <div className="hidden lg:block">
              <div className="flex justify-items-center text-gray-500 text-xs">

              <div className="mr-3 pt-1">
                <button onClick={enableDarkMode}>
                  {darkMode && (
                      
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 fill-slate-500 hover:fill-slate-300"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>

                  )}

                  {!darkMode && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 fill-slate-600 hover:fill-slate-900"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
                {navbar_items.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a>
                    <div
                      className={`${
                        current_route.split("/")[1] == item.href.split("/")[1]
                          ? "bg-primary-500 text-white "
                          : " "
                      } p-2 mx-1 hover:bg-primary-50 rounded cursor-pointer hover:text-indigo-500 dark:hover:bg-slate-800`}
                    >
                      {item.name}
                    </div>
                    </a>
                  </Link>
                ))}
               
              </div>
            </div>
            <div className="lg:hidden flex items-center">
              <div className="mx-2">
                <button onClick={enableDarkMode}>
                  {darkMode && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 fill-slate-500 hover:fill-slate-300"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  {!darkMode && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 fill-slate-600 hover:fill-slate-900"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div>
                <Menu.Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-primary-500 outline-none"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Menu.Button>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-90"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-90"
          >
            <Menu.Items>
              <div className="py-1 grid grid-cols-1 bg-white text-sm text-center pt-5 text-gray-500 dark:bg-black">
                {navbar_items.map((item) => (
                   <Link href={item.href} key={item.name} prefetch={false} passHref>
                     
                  <Menu.Item as="a" className={`${
                    current_route.split("/")[1] == item.href.split("/")[1]
                      ? "bg-primary-500 text-white"
                      : "bg-gray-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                  } rounded p-1 m-1`} key={item.name}>
                   
                        <span>
                        {item.name}
                        </span>
                        
                   
                  </Menu.Item>
                  
                  </Link>
                ))}

              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </div>
  );
};

export default Navbar;
