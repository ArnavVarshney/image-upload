'use client';

import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";

export default function Viewer() {
    return (
        <main>
            <h1>Image Viewer</h1>
            <form>
                <div className="button-container">
                    <button type="reset">
                        Reset
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </main>
    );
}