"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

type SearchQuery = {
    location: string;
    duration: string;
    budget: string;
    people: string;
};

type Field = {
    key: keyof SearchQuery;
    label: string;
    placeholder: string;
};

const fields: Field[] = [
    { key: "location", label: "Location", placeholder: "Address, City Or Zip" },
    { key: "duration", label: "Date/Duration", placeholder: "Anytime/3 Days" },
    { key: "budget", label: "Budget", placeholder: "$0-$3000" },
    { key: "people", label: "People", placeholder: "5-10" },
];

export default function Hero() {
    const router = useRouter();
    const [query, setQuery] = useState<SearchQuery>({
        location: "",
        duration: "",
        budget: "",
        people: "",
    });

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(
            Object.entries(query).filter(([, value]) => value)
        ).toString();
        router.push(`/destinations${params ? `?${params}` : ""}`);
    };

    return (
        <section
            className="relative flex min-h-[460px] w-full flex-col justify-between bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
        >
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Centered content */}
            <div className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-24 text-center text-white">
                <h1 className="text-5xl font-light leading-[1.05] tracking-tight md:text-[68px]">
                    Discover Your
                    <br />
                    Next Adventure
                </h1>

                <p className="mt-6 max-w-[400px] text-[13px] leading-relaxed text-white/95">
                    Explore breathtaking destinations and create unforgettable memories
                    with our curated travel experiences.
                </p>

                <div className="mt-9 flex items-center gap-3">
                    <Link
                        href="/destinations"
                        className="flex h-[35px] items-center gap-5 bg-[#1597b8] px-5 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#118199]"
                    >
                        Explore Now
                        <ArrowRight size={14} />
                    </Link>
                    <Link
                        href="/destinations"
                        className="flex h-[35px] items-center bg-white/30 px-5 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                    >
                        View Destination
                    </Link>
                </div>
            </div>

            {/* Search bar */}
            <form
                onSubmit={handleSearch}
                className="relative z-10 grid w-full grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_190px]"
            >
                {fields.map(({ key, label, placeholder }) => (
                    <label
                        key={key}
                        className="flex h-[44px] flex-col justify-center border-r border-white/40 bg-neutral-500/60 px-3 text-white backdrop-blur-sm"
                    >
                        <span className="text-[15px] font-medium leading-tight">{label}</span>
                        <input
                            type="text"
                            value={query[key]}
                            onChange={(e) => setQuery({ ...query, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full bg-transparent text-[10px] text-white outline-none placeholder:text-white"
                        />
                    </label>
                ))}

                <button
                    type="submit"
                    className="col-span-2 h-[44px] bg-[#1597b8] text-sm font-medium text-white transition-colors hover:bg-[#118199] md:col-span-1"
                >
                    Search
                </button>
            </form>
        </section>
    );
}