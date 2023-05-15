import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UpdateButton(props) {
  const [fname, setFname] = useState(props.fname);
  const [lname, setLname] = useState(props.lname);
  const [position, setPosition] = useState(props.position);
  const [salary, setSalary] = useState(props.salary);
  const [branchID, setBranchID] = useState(props.branchID);
  const [email, setEmail] = useState(props.email);
  const [tel, setTel] = useState(props.tel);
  const [citizenID, setCitizenID] = useState(props.citizenID);
  const [address, setAddress] = useState(props.address);
  const [gender, setGender] = useState(props.gender);
  const [DOB, setDOB] = useState(props.DOB);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editStaff = (id) => {
    Axios.put("http://localhost:3001/edit_staff", {
      staff_id: id,
      staff_fname: fname,
      staff_lname: lname,
      position: position,
      salary: salary,
      branch_id: branchID,
      staff_email: email,
      staff_tel: tel,
      staff_citizen_id: citizenID,
      staff_address: address,
      staff_gender: gender,
      staff_DOB: DOB,
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
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              value={position}
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(event) => {
                setSalary(event.target.value);
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
            <label htmlFor="citizen_id" className="form-label">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editStaff(props.id);
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
