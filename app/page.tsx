'use client';

import React, {useState} from 'react';
import {Dropzone} from "./components/dropzone";
import './globals.css';
import {toast, ToastContainer} from "react-toastify";
import {QRCodeDisplay} from "./components/qrcode";

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

    const resetForm = () => {
        setFile(null);
        setUploading(false);
        setUploadedFileId(null);
    };

    const printQRCode = () => {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const qrCodeElement = document.querySelector('.qrCodeBox')?.outerHTML;
        if (qrCodeElement) {
            iframe.contentDocument?.write(`
            <html>
                <head>
                    <title>Print QR Code</title>
                </head>
                <body>
                    ${qrCodeElement}
                </body>
            </html>
        `);
            iframe.contentDocument?.close();
            iframe.contentWindow?.print();
        } else {
            toast.error('Failed to print QR code.');
        }
        document.body.removeChild(iframe);
    };

    const handleFileDrop = (droppedFile: File) => {
        setFile(droppedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        setUploading(true);

        const response = await fetch('/api/upload-image', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({filename: file.name, contentType: file.type}),
        });

        if (response.ok) {
            const {url, fields} = await response.json();

            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            formData.append('file', file);

            const uploadResponse = await fetch(url, {
                method: 'POST', body: formData,
            });

            if (uploadResponse.ok) {
                const s3Url = `https://${fields.bucket}.s3.ap-east-1.amazonaws.com/${fields.key}`;
                setUploadedFileId(s3Url);
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = async function () {
                    const width = img.width;
                    const height = img.height;

                    const dbResponse = await fetch('/api/update-db/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            _id: fields.key,
                            filename: file.name,
                            contentType: file.type,
                            s3Url: s3Url,
                            dimension: {
                                height: height,
                                width: width
                            }
                        }),
                    });

                    if (dbResponse.ok) {
                        toast.success('Upload successful!');
                    } else {
                        console.error('DB Error:', dbResponse);
                        toast.error('Failed to add entry to DB.');
                    }
                };
            } else {
                console.error('S3 Error:', uploadResponse);
                toast.error('Upload failed.');
            }
        } else {
            toast.error('Failed to get pre-signed URL.');
        }
        setUploading(false);
    };

    return (
        <main>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
            <h1>Image Uploader</h1>
            <form onSubmit={handleSubmit}>
                {uploadedFileId ? (
                    <QRCodeDisplay fileId={uploadedFileId}/>
                ) : (
                    <Dropzone onFileDrop={handleFileDrop} selectedFile={file} setFileName={setFile}/>
                )}
                <div className="button-container">
                    {uploadedFileId ? (
                        <button type="button" onClick={printQRCode}>
                            Print
                        </button>
                    ) : (
                        <button type="submit" disabled={uploading}>
                            {uploading ? <div className="spinner"></div> : 'Upload'}
                        </button>
                    )}
                    <button type="reset" onClick={resetForm}>
                        Reset
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </main>
    );
}