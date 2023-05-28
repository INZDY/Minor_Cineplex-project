import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMovRegis";

function MovRegis() {
  const [title, setTitle] = useState("");
  const [crating, setCrating] = useState("");
  const [length, setLength] = useState("");
  const [srating, setSrating] = useState(0);
  const movieStatus = null;
  const [genre, setGenre] = useState([""]);

  const [movList, setMovList] = useState([]);
  const [movGenre, setMovGenre] = useState([]);
  const [movies, setMovies] = useState([]);

  // for multiple inputs
  const handleFormChange = (index, event) => {
    let data = [...genre];
    data[index] = event.target.value;
    setGenre(data);
    console.log(genre);
  };

  const addFields = () => {
    let newField = "";
    setGenre([...genre, newField]);
    // console.log(genre);
  };

  const removeFields = (index) => {
    let data = [...genre];
    data.splice(index, 1);
    setGenre(data);
  };
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
    <div className="pagecontainer">
      <div className="movies">
        <h1>Movie Registration</h1>
        <br />
        <div className="moviesInformation">
          <form action="">
            {/* moviedetails*/}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Movie Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content_rating" className="form-label">
                Content Rating
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter content rating"
                onChange={(event) => {
                  setCrating(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="length" className="form-label">
                Length (Minutes)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter length"
                onChange={(event) => {
                  setLength(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="score_rating" className="form-label">
                Score Rating
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter score"
                onChange={(event) => {
                  setSrating(event.target.value);
                }}
              />
            </div>

            {/* label */}
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genres
              </label>
            </div>

            {/* genre */}
            {genre.map((input, index) => {
              return (
                <div className="mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control multi-row"
                    placeholder="Enter genre"
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={removeFields}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            <button
              className="btn btn-secondary"
              type="button"
              onClick={addFields}
            >
              Add More Genre
            </button>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={addMovies}
            >
              Add Movies
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getMovies}
            >
              Refresh Movie List
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
                <th scope="col">Title</th>
                <th scope="col">Content Rating</th>
                <th scope="col">Length</th>
                <th scope="col">Score Rating</th>
                <th scope="col">Movie Status</th>
                <th scope="col">Times Aired</th>
                <th scope="col">Genre</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((val, key) => {
                return (
                  <tr>
                    <th>{val["movie_id"]}</th>
                    <th>{val["title"]}</th>
                    <th>{val["content_rating"]}</th>
                    <th>{val["length"]}</th>
                    <th>{val["score_rating"]}</th>
                    <th>{val["movie_status"]}</th>
                    <th>{val["times_aired"]}</th>
                    <th>{val["genre"].join(", ")}</th>
                    <th>
                      <UpdateButton
                        id={val["movie_id"]}
                        title={val["title"]}
                        crating={val["content_rating"]}
                        length={val["length"]}
                        srating={val["score_rating"]}
                        genre={val["genre"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteMovies(val["movie_id"]);
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

export default MovRegis;
