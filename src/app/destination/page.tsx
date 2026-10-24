"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Calendar, ChevronDown, MapPin, Star } from "lucide-react";

type Destination = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    location: string;
    duration: string;
    rating: number;
};

const filters = ["Category", "Price Range", "Sort By"];

const DestinationPage = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/destinations");
                const data = await res.json();
                setDestinations(data);
            } catch (err) {
                console.log("Error Occurs:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="mx-auto w-full max-w-[1100px] px-6 pb-16 pt-24">
            {/* Heading */}
            <h1 className="text-4xl font-light tracking-tight text-neutral-900 md:text-[40px]">
                Explore All Destinations
            </h1>
            <p className="mt-3 text-[13px] text-neutral-600">
                Find your perfect travel experience from our curated collection
            </p>

            {/* Filters (UI only) */}
            <div className="mt-8 grid grid-cols-1 border border-neutral-300 md:grid-cols-3">
                {filters.map((label) => (
                    <button
                        key={label}
                        type="button"
                        className="flex h-[46px] items-center justify-between border-b border-neutral-300 px-4 text-[13px] uppercase tracking-wide text-neutral-600 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                    >
                        {label}
                        <ChevronDown size={16} className="text-neutral-500" />
                    </button>
                ))}
            </div>

            <p className="mt-5 text-[13px] text-neutral-600">
                Showing {destinations.length} destinations
            </p>

            {/* Cards */}
            <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((item) => (
                    <article key={item._id}>
                        {/* Image + rating badge */}
                        <div className="relative h-[185px] w-full overflow-hidden bg-neutral-200">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute right-0 top-2.5 flex items-center gap-1.5 bg-white/85 px-3 py-1.5 text-xs text-neutral-900">
                                {item.rating}
                                <Star size={13} fill="currentColor" />
                            </div>
                        </div>

                        {/* Location */}
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
                            <MapPin size={13} />
                            {item.location}
                        </p>

                        {/* Title + price */}
                        <div className="mt-1.5 flex items-baseline justify-between">
                            <h2 className="text-[15px] text-neutral-900">{item.title}</h2>
                            <p className="text-[15px] font-medium text-neutral-900">
                                ${item.price}
                                <span className="text-[10px] font-normal text-neutral-500">
                                    /Person
                                </span>
                            </p>
                        </div>

                        {/* Duration */}
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600">
                            <Calendar size={13} />
                            {item.duration}
                        </p>

                        {/* Book now */}
                        <Link
                            href={`/destination/${item._id}`}
                            className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#1597b8] underline underline-offset-4"
                        >
                            Book Now
                            <ArrowUpRight size={13} />
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default DestinationPage;