"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";

const headingFont =
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "My Bookings", href: "/bookings" },
    { label: "My Profile", href: "/profile" },
];

const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
];

const socials: { label: string; href: string; icon: ReactNode }[] = [
    {
        label: "X",
        href: "https://x.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
            >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
        ),
    },
];

const columnTitle =
    "text-[15px] font-normal uppercase tracking-wide text-white";
const linkClass =
    "text-sm text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Footer() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: connect to your newsletter API
    };

    return (
        <footer className="w-full bg-[#0a0a0a] px-6 pb-8 pt-16 text-white md:px-16">
            <div className="mx-auto max-w-6xl">
                <div>
                    <h2
                        className="text-6xl font-bold leading-none tracking-tight md:text-7xl"
                        style={{ fontFamily: headingFont }}
                    >
                        Wanderlast
                    </h2>
                    <p className="mt-3 text-[15px] text-white/70">
                        Your gateway to extraordinary travel experiences around the world.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
                    <div>
                        <h3 className={columnTitle} style={{ fontFamily: headingFont }}>
                            Newsletter
                        </h3>
                        <p className="mt-2 text-[11px] text-white/60">
                            Subscribe for exclusive travel deals and inspiration.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-3 flex h-10 w-full max-w-[200px] items-center bg-[#2c2c2c] md:max-w-[200px]"
                        >
                            <label htmlFor="footer-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="footer-email"
                                type="email"
                                required
                                placeholder="Enter email"
                                className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-white placeholder:text-white/50 focus:outline-none"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="flex h-full w-10 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <path d="M7 17 17 7" />
                                    <path d="M8 7h9v9" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    <nav aria-label="Quick links">
                        <h3 className={columnTitle} style={{ fontFamily: headingFont }}>
                            Quick Links
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={linkClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Support">
                        <h3 className={columnTitle} style={{ fontFamily: headingFont }}>
                            Support
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={linkClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h3 className={columnTitle} style={{ fontFamily: headingFont }}>
                            Contact Us
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            <li>
                                <a href="tel:7869011622" className={linkClass}>
                                    786 901 1622
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@wandarland.com" className={linkClass}>
                                    info@wandarland.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="text-[11px] text-white/70">
                        &copy; 2026 Wanderlust. All rights reserved.
                    </p>
                    <ul className="flex items-center gap-5">
                        {socials.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    {social.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}