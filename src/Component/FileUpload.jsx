
/* global FormData */
import React, { useState } from 'react';
import LogDisplay from '../Component/Show'
import axios from 'axios';
function FileUpload() {
    const [file, setFile] = useState(null);
    const [flag, setFlag] = useState(false);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
            setFlag(!flag)

        } catch (error) {
            alert('Error uploading file:', error);
        }
    };
    return (
        <div>
            <h1>ברוכים הבאים לכלי המטורף שלנו</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
            {flag && <LogDisplay></LogDisplay>}
        </div>
    );
}
export default FileUpload;




















