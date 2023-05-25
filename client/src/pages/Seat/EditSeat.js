import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [seatNO, setSeatNO] = useState(props.seatNO);
  const [theatreID, setTheatreID] = useState(props.theatreID);
  const [type, setType] = useState(props.type);
  const [price, setPrice] = useState(props.price);
  const [date, setDate] = useState("");
  const [staff, setStaff] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editSD = async (id) => {
    await Axios.put(`http://localhost:3001/edit_seatdetails`, {
      seat_id: id,
      seat_no: seatNO,
      theatre_id: theatreID,
      seat_type: type,
    });

    if (price !== props.price) {
      await Axios.post("http://localhost:3001/add_seathistory", {
        seat_id: id,
        date: date,
        price: price,
        staff_id: staff,
      });
    }
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

          {/* label */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <label htmlFor="staff_id" className="form-label">
              Staff ID
            </label>
          </div>

          {/* price update */}
          <div className="mb-3">
            <input
              type="date"
              className="form-control multi-row"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <input
              type="number"
              className="form-control multi-row"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <input
              type="text"
              className="form-control multi-row"
              value={staff}
              onChange={(event) => {
                setStaff(event.target.value);
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
