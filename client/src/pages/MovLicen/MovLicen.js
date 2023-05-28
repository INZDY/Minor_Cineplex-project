import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMovLicen";

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

    return date;
  };

  const getLicense = async () => {
    //Get ALL Movies
    await Axios.get("http://localhost:3001/movielicense").then((response) => {
      setLicenList(response.data);
    });

    const currDate = new Date();

    licenList.map(async (val, index) => {
      const start = new Date(val["license_start"]);
      const end = new Date(val["license_end"]);
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
        movie_id: val["movie_id"],
        movie_status: status,
      });
    });
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
    <div className="pagecontainer">
      <div className="movielicense">
        <h1>Movie Licensing</h1>
        <br />
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

            <button
              type="button"
              className="btn btn-success"
              onClick={addLicense}
            >
              Add Movie License
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getLicense}
            >
              Refresh License List
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
                <th scope="col">Movie ID</th>
                <th scope="col">License Start</th>
                <th scope="col">License End</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              {licenList.map((val, key) => {
                return (
                  <tr>
                    <th>{val["license_id"]}</th>
                    <th>{val["movie_id"]}</th>
                    <th>{val["license_start"]}</th>
                    <th>{val["license_end"]}</th>
                    <th>{val["license_end"]}</th>
                    <th>{val["movie_cost"]}</th>
                    <th>
                      <UpdateButton
                        id={val["license_id"]}
                        movID={val["movie_id"]}
                        licS={val["license_start"]}
                        licE={val["license_end"]}
                        cost={val["movie_cost"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteLicense(val["license_id"]);
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

export default MovLicen;
