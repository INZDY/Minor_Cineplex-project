import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [date, setDate] = useState(props.date);
  const [cusID, setCusID] = useState(props.cusID);
  const [showID, setShowID] = useState(props.showID);
  const [seat, setSeat] = useState(props.seat);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for multiple inputs
  const handleFormChange = (index, event) => {
    let data = [...seat];
    data[index] = event.target.value;
    setSeat(data);
    // //console.log(genre);
  };

  const addFields = () => {
    let newField = "";
    setSeat([...seat, newField]);
    // //console.log(genre);
  };

  const removeFields = (index) => {
    let data = [...seat];
    data.splice(index, 1);
    setSeat(data);
  };
  /////

  const editReserves = async (id) => {
    await Axios.put("http://localhost:3001/edit_reservation", {
      reserve_id: id,
      date: date,
      customer_id: cusID,
      showtime_id: showID,
    });

    await Axios.delete(`http://localhost:3001/delete_reservedseats/${id}`);

    seat.map(async (val) => {
      await Axios.post("http://localhost:3001/add_reservedseats", {
        reserve_id: id,
        seat_id: val,
      });
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
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="customer_id" className="form-label">
              Customer ID
            </label>
            <input
              type="number"
              className="form-control"
              value={cusID}
              onChange={(event) => {
                setCusID(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="showtime_id" className="form-label">
              Showtime ID
            </label>
            <input
              type="number"
              className="form-control"
              value={showID}
              onChange={(event) => {
                setShowID(event.target.value);
              }}
            />
          </div>

          {/* genre */}
          {seat.map((input, index) => {
            return (
              <div className="mb-3" key={index}>
                <input
                  type="number"
                  className="form-control multi-row"
                  value={input}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => removeFields(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            className="btn btn-secondary"
            type="button"
            onClick={addFields}
          >
            Add More Genre
          </button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editReserves(props.id);
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
