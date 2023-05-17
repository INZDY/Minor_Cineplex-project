import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [title, setTitle] = useState(props.title);
  const [crating, setCrating] = useState(props.crating);
  const [length, setLength] = useState(props.length);
  const [srating, setSrating] = useState(props.srating);
  const [genre, setGenre] = useState(props.genre);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editTheatre = (id) => {
    Axios.put("http://localhost:3001/edit_movies", {
      movie_id: id,
      title: title,
      content_rating: crating,
      length: length,
      score_rating: srating,
    });
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
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content_rating" className="form-label">
              Content Rating
            </label>
            <input
              type="text"
              className="form-control"
              value={crating}
              onChange={(event) => {
                setCrating(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="length" className="form-label">
              Length
            </label>
            <input
              type="number"
              className="form-control"
              value={length}
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="score_rating" className="form-label">
              Score Rating
            </label>
            <input
              type="number"
              className="form-control"
              value={srating}
              onChange={(event) => {
                setSrating(event.target.value);
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
