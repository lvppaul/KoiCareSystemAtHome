import React, { useState, useEffect } from "react";
import { getPondByUserId, getKoiInPond } from "../../Config/PondApi";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./FoodCalculator.css";
import { useAuth } from "../Login/AuthProvider";

const FoodCalculator = () => {
  const [ponds, setPonds] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState(null);
  const [growthSpeed, setGrowthSpeed] = useState("medium");
  const [totalWeight, setTotalWeight] = useState(0);
  const [foodRequirement, setFoodRequirement] = useState(0);
  const [selectedPond, setSelectedPond] = useState(null);
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    const fetchPondsAndKois = async () => {
      try {
        const pondsData = await getPondByUserId(userId);
        setPonds(pondsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPondsAndKois();
  }, [userId]);

  const handlePondChange = async (event) => {
    const pondId = event.target.value;
    setSelectedPond(pondId);
    if (!pondId) return;
    const pondKois = await getKoiInPond(pondId);
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
    if (growthSpeed === "low") multiplier = 1.7;
    else if (growthSpeed === "high") multiplier = 3;

    const food = totalWeight * multiplier * (temperature / 10000);
    setFoodRequirement(food);
  };

  useEffect(() => {
    if (totalWeight && temperature) {
      calculateFoodRequirement();
    }
  }, [totalWeight, temperature, growthSpeed]);

  return (
    <Container className="food-calculator-container">
      <Row>
        <Col md={8}>
          <Container className="food-calculator">
            <h1 style={{ fontWeight: "bold" }}>Koi Food Calculator</h1>
            <Form>
              <Form.Group className="mb-3" controlId="pondSelect">
                <Form.Label>Select Pond</Form.Label>
                <Form.Control as="select" onChange={handlePondChange} value={selectedPond ? selectedPond : ""}>
                  <option value="" disabled>
                    Select a pond
                  </option>
                  {ponds.map((pond) => (
                    <option key={pond.pondId} value={pond.pondId}>
                      {pond.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="temperatureSelect">
                <Form.Label>Temperature (°C)</Form.Label>
                <div className="temperature-buttons">
                  {["6-8", "9-12", "13-16", "17-20", "21-28"].map((range, index) => (
                    <Button
                      key={range}
                      variant={selectedTemp === index ? "primary" : "secondary"}
                      onClick={() => handleTemperatureChange(index * 4 + 7, index)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="growthSpeedSelect">
                <Form.Label>Growth Speed</Form.Label>
                <Form.Control as="select" value={growthSpeed} onChange={handleGrowthSpeedChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <div className="food-result">
              <h2>Total Weight of Kois: {totalWeight} g</h2>
              <h2>Food Requirement: {foodRequirement.toFixed(0)} g/day</h2>
            </div>
          </Container>
        </Col>
        <Col md={4}>
          <Container className="feeding-info">
            <h3 style={{ fontWeight: "bold" }}>Feeding Information</h3>
            <p style={{ textAlign: "center", fontWeight: "bold", color: "#555570" }}>
              The recommended amount of food should be split evenly into 3-5 feedings per day. This way the koi will
              ingest the food better.
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodCalculator;
