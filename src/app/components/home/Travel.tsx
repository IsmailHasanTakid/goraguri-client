"use client";

import Image from "next/image";
import { useRef } from "react";

type Testimonial = {
    quote: string;
    name: string;
    location: string;
    image: string;
};

const testimonials: Testimonial[] = [
    {
        quote:
            "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
        name: "Michael Chen",
        location: "Singapore",
        image: "/images/travelers/michael.jpg",
    },
    {
        quote:
            "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "/images/travelers/sarah.jpg",
    },
];

const headingFont =
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            {direction === "left" ? (
                <>
                    <path d="M19 12H5" />
                    <path d="m11 6-6 6 6 6" />
                </>
            ) : (
                <>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </>
            )}
        </svg>
    );
}

export default function Travel() {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        const track = trackRef.current;
        if (!track) return;
        const amount = track.clientWidth / 2;
        track.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    const arrowClass =
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:border-slate-500 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1aa3c4]";

    return (
        <section className="w-full bg-white px-6 py-16 md:py-20">
            <div className="mx-auto max-w-6xl">
                <header className="flex items-start justify-between gap-6">
                    <div>
                        <h2
                            className="text-4xl font-normal tracking-tight text-[#0c1a24] md:text-5xl"
                            style={{ fontFamily: headingFont }}
                        >
                            What Travelers Say
                        </h2>
                        <p className="mt-3 text-sm text-slate-500">
                            Real experiences from our happy travelers
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            className={arrowClass}
                            aria-label="Previous testimonials"
                        >
                            <ArrowIcon direction="left" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            className={arrowClass}
                            aria-label="Next testimonials"
                        >
                            <ArrowIcon direction="right" />
                        </button>
                    </div>
                </header>

                <div
                    ref={trackRef}
                    className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {testimonials.map((item) => (
                        <article
                            key={item.name}
                            className="flex w-full shrink-0 snap-start flex-col-reverse justify-between gap-6 border border-slate-200/80 bg-white p-4 sm:flex-row md:w-[calc(50%-0.5rem)]"
                        >
                            <div className="flex flex-1 flex-col justify-between gap-6 pt-1">
                                <blockquote
                                    className="text-[19px] leading-snug text-[#0c1a24]"
                                    style={{ fontFamily: headingFont }}
                                >
                                    &ldquo;{item.quote}&rdquo;
                                </blockquote>

                                <div>
                                    <p className="text-sm text-[#1aa3c4]">
                                        <span aria-hidden>— </span>
                                        {item.name}
                                    </p>
                                    <p className="mt-0.5 pl-5 text-xs text-slate-500">
                                        {item.location}
                                    </p>
                                </div>
                            </div>

                            <div className="relative h-56 w-full shrink-0 sm:h-[180px] sm:w-[137px]">
                                <Image
                                    src={item.image}
                                    alt={`Portrait of ${item.name}`}
                                    fill
                                    sizes="137px"
                                    className="object-cover"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}