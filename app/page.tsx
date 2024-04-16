'use client'

import React, {useState} from 'react';
import {Dropzone} from "./components/dropzone";
import './globals.css'

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileDrop = (droppedFile: File) => {
        setFile(droppedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!file) {
            alert('Please select a file to upload.')
            return
        }

        setUploading(true)

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/upload-image', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({filename: file.name, contentType: file.type}),
        })

        if (response.ok) {
            const {url, fields} = await response.json()

            const formData = new FormData()
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string)
            })
            formData.append('file', file)

            const uploadResponse = await fetch(url, {
                method: 'POST', body: formData,
            })

            if (uploadResponse.ok) {
                // console.log(fields);
                // const s3Url = `https://${fields.bucket}.s3.ap-east-1.amazonaws.com/${fields.key}`;
                // console.log('Uploaded file URL:', s3Url);
                alert('Upload successful!')
            } else {
                console.error('S3 Upload Error:', uploadResponse)
                alert('Upload failed.')
            }
        } else {
            alert('Failed to get pre-signed URL.')
        }

        setUploading(false)
    }

    return (
        <main>
            <h1>Image Uploader</h1>
            <form onSubmit={handleSubmit}>
                <Dropzone onFileDrop={handleFileDrop}/>
                <button type="submit" disabled={uploading}>
                    {uploading ? <div className="spinner"></div> : 'Upload'}
                </button>
            </form>
        </main>
    );
}