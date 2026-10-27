"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { CalendarDays, MapPin, Eye, Trash2 } from "lucide-react";

type Booking = {
    _id: string;
    destinationId?: string;
    title: string;
    image: string;
    price: number;
    departure?: string;
    bookingDate?: string;
    status?: string;
    location?: string;
};

const API = "http://localhost:5000";

const formatDate = (date?: string) => {
    if (!date) return "Not specified";

    return new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function MyBookingsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user's bookings
    useEffect(() => {
        if (isPending) return;

        const email = session?.user?.email;

        if (!email) {
            setLoading(false);
            return;
        }

        const loadBookings = async () => {
            try {
                const res = await fetch(`${API}/my-bookings/${email}`);
                if (!res.ok) throw new Error();

                setBookings(await res.json());
            } catch {
                setError("Could not load your bookings. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [session?.user?.email, isPending]);

    // Cancel a booking
    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch(`${API}/my-bookings/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();

            setBookings(bookings.filter((b) => b._id !== id));
        } catch {
            alert("Could not cancel booking. Please try again.");
        }
    };

    // Loading UI
    if (isPending || loading) {
        return (
            <main className="mx-auto min-h-screen max-w-[1100px] px-6 pt-24">
                <h1 className="text-3xl font-light text-neutral-900">My Bookings</h1>
                <p className="mt-5 text-sm text-neutral-500">Loading bookings...</p>
            </main>
        );
    }

    // Login check
    if (!session?.user) {
        return (
            <main className="mx-auto min-h-screen max-w-[1100px] px-6 pt-24">
                <h1 className="text-3xl font-light text-neutral-900">My Bookings</h1>
                <p className="mt-3 text-sm text-neutral-500">
                    Please log in to view your bookings.
                </p>

                <Link
                    href="/login"
                    className="mt-5 inline-block bg-[#159fba] px-5 py-3 text-sm text-white"
                >
                    Log in
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-[1100px] px-5 pb-16 pt-24 md:px-6">
            {/* Page heading */}
            <h1 className="text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
                My Bookings
            </h1>

            <p className="mt-2 text-xs text-neutral-500 md:text-sm">
                Manage and view your upcoming travel plans
            </p>

            {/* Error message */}
            {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

            {/* Empty state */}
            {!error && bookings.length === 0 && (
                <div className="mt-6 border border-neutral-200 px-6 py-12 text-center">
                    <h2 className="text-xl text-neutral-800">No bookings found</h2>

                    <p className="mt-2 text-sm text-neutral-500">
                        Your travel bookings will appear here.
                    </p>

                    <Link
                        href="/destinations"
                        className="mt-5 inline-block bg-[#159fba] px-5 py-3 text-sm text-white"
                    >
                        Explore Destinations
                    </Link>
                </div>
            )}

            {/* Booking cards */}
            <div className="mt-6 space-y-3">
                {bookings.map((booking) => (
                    <article
                        key={booking._id}
                        className="flex flex-col gap-4 border border-neutral-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-4"
                    >
                        {/* Destination image */}
                        <img
                            src={booking.image}
                            alt={booking.title}
                            className="h-[190px] w-full shrink-0 object-cover sm:h-[125px] sm:w-[220px]"
                        />

                        {/* Booking information */}
                        <div className="min-w-0 flex-1 px-1 py-1">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium ${booking.status?.toLowerCase() === "pending"
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-green-50 text-green-600"
                                    }`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {booking.status || "Confirmed"}
                            </span>

                            <h2 className="mt-2 text-xl font-medium tracking-tight text-neutral-900">
                                {booking.title}
                            </h2>

                            <p className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500">
                                <CalendarDays size={12} />
                                Departure: {formatDate(booking.departure)}
                            </p>

                            <p className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500">
                                <MapPin size={12} />
                                Booking ID: {booking._id.slice(-6)}
                            </p>

                            <p className="mt-2 text-2xl font-medium text-[#159fba]">
                                ${booking.price}
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex shrink-0 gap-2 pb-1 sm:flex-col md:flex-row">
                            <button
                                type="button"
                                onClick={() => handleCancel(booking._id)}
                                className="flex h-[36px] flex-1 items-center justify-center gap-1.5 border border-red-300 px-3 text-[11px] text-red-500 transition-colors hover:bg-red-50 sm:flex-none"
                            >
                                <Trash2 size={12} />
                                Cancel
                            </button>

                            {booking.destinationId && (
                                <Link
                                    href={`/destination/${booking.destinationId || ""}`}
                                    className="flex h-[36px] flex-1 items-center justify-center gap-1.5 bg-[#159fba] px-3 text-[11px] text-white transition-colors hover:bg-[#118199] sm:flex-none"
                                >
                                    <Eye size={12} />
                                    View
                                </Link>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}