"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignupPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message ?? "Something went wrong");
            return;
        }

        router.push("/");
        router.refresh();
    };

    const handleGoogleSignup = async () => {
        setErrorMessage("");

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            setErrorMessage(error.message ?? "Google sign up failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-500/5">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Start your journey with us today.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#111522] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#111522] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-xl border border-white/10 bg-[#111522] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            Password must be at least 6 characters.
                        </p>
                    </div>

                    {errorMessage && (
                        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account →"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 font-medium text-white transition hover:bg-white/[0.08]"
                >
                    Continue with Google
                </button>

                <div className="mt-7 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;