import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [movID, setMovID] = useState(props.movID);
  const [licS, setLicS] = useState(props.licS);
  const [licE, setLicE] = useState(props.licE);
  const [cost, setCost] = useState(props.cost);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editLicense = async (id) => {
    await Axios.put("http://localhost:3001/edit_movielicense", {
      movie_id: movID,
      license_start: licS,
      license_end: licE,
      movie_cost: cost
    });
  };

  return (
    <>
      <Button variant="primary btn-sm" onClick={handleShow}>
        Update
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="movie_id" className="form-label">
              Movie ID
            </label>
            <input
              type="number"
              className="form-control"
              value={movID}
              onChange={(event) => {
                setMovID(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="license_start" className="form-label">
              License Start
            </label>
            <input
              type="date"
              className="form-control"
              value={licS}
              onChange={(event) => {
                setLicS(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="license_end" className="form-label">
              License End
            </label>
            <input
              type="date"
              className="form-control"
              value={licE}
              onChange={(event) => {
                setLicE(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="movie_cost" className="form-label">
              Movie Cost
            </label>
            <input
              type="number"
              className="form-control"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editLicense(props.id);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateButton;
