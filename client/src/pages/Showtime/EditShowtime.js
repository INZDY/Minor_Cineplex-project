import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [movID, setMovID] = useState(props.movID);
  const [theaID, setTheatreID] = useState(props.theaID);
  const [showtime, setShowtime] = useState(props.showtime);
  const [date, setDate] = useState(props.date);
  const [lang, setLang] = useState(props.lang);
  const [sub, setSub] = useState(props.sub);
  const [free, setFree] = useState(props.free);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editShowtime = async (id) => {
    await Axios.put("http://localhost:3001/edit_showtime", {
      movie_id: movID,
      theatre_id: theaID,
      show_time: showtime,
      date: date,
      air_language: lang,
      subtitle: sub,
      available_seats: free,
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
            <label htmlFor="theatre_id" className="form-label">
              Theatre ID
            </label>
            <input
              type="number"
              className="form-control"
              value={theaID}
              onChange={(event) => {
                setTheatreID(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="showtime" className="form-label">
              Showtime
            </label>
            <input
              type="time"
              className="form-control"
              value={showtime}
              onChange={(event) => {
                setShowtime(event.target.value);
              }}
            />
          </div>

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
            <label htmlFor="air_language" className="form-label">
              Air Language
            </label>
            <input
              type="text"
              className="form-control"
              value={lang}
              onChange={(event) => {
                setLang(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="subtitle" className="form-label">
              Subtitle
            </label>
            <input
              type="text"
              className="form-control"
              value={sub}
              onChange={(event) => {
                setSub(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="available_seats" className="form-label">
              Available Seats
            </label>
            <input
              type="number"
              className="form-control"
              value={free}
              onChange={(event) => {
                setFree(event.target.value);
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
              editShowtime(props.id);
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
