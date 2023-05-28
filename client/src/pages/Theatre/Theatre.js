import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditTheatre";

function Theatre() {
  const [no, setNo] = useState("");
  const [branchID, setBranchID] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  const [theatreList, setTheatreList] = useState([]);

  const getTheatres = () => {
    Axios.get("http://localhost:3001/theatre").then((response) => {
      setTheatreList(response.data);
    });
    console.log(theatreList);
  };

  const addTheatre = () => {
    Axios.post("http://localhost:3001/add_theatre", {
      theatre_no: no,
      branch_id: branchID,
      capacity: capacity,
      theatre_type: type,
    }).then(() => {
      setTheatreList([
        ...theatreList,
        {
          theatre_no: no,
          branch_id: branchID,
          capacity: capacity,
          theatre_type: type,
        },
      ]);
    });
    console.log(theatreList);
  };

  const deleteTheatre = (id) => {
    Axios.delete(`http://localhost:3001/delete_theatre/${id}`);
  };

  return (
    <div className="pagecontainer">
      <div className="theatre">
        <h1>Theatre Information</h1>
        <br />
        <div className="theatreInformation">
          <form action="">
            <div className="mb-3">
              <label htmlFor="theatre_no" className="form-label">
                Theatre No.
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter theatre no."
                onChange={(event) => {
                  setNo(event.target.value);
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
                placeholder="Enter branch id"
                onChange={(event) => {
                  setBranchID(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Capacity
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter capacity"
                onChange={(event) => {
                  setCapacity(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Theatre Type
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              />
            </div>

            <button className="btn btn-success" onClick={addTheatre}>
              Add Theatre
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getTheatres}
            >
              Refresh Theatre List
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
                <th scope="col">Theatre ID</th>
                <th scope="col">Theatre No.</th>
                <th scope="col">Branch ID</th>
                <th scope="col">Capacity</th>
                <th scope="col">Theatre Type</th>
              </tr>
            </thead>
            <tbody>
              {theatreList.map((val, key) => {
                return (
                  <tr>
                    <th>{val["theatre_id"]}</th>
                    <th>{val["theatre_no"]}</th>
                    <th>{val["branch_id"]}</th>
                    <th>{val["capacity"]}</th>
                    <th>{val["theatre_type"]}</th>
                    <th>
                      <UpdateButton
                        id={val["theatre_id"]}
                        theatre_no={val["theatre_no"]}
                        branch_id={val["branch_id"]}
                        capacity={val["capacity"]}
                        type={val["theatre_type"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteTheatre(val["theatre_id"]);
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



      <div className="theatreButton">
        <br />
        <br />
        {theatreList.map((val, key) => {
          return (
            <div className="theatres card">
              <div className="card-body text-left">
                <p className="card-text">ID: {val["theatre_id"]}</p>
                <p className="card-text">Theatre No: {val["theatre_no"]}</p>
                <p className="card-text">Branch ID: {val["branch_id"]}</p>
                <p className="card-text">Capacity: {val["capacity"]}</p>
                <p className="card-text">Theatre Type: {val["theatre_type"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["theatre_id"]}
                  theatre_no={val["theatre_no"]}
                  branch_id={val["branch_id"]}
                  capacity={val["capacity"]}
                  type={val["theatre_type"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteTheatre(val["theatre_id"]);
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

export default Theatre;
