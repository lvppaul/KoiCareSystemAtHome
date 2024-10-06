import React, { useState, useEffect } from 'react';
import { getPonds } from '../../API/AxiosConfig'; // Adjust the path as necessary
import './SaltCalculator.css'; // Assuming you have a CSS file for styling

const SaltCalculator = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [volume, setVolume] = useState(0);
  const [desiredConcentration, setDesiredConcentration] = useState(0);
  const [waterChange, setWaterChange] = useState(0);
  const [currentConcentration, setCurrentConcentration] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const pondsData = await getPonds();
        setPonds(pondsData);
        if (pondsData.length > 0) {
          setSelectedPond(pondsData[0].pondId);
          setVolume(pondsData[0].volume);
          showResult(pondsData[0].volume, currentConcentration, desiredConcentration, waterChange);
        }
      } catch (error) {
        console.error('Error fetching ponds:', error);
      }
    };

    fetchPonds();
  }, [currentConcentration, desiredConcentration, waterChange]);

  useEffect(() => {
    if (selectedPond !== null) {
      const pond = ponds.find(p => p.pondId === selectedPond);
      setVolume(pond.volume);
      showResult(pond.volume, currentConcentration, desiredConcentration, waterChange);
    }
  }, [selectedPond, ponds, currentConcentration, desiredConcentration, waterChange]);

  const showResult = (volume, currentConcentration, desiredConcentration, waterChange) => {
    if (desiredConcentration < currentConcentration) {
      let tempConcentration = currentConcentration;
      let changes = 0;
      if (waterChange === 0) {
        setResult({ changes: 'N/A' });
        return;
      }
      if (desiredConcentration === 0) {
        setResult({ changes: 'N/A' });
        return;
      }
      while (tempConcentration > desiredConcentration) {
        tempConcentration -= (tempConcentration * waterChange) / 100;
        changes++;
      }
      setResult({ changes });
    } else {
      const concentrationDiff = desiredConcentration - currentConcentration;
      const saltAmount = (volume * concentrationDiff) / 100;
      const saltPerChange = (volume * waterChange * desiredConcentration) / 10000;
      setResult({ total: saltAmount, perChange: saltPerChange });
    }
  };

  return (
    <div className="salt-calculator-container">
      <div className="salt-calculator">
        <h1>Salt Calculator</h1>
        <div className="salt-input-group">
          <label htmlFor="pond">Select Pond:</label>
          <select
            id="pond"
            value={selectedPond}
            onChange={(e) => {
              setSelectedPond(e.target.value);
              const pond = ponds.find(p => p.pondId === e.target.value);
              showResult(pond.volume, currentConcentration, desiredConcentration, waterChange);
            }}
          >
            {ponds.map(pond => (
              <option key={pond.pondId} value={pond.pondId}>
                {pond.name}
              </option>
            ))}
          </select>
        </div>
        <div className="salt-input-group">
          <label>Pond Volume:</label>
          <span>{volume} liters</span>
        </div>
        <div className="salt-input-group">
          <label htmlFor="currentConcentration">Current Salt Concentration (%):</label>
          <input
            type="range"
            id="currentConcentration"
            min="0"
            max="2"
            step="0.01"
            value={currentConcentration}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setCurrentConcentration(value);
              showResult(volume, value, desiredConcentration, waterChange);
            }}
          />
          <span>{currentConcentration} %</span>
        </div>
        <div className="salt-input-group">
          <label htmlFor="desiredConcentration">Desired Salt Concentration (%):</label>
          <input
            type="range"
            id="desiredConcentration"
            min="0"
            max="2"
            step="0.01"
            value={desiredConcentration}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setDesiredConcentration(value);
              showResult(volume, currentConcentration, value, waterChange);
            }}
          />
          <span>{desiredConcentration} %</span>
        </div>
        <div className="salt-input-group">
          <label htmlFor="waterChange">Water Change (%):</label>
          <input
            type="range"
            id="waterChange"
            min="0"
            max="100"
            step="5"
            value={waterChange}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setWaterChange(value);
              showResult(volume, currentConcentration, desiredConcentration, value);
            }}
          />
          <span>{waterChange} % ({(volume * waterChange / 100).toFixed(2)} liters)</span>
        </div>
      </div>
      <div className="right-container">
        <div className="salt-calculator-disclaimer">
          <h3>Disclaimer</h3>
          <p>
            Only add pure salt without iodine to the water!
            Too high of a salt concentration can be damaging to the koi.
            If you are unsure, please talk to a veterinarian.
            For fighting diseases and algae or for taking precautions a concentration of 0.5% is recommended.
          </p>
        </div>
        {result && (
          <div className="salt-calculator-result">
            {result.changes ? (
              <h2>Number of water changes to reach desired concentration: {result.changes}</h2>
            ) : (
              <>
                <h2>Required Salt Amount: {Number.isInteger(result.total) ? result.total : result.total.toFixed(1)} kg</h2>
                <h2>Per water change (refill): {Number.isInteger(result.perChange) ? result.perChange : result.perChange.toFixed(2)} kg</h2>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaltCalculator;
