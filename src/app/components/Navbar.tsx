"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

type NavLink = {
    label: string;
    href: string;
};

const leftLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destination" },
    { label: "My Bookings", href: "/my-bookings" },
    { label: "Admin", href: "/admin" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="absolute left-0 right-0 top-0 z-30 px-2 pt-2.5">
            <nav className="mx-auto grid h-[34px] w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center bg-white px-4 text-[13px] text-neutral-900 md:px-6">
                {/* Left links */}
                <ul className="hidden items-center gap-6 md:flex">
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

                {/* Right links */}
                <ul className="col-start-3 flex items-center justify-end gap-5">
                    <li>
                        <Link
                            href="/profile"
                            className="flex items-center gap-1.5 transition-colors hover:text-[#1597b8]"
                        >
                            <User size={13} strokeWidth={1.8} />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="transition-colors hover:text-[#1597b8]">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/signup" className="transition-colors hover:text-[#1597b8]">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}