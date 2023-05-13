import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditStaff";

function Staff() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [branchID, setBranchID] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");

  const [staffList, setStaffList] = useState([]);

  const getStaffs = () => {
    Axios.get("http://localhost:3001/staff").then((response) => {
      setStaffList(response.data);
    });
    console.log(staffList);
  };

  const addStaff = () => {
    Axios.post("http://localhost:3001/add_staff", {
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
    }).then(() => {
      setStaffList([
        ...staffList,
        {
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
        },
      ]);
    });
    console.log(staffList);
  };

  const deleteStaff = (id) => {
    Axios.delete(`http://localhost:3001/delete_staff/${id}`);
  };

  return (
    <div className="staff">
      <h1>Staff Information</h1>
      <div className="staffInformation">
        <form action="">
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
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
              placeholder="Enter last name"
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
              placeholder="Enter position"
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
              placeholder="Enter salary"
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
              placeholder="Enter branch"
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
              placeholder="Enter email"
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
              placeholder="Enter mobile no."
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
              placeholder="Enter your ID"
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
              placeholder="Enter address"
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
              placeholder="Enter gender"
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
              type="text"
              className="form-control"
              placeholder="yyyy/mm/dd"
              onChange={(event) => {
                setDOB(event.target.value);
              }}
            />
          </div>

          <button className="btn btn-success" onClick={addStaff}>
            Add Staff
          </button>
        </form>
      </div>
      <hr />
      <div className="staffButton">
        <button className="btn btn-primary" onClick={getStaffs}>
          Refresh Staff List
        </button>
        <br />
        <br />
        {staffList.map((val, key) => {
          return (
            <div className="staffs card">
              <div className="card-body text-left">
                <p className="card-text">ID: {val["staff_id"]}</p>
                <p className="card-text">First Name: {val["staff_fname"]}</p>
                <p className="card-text">Last Name: {val["staff_lname"]}</p>
                <p className="card-text">Position: {val["position"]}</p>
                <p className="card-text">Salary: {val["salary"]}</p>
                <p className="card-text">Branch ID: {val["branch_id"]}</p>
                <p className="card-text">Email: {val["staff_email"]}</p>
                <p className="card-text">Mobile No.: {val["staff_tel"]}</p>
                <p className="card-text">
                  Citizen ID: {val["staff_citizen_id"]}
                </p>
                <p className="card-text">Address: {val["staff_address"]}</p>
                <p className="card-text">Gender: {val["staff_gender"]}</p>
                <p className="card-text">Date of Birth: {val["staff_DOB"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["staff_id"]}
                  fname={val["staff_fname"]}
                  lname={val["staff_lname"]}
                  position={val["position"]}
                  salary={val["salary"]}
                  branchID={val["branch_id"]}
                  email={val["staff_email"]}
                  tel={val["staff_tel"]}
                  citizenID={val["staff_citizen_id"]}
                  address={val["staff_address"]}
                  gender={val["staff_gender"]}
                  DOB={val["staff_DOB"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteStaff(val["staff_id"]);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Staff;
