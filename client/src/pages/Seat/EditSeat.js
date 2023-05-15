import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [seatNO, setSeatNO] = useState(props.seatNO);
  const [theatreID, setTheatreID] = useState(props.theatreID);
  const [type, setType] = useState(props.type);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editSD = (id) => {
    Axios.put(`http://localhost:3001/edit_sd`, {
      seat_id: id,
      seat_no: seatNO,
      theatre_id: theatreID,
      seat_type: type,
    });
    console.log("GOGOGOG");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
            <label htmlFor="seat_no" className="form-label">
              Seat No.
            </label>
            <input
              type="text"
              className="form-control"
              value={seatNO}
              onChange={(event) => {
                setSeatNO(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="theatre_id" className="form-label">
              Theatre ID
            </label>
            <input
              type="number"
              className="form-control"
              value={theatreID}
              onChange={(event) => {
                setTheatreID(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="seat_type" className="form-label">
              Seat Type
            </label>
            <input
              type="text"
              className="form-control"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
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
              editSD(props.id);
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
