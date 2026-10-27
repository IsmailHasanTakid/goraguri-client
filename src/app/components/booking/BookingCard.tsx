"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Check } from "lucide-react";

const BookingCard = ({ destination }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            setMessage("Please log in before booking.");
            return;
        }

        const departure = e.currentTarget.departureDate.value;

        if (!departure) {
            setMessage("Please select a departure date.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            const { _id: destinationId, ...destinationData} = destination;

            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...destinationData,
                    destinationId,
                    username: user.name,
                    email: user.email,
                    departure,
                    bookingDate: new Date().toISOString(),
                    status: "Confirmed",
                }),
            });

            if (!res.ok) {
                throw new Error("Booking failed");
            }

            setMessage("Booking created successfully!");
        } catch {
            setMessage("Could not create booking. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <aside className="h-fit border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-neutral-500">Starting from</p>

            <p className="mt-1 text-3xl font-semibold text-[#1597b8]">
                ${destination.price}
            </p>

            <p className="mt-1 text-xs text-neutral-500">per person</p>

            <form onSubmit={handleBooking}>
                <input
                    type="date"
                    name="departureDate"
                    aria-label="Departure date"
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                    className="mt-5 h-[40px] w-full bg-neutral-50 px-3 text-[13px] text-neutral-800 outline-none"
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 flex h-[42px] w-full items-center justify-center gap-2 bg-[#1597b8] text-[13px] text-white transition-colors hover:bg-[#118199] disabled:opacity-60"
                >
                    {submitting ? "Booking..." : "Book Now"}
                    <ArrowRight size={14} />
                </button>

                {message && (
                    <p className="mt-3 text-xs text-neutral-600">
                        {message}
                    </p>
                )}
            </form>

            <ul className="mt-4 space-y-2">
                {destination.features?.map((text) => (
                    <li
                        key={text}
                        className="flex items-center gap-2 text-[11px] text-neutral-600"
                    >
                        <Check size={13} className="shrink-0 text-green-600" />
                        {text}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default BookingCard;