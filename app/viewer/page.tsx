import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";
import Link from 'next/link';
import dynamic from "next/dynamic";

const DynamicQRCodeScanner = dynamic(
    () => import('../components/qrcode_scanner').then((mod) => mod.QRCodeScanner),
    {ssr: false}
);

import dynamic from "next/dynamic";

const DynamicQRCodeScanner = dynamic(
    () => import('../components/qrcode_scanner').then((mod) => mod.QRCodeScanner),
    {ssr: false}
);

export default function Viewer() {
    // @ts-ignore
    return (
        <main>
            <h1>Image Viewer</h1>
            <p>Scan the QR code to view the image</p>
            <div style={{width: 300}}>
                <DynamicQRCodeScanner/>
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