import { Link } from "@inertiajs/react";
import React from "react";

export default function Navbar({ Auth }) {
    return (
        <nav className="w-10/12 desktop:w-9/12 mobile:w-full mx-auto  py-6 flex justify-between mobile:px-3">
            <img
                src="/Images/logo.png"
                alt="logo"
                className="w-[100px] h-auto object-contain"
            />

            <div className="flex gap-x-4">
                {Auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            Register
                        </Link>
                    </>
                )}
                <Link
                    href={route("explore")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                >
                    Explore
                </Link>
            </div>
        </nav>
    );
}
