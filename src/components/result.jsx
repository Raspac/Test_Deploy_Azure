import React, { useState } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar"
import { FileUploader } from "./upload";
import "../styles/result.css";

const Result = () => {
    const [prediction, setPrediction] = useState(null);
    const [predictionDone, setPredictionDone] = useState(false);

    const handlePredictionChange = (prediction) => {
        setPrediction(prediction);
        console.log(prediction);
    };

    const handlePredictionDone = (done) => {
        setPredictionDone(done);
    };

    return (
        <div style={{display: 'grid', gridTemplateRows: 'auto auto'}}>
            <Navbar />
            <div className="result-container">
                <FileUploader onPredictionChange={handlePredictionChange} onPredictionDone={handlePredictionDone} />
                <h2>Result {prediction !== null && predictionDone ? prediction : "No prediction"}</h2>
                {prediction !== null && predictionDone && (
                    <div className="prediction">
                        <p>Prediction: {prediction === 1 ? "No Cancer" : "Cancer"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Result };