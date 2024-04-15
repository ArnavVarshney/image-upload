'use client'

import React, {useState} from 'react'
import Container from '@mui/material/Container'


export default function Page() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

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
            <Container maxWidth="sm">
                <h1>Image Uploader</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                                const maxSize = 5 * 1024 * 1024;
                                if (files[0].size > maxSize) {
                                    alert('File is too large. Max file size is 5MB.')
                                    return
                                }
                                setFile(files[0])
                            }
                        }}
                        accept="image/png"
                    />
                    <button type="submit" disabled={uploading}>
                        Upload
                    </button>
                </form>
            </Container>
        </main>
    )
}
