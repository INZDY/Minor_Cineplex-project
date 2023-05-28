import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editMemtype = (old_name) => {
    Axios.put(`http://localhost:3001/edit_memtype/${old_name}`, {
      type_name: name,
      discount_price: price,
    });
    //console.log("GOGOGOG");
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
            <label htmlFor="type_name" className="form-label">
              Type Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="discount_price" className="form-label">
              Discount Price
            </label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
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
              editMemtype(props.name);
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
