import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [no, setNo] = useState(props.theatre_no);
  const [branchID, setBranchID] = useState(props.branch_id);
  const [capacity, setCapacity] = useState(props.capacity);
  const [type, setType] = useState(props.type);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editTheatre = (id) => {
    Axios.put("http://localhost:3001/edit_theatre", {
      theatre_id: id,
      theatre_no: no,
      branch_id: branchID,
      capacity: capacity,
      theatre_type: type,
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
            <label htmlFor="theatre_no" className="form-label">
              Theatre No.
            </label>
            <input
              type="number"
              className="form-control"
              value={no}
              onChange={(event) => {
                setNo(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="branch_id" className="form-label">
              Branch ID
            </label>
            <input
              type="number"
              className="form-control"
              value={branchID}
              onChange={(event) => {
                setBranchID(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              value={capacity}
              onChange={(event) => {
                setCapacity(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Theatre Type
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
              editTheatre(props.id);
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
