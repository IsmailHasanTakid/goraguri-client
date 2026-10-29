import type { ReactNode } from "react";

type Feature = {
    title: string;
    description: string;
    icon: ReactNode;
};

const iconProps = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const features: Feature[] = [
    {
        title: "Safe & Secure",
        description:
            "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
        icon: (
            <svg {...iconProps}>
                <path d="M12 3 4.5 5.5v6c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5v-6L12 3Z" />
                <path d="m8.8 12 2.4 2.4 4.2-4.6" />
            </svg>
        ),
    },
    {
        title: "Expert Guides",
        description:
            "Local experts who bring destinations to life with authentic cultural insights.",
        icon: (
            <svg {...iconProps}>
                <path d="M3 6.5v13l6-2.5 6 2.5 6-2.5v-13l-6 2.5-6-2.5-6 2.5Z" />
                <path d="M9 4v13" />
                <path d="M15 7v13" />
            </svg>
        ),
    },
    {
        title: "24/7 Support",
        description:
            "Round-the-clock customer service to assist you wherever your journey takes you.",
        icon: (
            <svg {...iconProps}>
                <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                <rect x="3" y="13" width="4" height="6" rx="1.5" />
                <rect x="17" y="13" width="4" height="6" rx="1.5" />
                <path d="M19 19c0 1.5-1.5 2.5-4 2.5h-2" />
            </svg>
        ),
    },
];

export default function Choose() {
    return (
        <section className="w-full bg-[#e9f9fe] px-6 py-16 md:py-20">
            <div className="mx-auto max-w-6xl">
                <header className="text-center">
                    <h2
                        className="text-4xl font-normal tracking-tight text-[#0c1a24] md:text-5xl"
                        style={{
                            fontFamily:
                                '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                        }}
                    >
                        Why Choose Wanderlust
                    </h2>
                    <p className="mt-3 text-sm text-slate-500">
                        Your trusted partner for exceptional travel experiences
                    </p>
                </header>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className="rounded-sm border-b border-slate-200/70 bg-white px-6 py-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                        >
                            <div className="text-[#1aa3c4]">{feature.icon}</div>
                            <h3
                                className="mt-5 text-2xl font-normal text-[#0c1a24]"
                                style={{
                                    fontFamily:
                                        '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p className="mt-3 max-w-[30ch] text-[13px] leading-relaxed text-slate-500">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}