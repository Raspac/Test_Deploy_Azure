import React, { useState } from 'react';
import "../styles/upload.css";
import { useDropzone } from 'react-dropzone';

const FileUploader = (props) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const uploadFile = async (formData) => {
        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            setFilePath(data.file_path); // Stocker le chemin du fichier
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const onDrop = (acceptedFiles) => {
        props.onPredictionDone(false); // to delete previous prediction

        const file = acceptedFiles[0];
        const formData = new FormData(); 
        formData.append('file', file); 

        uploadFile(formData); 
        
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
        props.onPredictionDone(false); // we delete the prediction
    };

    const handleSubmit = async (file_path) => {
        console.log('Image Path:', file_path);
        try {
            const response = await fetch(`http://localhost:8000/predict/${file_path}`, {
                method: 'POST',
            });
    
            const data = await response.json();
    
            if (data.result === 'success') {
                console.log(data);
                props.onPredictionChange(data.prediction);
                props.onPredictionDone(true); // we can display the prediction
            } else {
                console.error('Erreur :', data);
            }
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    return (
        <div>
            <div className="dropzone">
                <div {...getRootProps()} style={{ border: '2px dashed #cccccc', borderRadius: '4px', padding: '20px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <p>Drag an image here...</p>
                    <button type="button" onClick={handleButtonClick} className="button-upload">... or upload it from your computer</button>
                </div>
                {image && (
                    <div>
                        <h4>Uploaded image:</h4>
                        <img src={image} alt="Uploaded" style={{ maxWidth: '40%', marginTop: '20px', marginBottom: '30px' }} />
                        <button className="remove-button" onClick={handleRemoveImage}>X</button>
                    </div>
                )}
                {error && <div className="error-message">{error}</div>}
                {filePath && image && (
                    <div>
                        <button className="button-upload" onClick={() => handleSubmit(filePath)}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { FileUploader };