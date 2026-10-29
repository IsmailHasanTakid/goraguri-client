"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import AuthButtons from "../AuthButtons";


type NavLink = {
    label: string;
    href: string;
};

const leftLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destination" },
    { label: "My Bookings", href: "/my-bookings" },
    { label: "Add Destination", href: "/add-destination" },
    { label: "Admin", href: "/admin" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className=" sticky left-0 right-0 top-0 z-30 px-2 ">
            <nav className="mx-auto grid h-[34px] w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center bg-white px-4 text-[13px] text-neutral-900 md:px-6">
                {/* Left links */}
                <ul className="hidden items-center gap-6 md:flex py-3">
                    {leftLinks.map(({ label, href }) => {
                        const active = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={
                                        active
                                            ? "text-[#1597b8] underline underline-offset-4"
                                            : "transition-colors hover:text-[#1597b8]"
                                    }
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Logo */}
                <Link
                    href="/"
                    className="col-start-2 text-center text-[22px] font-semibold tracking-tight text-[#1597b8]"
                >
                    Wanderlast
                </Link>

                <AuthButtons />


            </nav>
        </header>
    );
}