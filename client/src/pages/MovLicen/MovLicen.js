import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMovLicen";

function MovLicen() {
  const [licStart, setLicStart] = useState("");
  const [licEnd, setLicEnd] = useState("");
  const [movID, setMovID] = useState("")
  const [cost, setCost] = useState("");

//   const [movList, setMovList] = useState([]);
//   const [movGenre, setMovGenre] = useState([]);
//   const [movies, setMovies] = useState([]);

  // for multiple inputs
//   const handleFormChange = (index, event) => {
//     let data = [...genre];
//     data[index] = event.target.value;
//     setGenre(data);
//     console.log(genre);
//   };

//   const addFields = () => {
//     let newField = "";
//     setGenre([...genre, newField]);
//     // console.log(genre);
//   };

//   const removeFields = (index) => {
//     let data = [...genre];
//     data.splice(index, 1);
//     setGenre(data);
//   };
  /////

  const getMovies = async () => {
    //Get ALL Movies
    await Axios.get("http://localhost:3001/movielist").then((response) => {
      setMovList(response.data);
      // console.log(movList)
    });

    //Get GENRES
    await Axios.get("http://localhost:3001/moviegenre").then((response) => {
      setMovGenre(response.data);
      // console.log(movGenre)
    });

    //MOVIES + GENRES
    let movie_genres = movList.map((mov) => {
      const matching_genres = movGenre
        .filter((genre) => genre.movie_id === mov.movie_id)
        .map((item) => item.genre);
       return { ...mov, genre: matching_genres };
    });

    setMovies(movie_genres);
    // console.log(movies)
  };

  const addMovies = async () => {
    const data = {
      title: title,
      content_rating: crating,
      length: length,
      score_rating: srating,
      times_aired: 0,
      movie_status: movieStatus,
    };
    const response1 = await Axios.post(
      "http://localhost:3001/add_movies",
      data
    );
    const ID = response1.data.insertId;
    console.log(ID);

    genre.map(async (val) => {
      await Axios.post("http://localhost:3001/add_moviegenre", {
        movie_id: ID,
        genre: val,
      });
    });
  };

  const deleteMovies = (id) => {
    Axios.delete(`http://localhost:3001/delete_movies/${id}`);
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
          <button type="button" className="btn btn-success" onClick={addMovies}>
            Add Movies
          </button>
        </form>
      </div>
      <hr />
      <div className="moviesButton">
        <button className="btn btn-primary" onClick={getMovies}>
          Refresh Movie List
        </button>
        <br />
        <br />
        {movies.map((val, key) => {
          return (
            <div className="moviess card">
              <div className="card-body text-left">
                <p className="card-text">Movie ID: {val["movie_id"]}</p>
                <p className="card-text">Title: {val["title"]}</p>
                <p className="card-text">
                  Content rating: {val["content_rating"]}
                </p>
                <p className="card-text">Length: {val["length"]}</p>
                <p className="card-text">Score Rating: {val["score_rating"]}</p>
                <p className="card-text">Movie Status: {val["movie_status"]}</p>
                <p className="card-text">Times Aired: {val["times_aired"]}</p>
                <p className="card-text">Genre: {val["genre"].join(", ")}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["movie_id"]}
                  title={val["title"]}
                  crating={val["content_rating"]}
                  length={val["length"]}
                  srating={val["score_rating"]}
                  genre={val["genre"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteMovies(val["movie_id"]);
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
