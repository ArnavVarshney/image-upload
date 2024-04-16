'use client';

import React from 'react';
import {QrReader} from "react-qr-reader";

export const QRCodeScanner: React.FC = () => {
    // @ts-ignore
    return (
        <QrReader
            onResult={(result, error) => {
                if (result && result["text"].startsWith('https://image-uploader-aws.vercel.app')) {
                    window.location.href = result["text"];
                }
            }}
        />
    );
};