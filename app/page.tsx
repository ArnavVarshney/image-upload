'use client'

import React, {useState} from 'react'


export default function Page() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState<string>('Drag files here')
    const [dragging, setDragging] = useState(false);

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

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes

            if (droppedFile.size > maxSize) {
                alert('File size exceeds 5MB. Please select a smaller file.');
                return;
            }

            setFile(droppedFile);
            setFileName(droppedFile.name); // set the file name
            e.dataTransfer.clearData();
        }
    };

    return (
        <main>
            <h1>Image Uploader</h1>
            <form onSubmit={handleSubmit}>
                <div className={`dropzone ${dragging ? 'dragging' : ''}`} onDragEnter={handleDragEnter}
                     onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <p>{fileName}</p>
                    <label htmlFor="file" className="file-select-button">
                        Select File
                    </label>
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                                const selectedFile = files[0];
                                const maxSize = 5 * 1024 * 1024; // 5MB in bytes

                                if (selectedFile.size > maxSize) {
                                    alert('File size exceeds 5MB. Please select a smaller file.');
                                    return;
                                }

                                setFile(selectedFile);
                                setFileName(selectedFile.name);
                            }
                        }}
                        accept="image/png"
                        style={{display: 'none'}}
                    />
                </div>
                <button type="submit" disabled={uploading}>
                    Upload
                </button>
            </form>
        </main>
    )
}
