import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditBranch";

function Branch() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const [branchList, setBranchList] = useState([]);

  const getBranchs = () => {
    Axios.get("http://localhost:3001/branch").then((response) => {
      setBranchList(response.data);
    });
    console.log(branchList);
  };

  const addBranch = () => {
    Axios.post("http://localhost:3001/add_branch", {
      branch_name: name,
      address: address,
      branch_tel: tel,
      branch_email: email
    }).then(() => {
      setBranchList([
        ...branchList,
        {
            branch_name: name,
            address: address,
            branch_tel: tel,
            branch_email: email
        },
      ]);
    });
    console.log(branchList);
  };

  const deleteBranch = (id) => {
    Axios.delete(`http://localhost:3001/delete_branch/${id}`);
  };

  return (
    <div className="branch">
      <h1>Branch Information</h1>
      <br />
      <div className="branchInformation">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
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
              placeholder="Enter address"
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
              placeholder="Enter tel no."
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
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          
          <button className="btn btn-success" onClick={addBranch}>
            Add Branch
          </button>
        </form>
      </div>
      <hr />
      <div className="branchButton">
        <button className="btn btn-primary" onClick={getBranchs}>
          Refresh Branch List
        </button>
        <br />
        <br />
        {branchList.map((val, key) => {
          return (
            <div className="branchs card">
              <div className="card-body text-left">
                <p className="card-text">ID: {val["branch_id"]}</p>
                <p className="card-text">Name: {val["branch_name"]}</p>
                <p className="card-text">Address: {val["address"]}</p>
                <p className="card-text">Mobile No.: {val["branch_tel"]}</p>
                <p className="card-text">Email: {val["branch_email"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["branch_id"]}
                  name={val["branch_name"]}
                  address={val["address"]}
                  tel={val["branch_tel"]}
                  email={val["branch_email"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteBranch(val["branch_id"]);
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

export default Branch;
