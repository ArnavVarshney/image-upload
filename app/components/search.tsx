'use client';

import React, {useState} from "react";

export default function SearchImages() {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState([]);

    const handleSearch = async () => {
        const results = await fetch(`/api/search?description=${searchTerm}`, {
            method: 'POST'
        });
        const data = await results.json();
        setImages(data);
    }

    const handleReset = () => {
        setSearchTerm("");
        setImages([]);
    };

    return (
        <div style={{
            width: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <div style={{width: "100%", marginBottom: "20px"}}>
                <input
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for images by description..."
                />
                <div className='button-container'>
                    <button onClick={handleSearch}>
                        Search
                    </button>
                    <button onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
            <div style={{width: "100%"}}>
                {images.map((image) => (
                    <div key={image._id} style={{marginBottom: "20px"}}>
                        <img src={image.s3Url} alt={image.description} style={{width: "100%", borderRadius: "5px"}}/>
                        <p style={{marginTop: "10px"}}>{image.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}