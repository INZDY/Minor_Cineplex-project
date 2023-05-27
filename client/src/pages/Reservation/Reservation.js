import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditReservation";
import { convertDate} from "../../components/UtilFunctions";

function Reservation() {
  const [date, setDate] = useState("");
  const [cusID, setCusID] = useState("");
  const [showID, setShowID] = useState("");
  const [seats, setSeats] = useState([""]);

  const [resList, setResList] = useState([]);
  const [resSeats, setResSeats] = useState([]);
  const [reserves, setReserves] = useState([]);

  // for multiple inputs
  const handleFormChange = (index, event) => {
    let data = [...seats];
    data[index] = event.target.value;
    setSeats(data);
    // console.log(seats);
  };

  const addFields = () => {
    let newField = "";
    setSeats([...seats, newField]);
    // console.log(genre);
  };

  const removeFields = (index) => {
    let data = [...seats];
    data.splice(index, 1);
    setSeats(data);
  };
  /////

  const getReserves = async () => {
    //Get RESERVED SEATS with price
    await Axios.get("http://localhost:3001/reservedseats").then((response) => {
      setResSeats(response.data);
      //   console.log(resSeats);
    });

    //UPDATE TOTAL PRICE
    const reserveTotal = [];
    resSeats.forEach((item) => {
      const existingItem = reserveTotal.find(
        (obj) => obj.reserve_id === item.reserve_id
      );

      if (existingItem) {
        existingItem.price += item.price;
      } else {
        reserveTotal.push({ reserve_id: item.reserve_id, price: item.price });
      }
    });

    reserveTotal.map(async (val, index) => {
      await Axios.put("http://localhost:3001/edit_reserveprice", {
        reserve_id: val.reserve_id,
        price: val.price,
      });
    });

    //Get ALL RESERVES
    await Axios.get("http://localhost:3001/reservation").then((response) => {
      setResList(response.data);
      //   console.log(resList);
    });

    //RESERVATION + SEATS
    let reserve_seats = resList.map((res) => {
      const matching_seats = resSeats
        .filter((seats) => seats.reserve_id === res.reserve_id)
        .map((item) => item.seat_id);
      return { ...res, seat_id: matching_seats };
    });

    setReserves(reserve_seats);
    // console.log(reserve_seats)
  };

  const addReserves = async () => {
    const data = {
      customer_id: cusID,
      showtime_id: showID,
      date: date,
      total_price: 0,
    };
    const response = await Axios.post(
      "http://localhost:3001/add_reservation",
      data
    );
    const ID = response.data.insertId;
    // console.log(ID);

    seats.map(async (val) => {
      await Axios.post("http://localhost:3001/add_reservedseats", {
        reserve_id: ID,
        seat_id: val,
      });
    });
  };

  const deleteReserves = (id) => {
    Axios.delete(`http://localhost:3001/delete_reservation/${id}`);
  };

  return (
    <div className="reservation">
      <h1>Reservation</h1>
      <br />
      <div className="reservesInformation">
        <form action="">
          {/* moviedetails*/}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customer_id" className="form-label">
              Customer ID
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Customer ID"
              onChange={(event) => {
                setCusID(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="showtime_id" className="form-label">
              Showtime ID
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter showtime ID"
              onChange={(event) => {
                setShowID(event.target.value);
              }}
            />
          </div>

          {/* label */}
          <div className="mb-3">
            <label htmlFor="seats" className="form-label">
              Seats
            </label>
          </div>

          {/* seats */}
          {seats.map((input, index) => {
            return (
              <div className="mb-3" key={index}>
                <input
                  type="number"
                  className="form-control multi-row"
                  placeholder="Enter seat id"
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
            Add More Seats
          </button>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-success"
            onClick={addReserves}
          >
            Add Reservation
          </button>
        </form>
      </div>
      <hr />
      <div className="reservesButton">
        <button className="btn btn-primary" onClick={getReserves}>
          Refresh Reservation List
        </button>
        <br />
        <br />
        {reserves.map((val, key) => {
          return (
            <div className="reservess card">
              <div className="card-body text-left">
                <p className="card-text">Reservation ID: {val["reserve_id"]}</p>
                <p className="card-text">Reserve Date: {convertDate(val["date"])}</p>
                <p className="card-text">Customer ID: {val["customer_id"]}</p>
                <p className="card-text">Showtime ID: {val["showtime_id"]}</p>
                <p className="card-text">Total Price: {val["total_price"]}</p>
                <p className="card-text">Seats: {val["seat_id"].join(", ")}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["reserve_id"]}
                  date={val["date"]}
                  cusID={val["customer_id"]}
                  showID={val["showtime_id"]}
                  seat={val["seat_id"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteReserves(val["reserve_id"]);
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

export default Reservation;
