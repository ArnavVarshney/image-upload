'use client';

import React, {useEffect, useState} from 'react';
import '../../globals.css';

import {ImageViewer} from "../../components/image_viewer";
import {notFound} from "next/navigation";

export default function Viewer({params}) {
    const decodedURI = decodeURIComponent(params.viewer);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/update-db?imageID=${decodedURI}`);
                const data = await response.json();
                setImageData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [decodedURI]);

    if (imageData === null) {
        return <div>Loading...</div>;
    } else if (imageData.message === 'NA') {
        return notFound();
    }

    const main = <>
        <main>
            <h1>Image Viewer</h1>
            <form>
                <ImageViewer fileURL={imageData.s3Url}/>
                <textarea
                    className="description"
                    value={imageData.description}
                    disabled={true}
                />
            </form>
        </main>
    </>;
    return main;
}