import { useState, useContext, useEffect } from "react";
import { Button, Modal, Col, Row, Form } from "react-bootstrap";
import { BiImport, BiInfoCircle } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import { storage } from "../../Config/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../../pages/Login/AuthProvider";
import { changePondKoi, updateKoi } from "../../Config/KoiApi";
import { ToastContext } from "../../App";
import { getPondByUserId } from "../../Config/PondApi";

const ChangePondKoi = ({ show, setShow, koidetail, setKoiDetail }) => {
  const { setToastMessage } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [koi, setKoi] = useState(koidetail);
  const [pondList, setPondList] = useState([]);
  const handleClose = () => setShow(false);
  const userId = useAuth().user.userId;
  const pondId = koi.pondId;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKoi({ ...koi, [name]: value });
  };

  //handle pond list
    const handlePondList = async () => {
        try {
            const pondlistByUserId = await getPondByUserId(userId);
            setPondList(pondlistByUserId);
        } catch (error) {
        console.error('Error fetching pond list:', error);
        }
    };
    useEffect(() => {
        handlePondList();
    }, []);

  const handleSubmitKoiUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
        await changePondKoi(koi.koiId, pondId);
        setLoading(false);
        handleClose();
        setToastMessage("Pond change successful!");
    } catch (error) {
      console.error("Error updating pond:", error);
      setLoading(false);
      setToastMessage("Koi updated failed!");
    }
  };
  return (
    <>

      <Modal show={show} onHide={setShow} size="xl" className="modal-addblog">
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h1>Adding Fish</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form onSubmit={handleSubmitKoiUpdate}>
              <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formChoosePond">
                        <Form.Label>Choose Pond</Form.Label>
                        <Form.Control
                            as="select"
                            name="pondId"
                            value={koi.pondId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Choose Pond</option>
                            {pondList.map((pond) => (
                                <option key={pond.pondId} value={pond.pondId}>
                                    {pond.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
              </Row>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{ backgroundColor: "#00C92C" }}>
                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePondKoi;
