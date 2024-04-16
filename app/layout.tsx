import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Image Uploader", description: "Upload images to S3",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <Analytics/>
        <SpeedInsights/>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
