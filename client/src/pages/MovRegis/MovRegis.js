import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMovRegis";

function MovRegis() {
  const [title, setTitle] = useState("");
  const [crating, setCrating] = useState("");
  const [length, setLength] = useState("");
  const [srating, setSrating] = useState(null);
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


  const handleInsertion = () => {

  }

  const getMovies = async () => {
    try {
      console.log('try')
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
  
      // console.log(movie_genres)
      setMovies(movie_genres);
      // console.log(movies)

    }catch(error){
      console.error('Error', error);
    }
  };

  // const getPK = async (data) => {
  //   try{
  //     const response = await Axios.post("http://localhost:3001/add_movies", data)
  //     const id = response.data.movie_id
  //     return id
  //   } catch (error){
  //     console.error('Error')
  //   }
  // }

  const addMovies = (movies) => {
    const data = {
      title: title,
      content_rating: crating,
      length: length,
      score_rating: srating,
      times_aired: 0,
      movie_status: null,
    };
    // const id = getPK(data)
    Axios.post("http://localhost:3001/add_movies", data).then((response) => {
      return response;
    });

    console.log(movies);
    const currentID = Math.max(...movies.map((item) => item.movie_id)) + 1;
    console.log(currentID);

    // genre.map((val) => {
    //   Axios.post("http://localhost:3001/add_moviegenre", {
    //     movie_id : id,
    //     genre : val
    //   })
    // })
  };

  const deleteMovies = () => {};

  return (
    <div className="movies">
      <h1>Movie Registration</h1>
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
            onClick={() => {
              addMovies(movies);
            }}
          >
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
                <p className="card-text">Movie ID: {val["movies_id"]}</p>
                <p className="card-text">Title: {val["title"]}</p>
                <p className="card-text">
                  Content rating: {val["content_rating"]}
                </p>
                <p className="card-text">Length: {val["length"]}</p>
                <p className="card-text">Score Rating: {val["score_rating"]}</p>
                <p className="card-text">Movie Status: {val["movie_status"]}</p>
                <p className="card-text">Times Aired: {val["times_aired"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                {/* <UpdateButton
                  id={val["movies_id"]}
                  moviesNO={val["movies_no"]}
                  theatreID={val["theatre_id"]}
                  type={val["movies_type"]}
                /> */}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteMovies();
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

export default MovRegis;
