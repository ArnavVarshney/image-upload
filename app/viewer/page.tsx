'use client';

import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";
import {QrReader} from "react-qr-reader";
import Link from 'next/link';

export default function Viewer() {
    // @ts-ignore
    return (
        <main>
            <h1>Image Viewer</h1>
            <p>Scan the QR code to view the image</p>
            <div style={{width: 300}}>
                <QrReader
                    onResult={(result, error) => {
                        if (result && result.text.startsWith('https://image-uploader-aws.vercel.app')) {
                            window.location.href = result.text;
                        }
                    }}
                    style={{width: '100%'}}
                />
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