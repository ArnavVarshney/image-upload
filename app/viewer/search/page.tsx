import React from 'react';
import '../../globals.css';
import SearchImages from "../../components/search";

export default function Viewer() {
    return (
        <main>
            <h1>Image Viewer</h1>
            <SearchImages/>
        </main>
    );
}