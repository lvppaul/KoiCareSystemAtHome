import React, { useState } from "react";
import "./FoodCalculator.css";

function FoodCalculator() {
  const [weight, setWeight] = useState("");
  const [feedingRate, setFeedingRate] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const feedingRateNum = parseFloat(feedingRate);
    if (!isNaN(weightNum) && !isNaN(feedingRateNum)) {
      const foodAmount = (weightNum * feedingRateNum) / 100;
      setResult(foodAmount.toFixed(2));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="food-calculator">
      <h1>Koi Food Calculator</h1>
      <div className="input-group">
        <label htmlFor="weight">Fish Weight (grams):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="feedingRate">Feeding Rate (% of body weight):</label>
        <input
          type="number"
          id="feedingRate"
          value={feedingRate}
          onChange={(e) => setFeedingRate(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div className="result">
          <h2>Required Food Amount: {result} grams</h2>
        </div>
      )}
    </div>
  );
}

export default FoodCalculator;
