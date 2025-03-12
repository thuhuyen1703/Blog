import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function Header() {
   // const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <>
            <nav className="flex items-center justify-between p-4 bg-white dark:border-b-gray-500 dark:bg-[#181818] border-b fixed top-0 left-0 w-full z-50">
                <div className="text-2xl font-bold ml-5 text-gray-900 dark:text-white">
                    Your name
                </div>
                <div className="flex">
                <ul className="flex space-x-6 text-gray-800 dark:text-white font-semibold text-lg">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `mr-6 ${isActive ? "text-green-500" : "hover:text-green-500"}`
                            }
                        >
                            Blog
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/project"
                            className={({ isActive }) =>
                                `mr-6 ${isActive ? "text-green-500" : "hover:text-green-500"}`
                            }
                        >
                            Project
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `mr-6 ${isActive ? "text-green-500" : "hover:text-green-500"}`
                            }
                        >
                            About
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <NavLink
                            to="/newsletter"
                            className={({ isActive }) =>
                                `mr-6 ${isActive ? "text-green-500" : "hover:text-green-500"}`
                            }
                        >
                            Newsletter
                        </NavLink>
                    </li>
                     */}
                </ul>

                {/* Nút chuyển đổi Light/Dark mode */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className=" ml-5 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                </button>
                </div>
            </nav>
            <div className="pt-16"></div>
        </>
    );
}

export default Header;
