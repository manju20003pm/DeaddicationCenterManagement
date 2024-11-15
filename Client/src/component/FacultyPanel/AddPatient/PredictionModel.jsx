import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./AddPatient.scss";
import { useNavigate } from "react-router";

function PredictionModels() {
  const navigate = useNavigate();
  const onCLickHandle = () => {
    navigate(`/predictSoberPeriod`);
  };

  const riskLevelHandle = () => {
    navigate(`/predictRiskLevel`);
  };

  const aaoHandle = () => {
    navigate(`/predictAAO`);
  };

  return (
    <div className="prediction-buttons">
      <div class="controls">
        <button onClick={onCLickHandle}>Sober Period Prediction</button>
        <button onClick={aaoHandle}>AAI Prediction</button>
        <button onClick={riskLevelHandle}>Risk Level Prediction</button>
      </div>
    </div>
  );
}

export default PredictionModels;
