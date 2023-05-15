import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [name, setName] = useState(props.name);
  const [address, setAddress] = useState(props.address);
  const [tel, setTel] = useState(props.tel);
  const [email, setEmail] = useState(props.email);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editBranch = (id) => {
    Axios.put("http://localhost:3001/edit_branch", {
      branch_id: id,
      branch_name: name,
      address: address,
      branch_tel: tel,
      branch_email: email,
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
            <label htmlFor="name" className="form-label">
              Name
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
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              Tel No.
            </label>
            <input
              type="text"
              className="form-control"
              value={tel}
              onChange={(event) => {
                setTel(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
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
              editBranch(props.id);
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
