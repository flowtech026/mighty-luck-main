'use client'

import { store } from "@/store/store"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { Provider as ReduxProvider } from "react-redux"

export default function AuthProvider({
    children,

}: { children: React.ReactNode }) {
    return (
        <ReduxProvider store={store}>
            <SessionProvider refetchOnWindowFocus={false}>
                {children}
            </SessionProvider>
        </ReduxProvider>
    )
}

