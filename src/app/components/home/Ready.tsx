import Image from "next/image";
import Link from "next/link";

const headingFont =
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

export default function Ready() {
    return (
        <section className="relative isolate flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-[#0b1a1c] px-6 py-20">
            <Image
                src="/images/ready-bg.jpg"
                alt=""
                fill
                priority={false}
                sizes="100vw"
                className="-z-20 object-cover"
            />
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/25 to-black/60"
                aria-hidden
            />

            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                    className="text-4xl font-normal tracking-tight text-white md:text-5xl"
                    style={{ fontFamily: headingFont }}
                >
                    Ready To Start Your Journey?
                </h2>
                <p className="mt-3 text-sm text-white/90">
                    Join thousands of travelers who have discovered the world with us
                </p>

                <Link
                    href="/booking"
                    className="mt-8 inline-flex items-center gap-3 bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-wide text-[#0c1a24] transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Book your trip today
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                    >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}