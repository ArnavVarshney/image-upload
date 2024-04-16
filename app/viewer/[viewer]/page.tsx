'use client';

import React from 'react';
import '../../globals.css';

import {ToastContainer} from "react-toastify";

export default function Viewer({params}) {
    const decodedURI = decodeURIComponent(params.viewer);
    console.log(decodedURI)
    return (
        <main>
            <h1>Image Viewer</h1>
            <form>
                <div className="button-container">
                    <button type="submit">
                        Download
                    </button>
                    <button type="reset">
                        Reset
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </main>
    );
}