import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditShowtime";

function Showtime() {
  const [movID, setMovID] = useState("");
  const [theaID, setTheatreID] = useState("");
  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [lang, setLang] = useState("");
  const [sub, setSub] = useState("");
  const [free, setFree] = useState("");

  const [showtimeList, setShowtimeList] = useState([]);

  const convertDate = (datetime) => {
    const date = new Date(datetime).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return date;
  };

  const getShowtime = async () => {
    //Get ALL Showtimes
    await Axios.get("http://localhost:3001/showtime").then((response) => {
      console.log(response.data);
      setShowtimeList(response.data);
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
    <div className="showtime">
      <h1>Showtime</h1>
      <br />
      <div className="showtimeInformation">
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

          <br />
          <br />
          <button
            type="button"
            className="btn btn-success"
            onClick={addShowtime}
          >
            Add Showtime
          </button>
        </form>
      </div>
      <hr />
      <div className="moviesButton">
        <button className="btn btn-primary" onClick={getShowtime}>
          Refresh Showtime List
        </button>
        <br />
        <br />
        {showtimeList.map((val, key) => {
          return (
            <div className="showtimes card">
              <div className="card-body text-left">
                <p className="card-text">Movie ID: {val["movie_id"]}</p>
                <p className="card-text">Title: {val["title"]}</p>
                <p className="card-text">Date: {convertDate(val["date"])}</p>
                <p className="card-text">Showtime: {val["showtime"]}</p>
                <p className="card-text">Theatre ID: {val["theatre_id"]}</p>
                <p className="card-text">Air Language: {val["air_language"]}</p>
                <p className="card-text">Subtitle: {val["subtitle"]}</p>
                <p className="card-text">
                  Available Seats: {val["available_seats"]}
                </p>
                <br />

                {/* UPDATE BUTTON */}
                {/* <UpdateButton
                  id={val["showtime_id"]}
                  movID={val["movie_id"]}
                  theaID={val["theatre_id"]}
                  showtime={val["showtime"]}
                  date={val["date"]}
                  lang={val["air_language"]}
                  sub={val["subtitle"]}
                  free={val["available_seats"]}
                /> */}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteShowtime(val["showtime_id"]);
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

export default Showtime;
