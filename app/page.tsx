"use client";

import React from 'react';
import {useRouter} from 'next/navigation';
import './globals.css';

export default function Page() {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <main>
            <h1>Image Uploader</h1>
            <form>
                <div className='button-container' style={{width: 300}}>
                    <label className="button-style" onClick={() => handleNavigation('/uploader')}>
                        Uploader
                    </label>
                    <label className="button-style" onClick={() => handleNavigation('/viewer')}>
                        Viewer
                    </label>
                </div>
            </form>
        </main>
    );
}