import React, { useState } from 'react';
import "../styles/upload.css";
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const uploadFile = async (formData) => {
        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData(); // hop
        formData.append('file', file); // hop

        uploadFile(formData); // hop
        
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result);
                setError(null); 
            };

            reader.readAsDataURL(file);
        } else {
            setError("Image format not accepted. Please only use a PNG or JPEG");
            setImage(null); 
        }
    };


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
        onDrop,
        noClick: true,
    });

    const handleButtonClick = () => {
        document.querySelector('input').click();
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleSubmit = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file); // Utilisez le nom approprié ('image' ou celui attendu par votre API)
    
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log(data);
    
            if (data.result === 'success') {
                console.log(data.message);
            } else {
                console.error('Erreur :', data.message);
            }
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    return (
        <div className="dropzone">
            <div {...getRootProps()} style={{ border: '2px dashed #cccccc', borderRadius: '4px', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                <p>Drag an image here...</p>
                <button type="button" onClick={handleButtonClick} className="button-upload">... or upload it from your computer</button>
            </div>
            {image && (
                <div>
                    <h4>Uploaded image:</h4>
                    <img src={image} alt="Uploaded" style={{ maxWidth: '70%', marginTop: '20px' }} />
                    <button className="remove-button" onClick={handleRemoveImage}>X</button>
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            {image && (
                <div>
                    <button className="button-upload" onClick={() => handleSubmit(image)}>Submit</button>
                </div>
            )}
        </div>
    );
};

export { FileUploader };