import React from "react";
import BlogList from "../posts/blogCard/BlogList";
import { useState, useEffect } from "react";
import BlogDetail from "../posts/blogCard/BlogDetail";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true)
            } else {
                setShowGoToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <div>
            <div className="dark:bg-[#222223] px-10 bg-[#f8f9f9]">
                <BlogList />
            </div>
            <div>
                <ul>

                    {showGoToTop && (
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300"
                        >
                            <ArrowUpIcon className="h-6 w-6" />
                        </button>
                    )}
                </ul>
            </div>
        </div>
    )
}