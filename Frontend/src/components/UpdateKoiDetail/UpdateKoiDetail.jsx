import { useState, useContext } from "react";
import { Button, Modal, Col, Row, Form } from "react-bootstrap";
import { BiImport, BiInfoCircle } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import { storage } from "../../Config/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../../pages/Login/AuthProvider";
import { updateKoi } from "../../Config/KoiApi";
import { ToastContext } from "../../App";

const UpdateKoiDetail = ({ show, setShow, koidetail, setKoiDetail }) => {
  const { setToastMessage } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [koi, setKoi] = useState(koidetail);
  const [file, setFile] = useState(null);
  const [storageRef, setStorageRef] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleClose = () => setShow(false);
  const userId = useAuth().user.userId;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKoi({ ...koi, [name]: value });
  };

  // handle preview image
  const handleUploadImg = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Check if the file is an image
      setPreviewImage(URL.createObjectURL(file));
      const storageRef = ref(storage, `/pond/pondThumbnails/${userId}/${file.name + Date.now()}`);
      try {
        setFile(file);
        setStorageRef(storageRef);
        setKoi({ ...koi, thumbnail: storageRef.fullPath });
      } catch (error) {
        console.error("Error setting image:", error);
      }
    } else {
      console.log("Invalid file type");
    }
  };

  const handleSubmitKoiUpdate = async (event) => {
    event.preventDefault();
    const previousThumbnail = koi.thumbnail;
    setLoading(true);
    try {
      if (file) {
        await uploadBytes(storageRef, file);
        const newThumbnail = await getDownloadURL(storageRef);
        await updateKoi(koidetail);
        setKoiDetail({ ...koi, thumbnail: newThumbnail });

        if (previousThumbnail) {
          const imageRef = ref(storage, previousThumbnail);
          await deleteObject(imageRef);
          console.log("Image deleted successfully");
        }
      } else {
        await updateKoi(koi);
        setKoiDetail({ ...koi, thumbnail: previousThumbnail });
      }
      setFile(null);
      setPreviewImage(null);
      setLoading(false);
      handleClose();
      setToastMessage("Koi updated successful!");
    } catch (error) {
      console.error("Error updating pond:", error);
      setLoading(false);
      setToastMessage("Koi updated failed!");
    }
  };
  return (
    <>
      <Button
        onClick={setShow}
        style={{
          width: "180px",
          height: "70px",
          fontWeight: "bold",
          fontSize: "18px",
          borderRadius: "15px",
          backgroundColor: "#FF8433",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF6204")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF8433")}
      >
        <BiInfoCircle size={35} /> Update Koi
      </Button>

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
                <Col
                  className="image-fish"
                  style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
                >
                  <div>
                    <Row className="file-input-container">
                      <Form.Control type="file" id="file-input" hidden onChange={handleUploadImg} />
                      <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                        Import Image <BiImport size={30} />
                      </label>
                    </Row>
                    <Row className="img-preview">
                      {previewImage ? (
                        <img src={previewImage} alt={previewImage} />
                      ) : (
                        <span style={{ color: "#eeeeee" }}>Preview image</span>
                      )}
                    </Row>
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish name"
                        name="name"
                        value={koi.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridAge">
                      <Form.Label>Age (years):</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish age"
                        name="age"
                        value={koi.age}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridSex">
                      <Form.Label>Sex:</Form.Label>
                      <Form.Control as="select" name="sex" value={koi.sex} onChange={handleInputChange}>
                        <option value={koi.sex}>{koi.sex}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                      </Form.Control>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridVariety">
                      <Form.Label>Variety:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish variety"
                        name="variety"
                        value={koi.variety}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridPhysique">
                      <Form.Label>Physique:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish physique"
                        name="physique"
                        value={koi.physique}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridLength">
                      <Form.Label>Length (cm):</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish length"
                        name="length"
                        value={koi.length}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridWeight">
                      <Form.Label>Weight (g):</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish weight"
                        name="weight"
                        value={koi.weight}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridColor">
                      <Form.Label>Color:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish color"
                        name="color"
                        value={koi.color}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridOrigin">
                      <Form.Label>Origin:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter fish origin"
                        name="origin"
                        value={koi.origin}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridNote">
                      <Form.Label>Note:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter note"
                        name="note"
                        value={koi.note}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formGridStatus">
                      <Form.Label>Status:</Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="Active"
                        name="status"
                        checked={koi.status}
                        onChange={(event) => setKoi({ ...koi, status: event.target.checked })}
                      />
                    </Form.Group>
                  </Row>
                </Col>
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

export default UpdateKoiDetail;
