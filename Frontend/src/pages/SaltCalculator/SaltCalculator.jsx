import React, { useState, useEffect } from "react";
import { getPondByUserId } from "../../Config/PondApi";
import { useAuth } from "../Login/AuthProvider";
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, FormText } from "react-bootstrap";

const SaltCalculator = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [volume, setVolume] = useState(0);
  const [desiredConcentration, setDesiredConcentration] = useState(0);
  const [waterChange, setWaterChange] = useState(0);
  const [currentConcentration, setCurrentConcentration] = useState(0);
  const [result, setResult] = useState(null);

  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const pondsData = await getPondByUserId(userId);
        setPonds(pondsData);
        console.log(pondsData);
        if (pondsData.length > 0) {
          setSelectedPond(pondsData[0].pondId);
          setVolume(pondsData[0].volume);
          showResult(pondsData[0].volume, currentConcentration, desiredConcentration, waterChange);
        }
      } catch (error) {
        console.error("Error fetching ponds:", error);
      }
    };

    fetchPonds();
  }, [userId, currentConcentration, desiredConcentration, waterChange]);

  useEffect(() => {
    if (selectedPond !== null) {
      const pond = ponds.find((p) => p.pondId === selectedPond);
      console.log(ponds);
      console.log("selectedPond", selectedPond);
      if (pond) {
        setVolume(pond.volume);
        showResult(pond.volume, currentConcentration, desiredConcentration, waterChange);
      }
    }
  }, [selectedPond, ponds, currentConcentration, desiredConcentration, waterChange]);

  const showResult = (volume, currentConcentration, desiredConcentration, waterChange) => {
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
      const saltPerChange = (volume * waterChange * desiredConcentration) / 10000;
      setResult({ total: saltAmount, perChange: saltPerChange });
    }
  };

  return (
    <Container className="p-4">
      <Row className="d-flex justify-content-center">
        <Col
          style={{
            background: "#FFFFFF",
            borderRadius: "10px",
            maxWidth: "600px",
            minHeight: "auto",
            border: "1px solid lightgray",
            padding: "24px",
          }}
          md={7}
        >
          <h1 className="fw-bold mb-3">Salt Calculator</h1>
          <Form className="d-flex flex-column">
            <FormGroup className="mb-3">
              <Row>
                <Col md={4}>
                  <FormLabel style={{ fontWeight: "bold", color: "#555" }} htmlFor="pond">
                    Select Pond:
                  </FormLabel>
                </Col>
                <Col md={8} className="d-flex justify-content-end">
                  <FormControl
                    as="select"
                    id="pond"
                    value={selectedPond ? selectedPond : ""}
                    onChange={(e) => {
                      setSelectedPond(parseInt(e.target.value));
                      const pond = ponds.find((p) => p.pondId === parseInt(e.target.value));
                      if (pond) {
                        showResult(pond.volume, currentConcentration, desiredConcentration, waterChange);
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select a pond
                    </option>
                    {ponds.map((pond) => (
                      <option key={pond.pondId} value={pond.pondId}>
                        {pond.name}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup className="mb-3">
              <Row>
                <Col md={4}>
                  <FormLabel style={{ fontWeight: "bold", color: "#555" }}>Pond Volume:</FormLabel>
                </Col>
                <Col md={8} className="d-flex justify-content-end">
                  <FormText style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>{volume} liters</FormText>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup className="d-flex flex-column justify-content-between mb-3">
              <Row>
                <Col md={8} className="d-flex justify-content-start">
                  <FormLabel style={{ fontWeight: "bold", color: "#555" }} htmlFor="currentConcentration">
                    Current Salt Concentration (%):
                  </FormLabel>
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                  <FormText style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>
                    {currentConcentration} %
                  </FormText>
                </Col>
              </Row>

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
            <FormGroup className="d-flex flex-column justify-content-between mb-3">
              <Row>
                <Col md={8} className="d-flex justify-content-start">
                  <FormLabel style={{ fontWeight: "bold", color: "#555" }} htmlFor="desiredConcentration">
                    Desired Salt Concentration (%):
                  </FormLabel>
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                  <FormText style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>
                    {desiredConcentration} %
                  </FormText>
                </Col>
              </Row>

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
            <FormGroup className="d-flex flex-column justify-content-between mb-3">
              <Row>
                <Col md={5} className="d-flex justify-content-start">
                  <FormLabel style={{ fontWeight: "bold", color: "#555" }} htmlFor="waterChange">
                    Water Change (%):
                  </FormLabel>
                </Col>
                <Col md={7} className="d-flex justify-content-end">
                  <FormText style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>
                    {waterChange} % ({((volume * waterChange) / 100).toFixed(2)} liters)
                  </FormText>
                </Col>
              </Row>
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
                  showResult(volume, currentConcentration, desiredConcentration, value);
                }}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col md={5} style={{minWidth: '600px'}} className="mt-3">
          <Container
            style={{ background: "#FFFFFF", border: "1px solid lightgray", borderRadius: "10px" }}
            className="p-3 mb-3"
          >
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Disclaimer</h3>
            <p style={{ textAlign: "center", fontWeight: "bold", color: "#555570" }}>
              Only add pure salt without iodine to the water! Too high of a salt concentration can be damaging to the
              koi. If you are unsure, please talk to a veterinarian. For fighting diseases and algae or for taking
              precautions a concentration of 0.5% is recommended.
            </p>
          </Container>
          {result && (
            <Container
              style={{ background: "#FFFFFF", border: "1px solid lightgray", borderRadius: "10px", textAlign: "center" }}
              className="p-5"
            >
              {result.changes ? (
                <h3 style={{ fontWeight: "bold" }}>
                  Number of water changes to reach desired concentration: {result.changes}
                </h3>
              ) : (
                <>
                  <h3 style={{ fontWeight: "bold" }}>
                    Required Salt Amount: {Number.isInteger(result.total) ? result.total : result.total.toFixed(1)} kg
                  </h3>
                  <h3 style={{ fontWeight: "bold" }}>
                    Per water change (refill):{" "}
                    {Number.isInteger(result.perChange) ? result.perChange : result.perChange.toFixed(2)} kg
                  </h3>
                </>
              )}
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SaltCalculator;
