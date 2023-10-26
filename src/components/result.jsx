import React, { useState } from "react";
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
                <div className="prediction-container">
                    <div className="prediction-box">
                        <h2>{prediction !== null && predictionDone ? (prediction >= 0 && prediction <= 0.35 ? "Cancer detected" : "No cancer detected") : 'No prediction available'}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Result };