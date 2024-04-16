"use client";

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface ImageViewerProps {
    fileURL: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({fileURL}) => {
    return (
        <div className={`dropzone`}>
            <img src={fileURL} alt="Uploaded file" style={{maxWidth: "100%"}}/>
        </div>
    );
};