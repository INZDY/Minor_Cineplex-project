import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditShowtime";
import { convertDate, convertTime } from "../../components/UtilFunctions";

function Showtime() {
  const [movID, setMovID] = useState("");
  const [theaID, setTheatreID] = useState("");
  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [lang, setLang] = useState("");
  const [sub, setSub] = useState("");
  const [free, setFree] = useState("");

  const [showtimeList, setShowtimeList] = useState([]);

  const getShowtime = async () => {
    //Get ALL Showtimes
    await Axios.get("http://localhost:3001/showtime").then((response) => {
      //   //console.log(response.data);
      setShowtimeList(response.data);
    });

    const movieAirCount = [];
    showtimeList.forEach((item) => {
      const existingIntem = movieAirCount.find(
        (existItem) => existItem.movie_id === item.movie_id
      );

      if (existingIntem) {
        existingIntem.count++;
      } else {
        movieAirCount.push({ movie_id: item.movie_id, count: 1 });
      }
    });

    movieAirCount.map(async (val, index) => {
      await Axios.put("http://localhost:3001/edit_timesaired", {
        movie_id: val.movie_id,
        times_aired: val.count,
      });
    });
  };

  const addShowtime = async () => {
    await Axios.post("http://localhost:3001/add_showtime", {
      movie_id: movID,
      theatre_id: theaID,
      show_time: showtime,
      date: date,
      air_language: lang,
      subtitle: sub,
      available_seats: free,
    });
  };

  const deleteShowtime = (id) => {
    Axios.delete(`http://localhost:3001/delete_showtime/${id}`);
  };

  return (
    <div className="pagecontainer">
      <div className="showtime">
        <h1>Showtime</h1>
        <br />
        <div className="showtimeInformation">
          <form action="">
            {/* showtime*/}
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
              <label htmlFor="theatre_id" className="form-label">
                Theatre ID
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter theatre id"
                onChange={(event) => {
                  setTheatreID(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="showtime" className="form-label">
                Showtime
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter time"
                onChange={(event) => {
                  setShowtime(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="air_language" className="form-label">
                Air Language
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter language"
                onChange={(event) => {
                  setLang(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subtitle" className="form-label">
                Subtitle
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter subtitle"
                onChange={(event) => {
                  setSub(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="available_seats" className="form-label">
                Available Seats
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter available seats"
                onChange={(event) => {
                  setFree(event.target.value);
                }}
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={addShowtime}
            >
              Add Showtime
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getShowtime}
            >
              Refresh Showtime List
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
                <th scope="col">Showtime ID</th>
                <th scope="col">Movie ID</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Showtime</th>
                <th scope="col">Theatre ID</th>
                <th scope="col">Air Language</th>
                <th scope="col">Subtitle</th>
                <th scope="col">Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {showtimeList.map((val, key) => {
                return (
                  <tr>
                    <th>{val["showtime_id"]}</th>
                    <th>{val["movie_id"]}</th>
                    <th>{val["title"]}</th>
                    <th>{convertDate(val["date"])}</th>
                    <th>{convertTime(val["show_time"])}</th>
                    <th>{val["theatre_id"]}</th>
                    <th>{val["air_language"]}</th>
                    <th>{val["subtitle"]}</th>
                    <th>{val["available_seats"]}</th>
                    <th>
                      <UpdateButton
                        id={val["showtime_id"]}
                        movID={val["movie_id"]}
                        theaID={val["theatre_id"]}
                        showtime={val["showtime"]}
                        date={val["date"]}
                        lang={val["air_language"]}
                        sub={val["subtitle"]}
                        free={val["available_seats"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteShowtime(val["showtime_id"]);
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

export default Showtime;
