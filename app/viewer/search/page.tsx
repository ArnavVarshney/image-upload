import React from 'react';
import '../../globals.css';
import SearchImages from "../../components/search";
import Link from "next/link";

export default function Viewer() {
    return (
        <main>
            <Link href='/'>
                <h1>Image Viewer</h1>
            </Link>
            <SearchImages/>
        </main>
    );
}