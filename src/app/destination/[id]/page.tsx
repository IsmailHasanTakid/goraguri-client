"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import BookingCard from "@/app/components/booking/BookingCard";
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Check,
    MapPin,
    Pencil,
    Star,
    Trash2,
} from "lucide-react";
type Destination = {
    _id: string;
    title: string;
    image: string;
    overview: string;
    price: number;
    location: string;
    duration: string;
    rating: number;
    reviews: number;
    highlights: string[];
    features: string[];
};

const DetailsPage = () => {

    const { id } = useParams<{ id: string }>();

    const [item, setItem] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/destinations/${id}`)
                const data = await res.json();
                setItem(data);
            }
            catch (err) {
                console.log("error occurs:", err)

            }
            finally {
                setLoading(false);
            }

        }

        fetchDetails();
    }, [id]);
    if (loading) {
        return <p className="px-6 pt-28 text-center text-sm">Loading...</p>;
    }

    if (!item) {
        return <p className="px-6 pt-28 text-center text-sm">Destination not found</p>;
    }


    return (
        <main className="mx-auto w-full max-w-[1100px] px-6 pb-16 pt-20">
            {/* Top bar */}
            <div className="flex items-center justify-between">
                <Link
                    href="/destinations"
                    className="flex items-center gap-2 text-[13px] text-neutral-600 hover:text-neutral-900"
                >
                    <ArrowLeft size={14} />
                    Back to Destinations
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex h-[34px] items-center gap-2 border border-neutral-300 px-4 text-xs text-neutral-900"
                    >
                        <Pencil size={13} />
                        Edit
                    </button>
                    <button
                        type="button"
                        className="flex h-[34px] items-center gap-2 border border-red-300 px-5 text-xs text-red-500"
                    >
                        <Trash2 size={13} />
                        Cancel
                    </button>
                </div>
            </div>

            {/* Banner */}
            <div className="mt-3 h-[220px] w-full overflow-hidden bg-neutral-200 md:h-[265px]">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>

            <hr className="mt-8 border-neutral-200" />

            {/* Content */}
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_300px]">
                {/* Left */}
                <div>
                    <p className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <MapPin size={13} />
                        {item.location}
                    </p>

                    <h1 className="mt-1 text-4xl font-light tracking-tight text-neutral-900">
                        {item.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5">
                            <Star size={13} className="text-green-600" fill="currentColor" />
                            <span className="font-semibold">{item.rating}</span>
                            <span className="text-neutral-500">({item.reviews} reviews)</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                            <Calendar size={13} />
                            {item.duration}
                        </span>
                    </div>

                    <h2 className="mt-8 text-2xl font-light text-neutral-900">Overview</h2>
                    <p className="mt-2 max-w-[520px] text-[13px] leading-relaxed text-neutral-600">
                        {item.overview}
                    </p>

                    <h2 className="mt-8 text-2xl font-light text-neutral-900">Highlights</h2>
                    <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {item.highlights?.map((text) => (
                            <li key={text} className="flex items-center gap-2 text-xs text-neutral-700">
                                <Check size={14} className="shrink-0 text-green-600" />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: booking card */}
                <BookingCard destination={item} />
            </div>
        </main>
    );
};

export default DetailsPage;