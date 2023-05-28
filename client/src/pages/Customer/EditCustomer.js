import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [fname, setFname] = useState(props.fname);
  const [lname, setLname] = useState(props.lname);
  const [email, setEmail] = useState(props.email);
  const [tel, setTel] = useState(props.tel);
  const [citizenID, setCitizenID] = useState(props.citizenID);
  const [address, setAddress] = useState(props.address);
  const [gender, setGender] = useState(props.gender);
  const [DOB, setDOB] = useState(props.DOB);
  const [type, setType] = useState(props.type);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editCustomer = (id) => {
    Axios.put("http://localhost:3001/edit_customer", {
      customer_id: id,
      customer_fname: fname,
      customer_lname: lname,
      customer_email: email,
      customer_tel: tel,
      customer_citizen_id: citizenID,
      customer_address: address,
      customer_gender: gender,
      customer_DOB: DOB,
      type_name: type,
    });
    console.log("GOGOGOG");
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
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={fname}
              onChange={(event) => {
                setFname(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={lname}
              onChange={(event) => {
                setLname(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
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
          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              Mobile No.
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
            <label htmlFor="citizenID" className="form-label">
              Citizen ID
            </label>
            <input
              type="text"
              className="form-control"
              value={citizenID}
              onChange={(event) => {
                setCitizenID(event.target.value);
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
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DOB" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              value={DOB}
              onChange={(event) => {
                setDOB(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Member Type
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
              editCustomer(props.id);
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
