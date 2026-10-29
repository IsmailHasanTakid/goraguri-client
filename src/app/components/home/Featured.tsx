"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Star } from "lucide-react";

type Destination = {
    _id: string;
    title: string;
    image: string;
    location: string;
    duration: string;
    price: number;
    rating: number;
    reviews: number;
};

const FeaturedPage = () => {
    const [feature, setFeature] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const featuredData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/destinations-limit"
                );

                if (!res.ok) {
                    throw new Error("Data not found");
                }

                const data = await res.json();
                setFeature(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        featuredData();
    }, []);

    const scrollCards = (direction: "left" | "right") => {
        const container = document.getElementById("featured-destinations");

        if (container) {
            container.scrollBy({
                left: direction === "right" ? 350 : -350,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return <p className="py-10 text-center">Loading destinations...</p>;
    }

    if (error) {
        return <p className="py-10 text-center text-red-500">{error}</p>;
    }

    return (
        <section className="w-full overflow-hidden bg-white px-5 py-16 md:px-10">
            <div className="mx-auto max-w-[1400px]">
                <div className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#1597b8]">
                        Explore the world
                    </p>

                    <h2 className="text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
                        Featured Destinations
                    </h2>

                    <p className="mt-2 text-sm text-neutral-500">
                        Discover places worth travelling to.
                    </p>
                </div>

                {feature.length === 0 ? (
                    <p className="py-10 text-center text-neutral-500">
                        No destinations available.
                    </p>
                ) : (
                    <div className="relative">
                        {/* Left Arrow */}
                        <button
                            type="button"
                            onClick={() => scrollCards("left")}
                            aria-label="Previous destinations"
                            className="absolute left-2 top-[35%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-800 shadow-lg backdrop-blur-sm transition hover:border-[#1597b8] hover:bg-[#1597b8] hover:text-white sm:left-3"
                        >
                            <ArrowLeft size={19} />
                        </button>

                        {/* Destination Cards */}
                        <div
                            id="featured-destinations"
                            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {feature.map((item) => (
                                <article
                                    key={item._id}
                                    className="group w-[85%] flex-none snap-start overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
                                >
                                    <div className="relative h-56 overflow-hidden bg-neutral-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm text-white">
                                            <MapPin size={15} />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-xl font-medium text-neutral-900">
                                                {item.title}
                                            </h3>

                                            <div className="flex shrink-0 items-center gap-1 text-sm">
                                                <Star
                                                    size={14}
                                                    fill="currentColor"
                                                    className="text-amber-500"
                                                />
                                                <span className="font-medium text-neutral-800">
                                                    {item.rating ?? 0}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-sm text-neutral-500">
                                            {item.duration}
                                        </p>

                                        <div className="mt-5 flex items-end justify-between border-t border-neutral-100 pt-4">
                                            <div>
                                                <p className="text-xs text-neutral-500">
                                                    Starting from
                                                </p>

                                                <p className="mt-1 text-xl font-semibold text-[#1597b8]">
                                                    ${Number(item.price).toLocaleString()}
                                                    <span className="text-xs font-normal text-neutral-500">
                                                        {" "}/ person
                                                    </span>
                                                </p>
                                            </div>

                                            <a
                                                href={`/destinations/${item._id}`}
                                                className="rounded-md bg-neutral-900 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1597b8]"
                                            >
                                                Explore
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            type="button"
                            onClick={() => scrollCards("right")}
                            aria-label="Next destinations"
                            className="absolute right-2 top-[35%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-800 shadow-lg backdrop-blur-sm transition hover:border-[#1597b8] hover:bg-[#1597b8] hover:text-white sm:right-3"
                        >
                            <ArrowRight size={19} />
                        </button>
                    </div>
                )}
            </div>
        </section>

    );
};

export default FeaturedPage;