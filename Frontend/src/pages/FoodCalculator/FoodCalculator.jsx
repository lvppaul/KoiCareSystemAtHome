import React, { useState, useEffect } from 'react';
import { getPonds, getKois } from '../../Config/AxiosConfig';
import './FoodCalculator.css';

const FoodCalculator = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [kois, setKois] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [selectedTemp, setSelectedTemp] = useState(null);
  const [growthSpeed, setGrowthSpeed] = useState('medium');
  const [totalWeight, setTotalWeight] = useState(0);
  const [foodRequirement, setFoodRequirement] = useState(0);

  useEffect(() => {
    const fetchPondsAndKois = async () => {
      try {
        const pondsData = await getPonds();
        setPonds(pondsData);
        const koisData = await getKois();
        setKois(koisData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPondsAndKois();
  }, []);

  const handlePondChange = (event) => {
    const pondId = event.target.value;
    setSelectedPond(pondId);
    const pondKois = kois.filter(koi => koi.pondId === pondId);
    const weight = pondKois.reduce((total, koi) => total + koi.weight, 0);
    setTotalWeight(weight);
  };

  const handleTemperatureChange = (temp, index) => {
    setTemperature(temp);
    setSelectedTemp(index);
  };

  const handleGrowthSpeedChange = (event) => {
    setGrowthSpeed(event.target.value);
  };

  const calculateFoodRequirement = () => {
    let multiplier = 2.5;
    if (growthSpeed === 'low') multiplier = 1.7;
    else if (growthSpeed === 'high') multiplier = 3;

    const food = totalWeight * multiplier * (temperature / 10000);
    setFoodRequirement(food);
  };

  useEffect(() => {
    if (totalWeight && temperature) {
      calculateFoodRequirement();
    }
  }, [totalWeight, temperature, growthSpeed]);

  return (
    <div className="food-calculator-container">
      <div className="food-calculator">
        <h1>Koi Food Calculator</h1>
        <div>
          <label>Select Pond: </label>
          <select onChange={handlePondChange}>
            <option value="">Select a pond</option>
            {ponds.map(pond => (
              <option key={pond.pondId} value={pond.pondId}>{pond.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Temperature (°C): </label>
          <div className="temperature-buttons">
            {['6-8', '9-12', '13-16', '17-20', '21-28'].map((range, index) => (
              <button
                key={range}
                className={selectedTemp === index ? 'selected' : ''}
                onClick={() => handleTemperatureChange((index * 4) + 7, index)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label>Growth Speed: </label>
          <select value={growthSpeed} onChange={handleGrowthSpeedChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="food-result">
          <h2>Total Weight of Kois: {totalWeight} g</h2>
          <h2>Food Requirement: {foodRequirement.toFixed(0)} g/day</h2>
        </div>
      </div>
      <div className="feeding-info">
        <h2>Feeding Information</h2>
        <p>The recommended amount of food should be split evenly into 3-5 feedings per day.
          This way the koi will ingest the food better.</p>
      </div>
    </div>
  );
};

export default FoodCalculator;