import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DropzoneProps {
    onFileDrop: (file: File) => void;
    selectedFile: File;
    setFileName: Dispatch<SetStateAction<File>>;
}

export const Dropzone: React.FC<DropzoneProps> = ({onFileDrop, setFileName, selectedFile}) => {
    const [dragging, setDragging] = useState(false);
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

            if (droppedFile.type !== 'image/png') {
                toast.error('Invalid file type. Please select a .png file.');
                return;
            }

            setFileName(droppedFile);
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

            if (selectedFile.type !== 'image/png') {
                toast.error('Invalid file type. Please select a .png file.');
                return;
            }

            setFileName(selectedFile);
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
            {selectedFile === null ? (
                <>
                    <p>Drag & drop your image here</p>
                    <p>OR</p>
                    <p>Click to browse</p>
                    <p>Accepted file types: .png <br/> Max. Size: 5MB</p>
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
                    <p>{selectedFile.name}</p>
                    <img src={filePreviewUrl} alt="preview" style={{width: '100%', height: 'auto'}}/>
                </>
            )}
        </div>
    );
};