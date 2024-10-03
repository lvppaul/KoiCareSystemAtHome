import React, { useState } from "react";
import "./SaltCalculator.css";

function SaltCalculator() {
  const [volume, setVolume] = useState("");
  const [concentration, setConcentration] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const volumeNum = parseFloat(volume);
    const concentrationNum = parseFloat(concentration);
    if (!isNaN(volumeNum) && !isNaN(concentrationNum)) {
      const saltAmount = (volumeNum * concentrationNum) / 1000;
      setResult(saltAmount.toFixed(2));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="salt-calculator">
      <h1>Koi Pond Salt Calculator</h1>
      <div className="input-group">
        <label htmlFor="volume">Pond Volume (liters):</label>
        <input
          type="number"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="concentration">Desired Salt Concentration (ppm):</label>
        <input
          type="number"
          id="concentration"
          value={concentration}
          onChange={(e) => setConcentration(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div className="result">
          <h2>Required Salt Amount: {result} kg</h2>
        </div>
      )}
    </div>
  );
}

export default SaltCalculator;
