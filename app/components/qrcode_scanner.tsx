'use client';

import React from 'react';
import {Scanner} from "@yudiel/react-qr-scanner";

export const QRCodeScanner = () => {
        return (
            <Scanner
                onResult={(result, error) => {
                    console.log(result);
                    if (result && result.startsWith('https://image-uploader-aws.vercel.app')) {
                        window.location.href = result;
                    }
                }}
                onError={(error) => console.log(error?.message)}
            />
        );
    }
;