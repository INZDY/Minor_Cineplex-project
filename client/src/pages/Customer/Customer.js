import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditCustomer";
import { convertDate } from "../../components/UtilFunctions";

function Customer() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [type, setType] = useState("");

  const [customerList, setCustomerList] = useState([]);

  const getCustomers = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setCustomerList(response.data);
    });
    //console.log(customerList);
  };

  const addCustomer = () => {
    Axios.post("http://localhost:3001/add_customer", {
      customer_fname: fname,
      customer_lname: lname,
      customer_email: email,
      customer_tel: tel,
      customer_citizen_id: citizenID,
      customer_address: address,
      customer_gender: gender,
      customer_DOB: DOB,
      type_name: type,
    }).then(() => {
      setCustomerList([
        ...customerList,
        {
          customer_fname: fname,
          customer_lname: lname,
          customer_email: email,
          customer_tel: tel,
          customer_citizen_id: citizenID,
          customer_address: address,
          customer_gender: gender,
          customer_DOB: DOB,
          type_name: type,
        },
      ]);
    });
    //console.log(customerList);
  };

  const deleteCustomer = (id) => {
    Axios.delete(`http://localhost:3001/delete_customer/${id}`);
  };

  return (
    <div className="pagecontainer">
      <div className="customer">
        <h1>Customer Information</h1>
        <br />
        <div className="customerInformation">
          <form action="">
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">
                First Name:
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
                Last Name:
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
              <label htmlFor="email" className="form-label">
                Email:
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
                Mobile No.:
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
                Citizen ID:
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
                Address:
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
                Gender:
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
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="yyyy/mm/dd"
                onChange={(event) => {
                  setDOB(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type_name" className="form-label">
                Member Type:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter member type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              />
            </div>
            <button className="btn btn-success" onClick={addCustomer}>
              Add Customer
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getCustomers}
            >
              Refresh Customer List
            </button>
          </form>
        </div>
        <hr />
      </div>
      <div className="refreshButton">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Customer ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Citizen ID</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Member Type</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((val, key) => {
                return (
                  <tr>
                    <th>{val["customer_id"]}</th>
                    <th>{val["customer_fname"]}</th>
                    <th>{val["customer_lname"]}</th>
                    <th>{val["customer_email"]}</th>
                    <th>{val["customer_tel"]}</th>
                    <th>{val["customer_citizen_id"]}</th>
                    <th>{val["customer_address"]}</th>
                    <th>{val["customer_gender"]}</th>
                    <th>{convertDate(val["customer_DOB"])}</th>
                    <th>{val["type_name"]}</th>
                    <th>
                      <UpdateButton
                        id={val["customer_id"]}
                        fname={val["customer_fname"]}
                        lname={val["customer_lname"]}
                        email={val["customer_email"]}
                        tel={val["customer_tel"]}
                        citizenID={val["customer_citizen_id"]}
                        address={val["customer_address"]}
                        gender={val["customer_gender"]}
                        DOB={val["customer_DOB"]}
                        type={val["type_name"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteCustomer(val["customer_id"]);
                        }}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customer;
