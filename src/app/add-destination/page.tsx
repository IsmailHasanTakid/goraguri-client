"use client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
// import { authClient } from "@/lib/auth-client";

type DestinationForm = {
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

const initialForm: DestinationForm = {
    name: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const categories = [
    "Beach",
    "Mountain",
    "City",
    "Cultural",
    "Adventure",
    "Wildlife",
];

const headingFont =
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

const labelClass = "mb-1.5 block text-xs font-medium text-neutral-900";
const fieldClass =
    "w-full rounded-sm bg-[#f6f8fa] px-3 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 outline-none ring-1 ring-transparent transition focus:ring-[#1597b8]";

const AddDestinationPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<DestinationForm>(initialForm);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = await getTokenFromClient();

            if (!token) {
                throw new Error("Please log in first");
            }

            const destination = {
                title: form.name,
                location: form.country,
                category: form.category,
                price: Number(form.price),
                duration: form.duration,
                departureDate: form.departureDate,
                image: form.imageUrl,
                overview: form.description,
                rating: 0,
                reviews: 0,
                highlights: [],
                features: [],
            };

            const res = await fetch("http://localhost:5000/destinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(destination),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.msg || "Failed to add destination");
            }

            alert("Destination added successfully!");
            router.push("/destinations");
            router.refresh();
        } catch (error) {
            console.error("Error adding destination:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        }
    };

    return (
        <main className="min-h-screen bg-white px-6 pb-16 pt-24 md:px-10">
            <h1
                className="text-4xl font-normal tracking-tight text-[#0c1a24] md:text-5xl"
                style={{ fontFamily: headingFont }}
            >
                Add New Travel Package
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 w-full max-w-[520px] space-y-5 rounded-sm bg-white p-6 shadow-[0_1px_8px_rgba(15,23,42,0.1)]"
            >
                <div>
                    <label htmlFor="name" className={labelClass}>
                        Destination Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Bali Paradise"
                        className={fieldClass}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="country" className={labelClass}>
                            Country
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            value={form.country}
                            onChange={handleChange}
                            placeholder="Indonesia"
                            className={fieldClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className={labelClass}>
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={fieldClass}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="price" className={labelClass}>
                            Price (USD)
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            required
                            value={form.price}
                            onChange={handleChange}
                            placeholder="e.g., 1299"
                            className={fieldClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className={labelClass}>
                            Duration
                        </label>
                        <input
                            id="duration"
                            name="duration"
                            type="text"
                            required
                            value={form.duration}
                            onChange={handleChange}
                            placeholder="e.g., 7 Days/6 Nights"
                            className={fieldClass}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="departureDate" className={labelClass}>
                        Departure Date
                    </label>
                    <input
                        id="departureDate"
                        name="departureDate"
                        type="date"
                        required
                        value={form.departureDate}
                        onChange={handleChange}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl" className={labelClass}>
                        Image URL
                    </label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        required
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label htmlFor="description" className={labelClass}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the travel experience..."
                        className={`${fieldClass} resize-none`}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 rounded-sm border border-red-400 px-4 py-2.5 text-xs text-red-500 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                    >
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                        >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M6 6l1 14h10l1-14" />
                        </svg>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-sm bg-[#1597b8] px-4 py-2.5 text-xs text-white transition hover:bg-[#117f9b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1597b8]"
                    >
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                        >
                            <path d="M5 3h11l3 3v15H5z" />
                            <path d="M8 3v6h8V3" />
                            <path d="M8 21v-7h8v7" />
                        </svg>
                        Add Travel Package
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AddDestinationPage;