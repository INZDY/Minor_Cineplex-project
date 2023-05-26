import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMovLicen";
import axios from "axios";

function MovLicen() {
  const [licStart, setLicStart] = useState("");
  const [licEnd, setLicEnd] = useState("");
  const [movID, setMovID] = useState("");
  const [cost, setCost] = useState("");

  const [licenList, setLicenList] = useState([]);

  const convertDate = (datetime) => {
    const date = new Date(datetime).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // const date = new Date(datetime).toISOString();

    return date;
  };

  const getLicense = async () => {
    //Get ALL Movies
    await Axios.get("http://localhost:3001/movielicense").then((response) => {
      setLicenList(response.data);
    });
    // console.log(licenList);
  };

  const addLicense = async () => {
    await Axios.post("http://localhost:3001/add_movielicense", {
      movie_id: movID,
      license_start: licStart,
      license_end: licEnd,
      movie_cost: cost,
    });

    const currDate = new Date();
    const start = new Date(licStart);
    const end = new Date(licEnd);
    let status = null;

    // console.log(currDate, start, end);
    if (end < currDate) {
      status = "expired";
    } else if (start > currDate) {
      status = "comingsoon";
    } else if (currDate >= start && currDate <= end) {
      status = "airing";
    }

    await Axios.put("http://localhost:3001/edit_moviestatus", {
      movie_id: movID,
      movie_status: status,
    });
  };

  const deleteLicense = (id) => {
    Axios.delete(`http://localhost:3001/delete_movielicense/${id}`);
  };

  return (
    <div className="movielicense">
      <h1>Movie Licensing</h1>
      <div className="moviesInformation">
        <form action="">
          {/* moviedetails*/}
          <div className="mb-3">
            <label htmlFor="movie_id" className="form-label">
              Movie ID
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter movie id"
              onChange={(event) => {
                setMovID(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="license_start" className="form-label">
              License Start
            </label>
            <input
              type="date"
              className="form-control"
              onChange={(event) => {
                setLicStart(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="license_end" className="form-label">
              License End
            </label>
            <input
              type="date"
              className="form-control"
              onChange={(event) => {
                setLicEnd(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="movie_cost" className="form-label">
              Cost
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter cost"
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </div>

          <br />
          <br />
          <button
            type="button"
            className="btn btn-success"
            onClick={addLicense}
          >
            Add Movie License
          </button>
        </form>
      </div>
      <hr />
      <div className="moviesButton">
        <button className="btn btn-primary" onClick={getLicense}>
          Refresh License List
        </button>
        <br />
        <br />
        {licenList.map((val, key) => {
          return (
            <div className="licenses card">
              <div className="card-body text-left">
                <p className="card-text">Movie ID: {val["movie_id"]}</p>
                <p className="card-text">
                  License Start: {convertDate(val["license_start"])}
                </p>
                <p className="card-text">
                  License End: {convertDate(val["license_end"])}
                </p>
                <p className="card-text">Cost: {val["movie_cost"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["license_id"]}
                  movID={val["movie_id"]}
                  licS={val["license_start"]}
                  licE={val["license_end"]}
                  cost={val["movie_cost"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteLicense(val["license_id"]);
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

export default MovLicen;
