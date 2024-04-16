import React, {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DropzoneProps {
    onFileDrop: (file: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({onFileDrop}) => {
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState<string>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                toast.error('File size exceeds 5MB. Please select a smaller file.');
                return;
            }

            setFileName(droppedFile.name); // set the file name
            setFilePreviewUrl(URL.createObjectURL(droppedFile));
            e.dataTransfer.clearData();
            onFileDrop(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedFile = files[0];
            const maxSize = 5 * 1024 * 1024;

            if (selectedFile.size > maxSize) {
                toast.error('File size exceeds 5MB. Please select a smaller file.');
                return;
            }

            setFileName(selectedFile.name);
            setFilePreviewUrl(URL.createObjectURL(selectedFile));
            onFileDrop(selectedFile);
        }
    };

    const handleDropzoneClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={`dropzone ${dragging ? 'dragging' : ''}`} onClick={handleDropzoneClick}
             onDragEnter={handleDragEnter}
             onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
            {fileName === null ? (
                <>
                    <p>Drag & drop your image here</p>
                    <p>OR</p>
                    <p>Click to browse</p>
                    <input
                        ref={fileInputRef}
                        id="file"
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/png"
                        style={{display: 'none'}}
                    />
                </>
            ) : (
                <>
                    <p>{fileName}</p>
                    <img src={filePreviewUrl} alt="preview" style={{width: '100%', height: 'auto'}}/>
                </>
            )}
        </div>
    );
};