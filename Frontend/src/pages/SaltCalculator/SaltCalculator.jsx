import React, { useState, useEffect } from "react";
import { getPondByUserId } from "../../Config/PondApi";
import { useAuth } from "../Login/AuthProvider";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Button,
} from "react-bootstrap";
import "./SaltCalculator.css";

const SaltCalculator = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [volume, setVolume] = useState(0);
  const [desiredConcentration, setDesiredConcentration] = useState(0);
  const [waterChange, setWaterChange] = useState(0);
  const [currentConcentration, setCurrentConcentration] = useState(0);
  const [result, setResult] = useState(null);

  const { user } = useAuth();
  const userId = user.userId;

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const pondsData = await getPondByUserId(userId);
        setPonds(pondsData);
        console.log(pondsData);
        if (pondsData.length > 0) {
          setSelectedPond(pondsData[0].pondId);
          setVolume(pondsData[0].volume);
          showResult(
            pondsData[0].volume,
            currentConcentration,
            desiredConcentration,
            waterChange
          );
        }
      } catch (error) {
        console.error("Error fetching ponds:", error);
      }
    };

    fetchPonds();
  }, [currentConcentration, desiredConcentration, waterChange]);

  useEffect(() => {
    if (selectedPond !== null) {
      const pond = ponds.find((p) => p.pondId === selectedPond);
      console.log(ponds);
      console.log('selectedPond', selectedPond);
      if (pond) {
        setVolume(pond.volume);
        showResult(
          pond.volume,
          currentConcentration,
          desiredConcentration,
          waterChange
        );
      }
    }
  }, [
    selectedPond,
    ponds,
    currentConcentration,
    desiredConcentration,
    waterChange,
  ]);

  const showResult = (
    volume,
    currentConcentration,
    desiredConcentration,
    waterChange
  ) => {
    if (desiredConcentration < currentConcentration) {
      let tempConcentration = currentConcentration;
      let changes = 0;
      if (waterChange === 0) {
        setResult({ changes: "N/A" });
        return;
      }
      if (desiredConcentration === 0) {
        setResult({ changes: "N/A" });
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
      const saltPerChange =
        (volume * waterChange * desiredConcentration) / 10000;
      setResult({ total: saltAmount, perChange: saltPerChange });
    }
  };

  return (
    <Container className="salt-calculator-container">
      <Row>
        <Col md={6} className="salt-calculator">
          <h1>Salt Calculator</h1>
          <Form>
            <FormGroup className="salt-input-group">
              <FormLabel htmlFor="pond">Select Pond:</FormLabel>
              <FormControl
                as="select"
                id="pond"
                value={selectedPond}
                onChange={(e) => {
                  setSelectedPond(parseInt(e.target.value));
                  const pond = ponds.find((p) => p.pondId === parseInt(e.target.value));
                  if (pond) {
                    showResult(
                      pond.volume,
                      currentConcentration,
                      desiredConcentration,
                      waterChange
                    );
                  }
                }}
              >
                {ponds.map((pond) => (
                  <option key={pond.pondId} value={pond.pondId}>
                    {pond.name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup className="salt-input-group">
              <FormLabel>Pond Volume:</FormLabel>
              <FormText>{volume} liters</FormText>
            </FormGroup>
            <FormGroup className="salt-input-group">
              <div className="label-and-value">
                <FormLabel htmlFor="currentConcentration">
                  Current Salt Concentration (%):
                </FormLabel>
                <FormText>{currentConcentration} %</FormText>
              </div>
              <FormControl
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
            </FormGroup>
            <FormGroup className="salt-input-group">
              <div className="label-and-value">
                <FormLabel htmlFor="desiredConcentration">
                  Desired Salt Concentration (%):
                </FormLabel>
                <FormText>{desiredConcentration} %</FormText>
              </div>
              <FormControl
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
            </FormGroup>
            <FormGroup className="salt-input-group">
              <div className="label-and-value">
                <FormLabel htmlFor="waterChange">Water Change (%):</FormLabel>
                <FormText>
                  {waterChange} % ({((volume * waterChange) / 100).toFixed(2)}{" "}
                  liters)
                </FormText>
              </div>
              <FormControl
                type="range"
                id="waterChange"
                min="0"
                max="100"
                step="5"
                value={waterChange}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setWaterChange(value);
                  showResult(
                    volume,
                    currentConcentration,
                    desiredConcentration,
                    value
                  );
                }}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col md={6} className="right-container">
          <div className="salt-calculator-disclaimer">
            <h3>Disclaimer</h3>
            <p>
              Only add pure salt without iodine to the water! Too high of a salt
              concentration can be damaging to the koi. If you are unsure,
              please talk to a veterinarian. For fighting diseases and algae or
              for taking precautions a concentration of 0.5% is recommended.
            </p>
          </div>
          {result && (
            <div className="salt-calculator-result">
              {result.changes ? (
                <h2>
                  Number of water changes to reach desired concentration:{" "}
                  {result.changes}
                </h2>
              ) : (
                <>
                  <h2>
                    Required Salt Amount:{" "}
                    {Number.isInteger(result.total)
                      ? result.total
                      : result.total.toFixed(1)}{" "}
                    kg
                  </h2>
                  <h2>
                    Per water change (refill):{" "}
                    {Number.isInteger(result.perChange)
                      ? result.perChange
                      : result.perChange.toFixed(2)}{" "}
                    kg
                  </h2>
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SaltCalculator;
