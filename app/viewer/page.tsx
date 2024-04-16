import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";
import Link from 'next/link';

export default function Viewer() {
    // @ts-ignore
    return (
        <main>
            <Link href='/'>
                <h1>Image Viewer</h1>
            </Link>
            <div style={{width: 300}}>
                <div className="button-container" style={{marginTop: 24, justifyContent: "center"}}>
                    <Link href="/viewer/scan">
                        <label className='button-style'>
                            Scan QR Code
                        </label>
                    </Link>
                    <Link href="/viewer/search">
                        <label className='button-style'>
                            Search
                        </label>
                    </Link>
                </div>
            </div>
            <ToastContainer/>
        </main>
    );
}