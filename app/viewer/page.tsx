'use client';

import React from 'react';
import '../globals.css';

import {ToastContainer} from "react-toastify";
import {Scanner} from '@yudiel/react-qr-scanner';
import Link from 'next/link';

export default function Viewer() {
    // @ts-ignore
    return (
        <main>
            <h1>Image Viewer</h1>
            <p>Scan the QR code to view the image</p>
            <div style={{width: 300}}>
                <Scanner
                    onResult={(result, error) => {
                        console.log(result);
                        if (result && result.startsWith('https://image-uploader-aws.vercel.app')) {
                            window.location.href = result;
                        }
                    }}
                    onError={(error) => console.log(error?.message)}
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