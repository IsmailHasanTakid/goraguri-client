"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <div className="col-start-3" />;
    }

    const handleSignout = () => {
        authClient.signOut();
    }

    return (
        <div className="col-start-3 flex items-center justify-end gap-5">
            {session?.user ? (
                <div className="flex items-center gap-3">
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-full bg-[#1597b8] px-4 py-1 text-white transition hover:opacity-90"
                    >
                        <User size={14} />
                        {session.user.name}
                    </Link>
                    <button
                        onClick={handleSignout}
                        className="transition-colors hover:text-[#1597b8]"
                    >
                        Sign out
                    </button>
                </div>
            ) : (
                <>
                    <Link href="/login" className="transition-colors hover:text-[#1597b8]">
                        Login
                    </Link>
                    <Link href="/signup" className="transition-colors hover:text-[#1597b8]">
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    );
}