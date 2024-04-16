"use client";

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface ImageViewerProps {
    fileURL: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({fileURL}) => {
    return (
        <div className={`dropzone`}>
            <img src={fileURL} alt="Uploaded file"
                 style={{width: 'auto', height: 'auto', maxWidth: '90%', maxHeight: '90%'}}/>
        </div>
    );
};