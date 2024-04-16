'use client';

import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";
import Link from 'next/link';
import {QRCodeScanner} from "../components/qrcode_scanner";

export default function Viewer() {
    // @ts-ignore
    return (
        <main>
            <h1>Image Viewer</h1>
            <p>Scan the QR code to view the image</p>
            <div style={{width: 300}}>
                <QRCodeScanner/>
                <div className="button-container" style={{marginTop: 24, justifyContent: "center"}}>
                    <Link href="/">
                        <label className='button-style'>
                            Home
                        </label>
                    </Link>
                </div>
            </div>
            <ToastContainer/>
        </main>
    );
}