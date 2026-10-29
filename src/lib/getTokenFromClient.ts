"use client";

import { authClient } from "@/lib/auth-client";

export const getTokenFromClient = async () => {
    const { data, error } = await authClient.token();

    if (error) {
        throw new Error("Failed to get authentication token");
    }

    return data?.token;
};