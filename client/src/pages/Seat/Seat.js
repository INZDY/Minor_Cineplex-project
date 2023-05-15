import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditSeat";

function Seat() {
  const [theatreID, setTheatreID] = useState("");
  const [date, setDate] = useState("");
  const [inputFields, setInputFields] = useState([
    { no: "", type: "", price: 0, staff: 0 },
  ]);

  const [seatDetailList, setSeatDetailList] = useState([]);
  const [seatHistoryList, setSeatHistoryList] = useState([]);
  const [seatList, setSeatList] = useState([]);

  //   for multiple inputs
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    console.log(inputFields);
    console.log(theatreID, date)
  };

  const addFields = () => {
    let newField = { no: "", type: "", price: 0, staff: 0 };
    setInputFields([...inputFields, newField]);
    // console.log(inputFields);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  /////

  //  get required table
  const getSeats = () => {
    //get ALL seatdetails
    Axios.get("http://localhost:3001/seatdetails").then((response) => {
      setSeatDetailList(response.data);
    });
    // console.log(seatDetailList);

    // console.log(seatList.map(item => item.seat_id))
    // const seatIDs = seatList.map(item => item.seat_id)

    //get ALL, MOST RECENT seathistory
    Axios.get("http://localhost:3001/seathistory").then((response) => {
      setSeatHistoryList(response.data);
    });
    // console.log(seatHistoryList);

    //map both of these
    const temp = seatDetailList.map((item, index) => {
      return {
        seat_id: item.seat_id,
        seat_no: item.seat_no,
        theatre_id: item.theatre_id,
        seat_type: item.seat_type,
        alter_id: seatHistoryList[index].alter_id,
        date: seatHistoryList[index].date,
        price_before: seatHistoryList[index].price_before,
        price_after: seatHistoryList[index].price_after,
        staff_id: seatHistoryList[index].staff_id,
      };
    });
    setSeatList(temp);
    // console.log(seatList);
  };
  /////

  const addSeat = () => {
    inputFields.map((input, index) => {
      Axios.post("http://localhost:3001/add_seatdetails", {
        theatre_id: theatreID,
        seat_no: input["no"],
        seat_type: input["type"],
      });

      getSeats();
      let currentSeatID = Math.max(seatList.map((item) => item.seat_id));
      let currentPrice = Math.max(seatList.map((item) => item.seat_id));


      Axios.post("http://localhost:3001/add_seathistory", {
        seat_id: currentSeatID,
        date: date,
        price_before: seatList["price_after"],
        price_after: input["price"],
        staff_id: input["staff"],
      });
    });

    Axios.post("http://localhost:3001/add_seathistory", {});
    // .then(() => {
    //   setSeatList([
    //     ...seatList,
    //     {
    //       theatre_id: theatreID,
    //       seat_no: inputFields["no"],
    //       seat_type: inputFields["type"],
    //     },
    //   ]);
    // });
    console.log(seatDetailList);
  };

  const deleteSeat = (name) => {
    Axios.delete(`http://localhost:3001/delete_seat/${name}`);
  };

  return (
    <div className="seat">
      <h1>Seat Information</h1>
      <div className="seatInformation">
        <form action="">
          {/* theatre id , date*/}
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
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>

          {/* label */}
          <div className="mb-3">
            <label htmlFor="seat_no" className="form-label">
              Seat No.
            </label>
            <label htmlFor="seat_type" className="form-label">
              Seat Type
            </label>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <label htmlFor="staff_id" className="form-label">
              Staff ID
            </label>
          </div>

          {/* seat details */}
          {inputFields.map((input, index) => {
            return (
              <div className="mb-3" key={index}>
                <input
                  name="no"
                  type="text"
                  className="form-control multi-row"
                  placeholder="Enter seat no"
                  onChange={
                    (event) => handleFormChange(index, event)
                    // setInputFields({
                    //   ...inputFields,
                    //   [event.target.name]: event.target.value,
                    // });
                    // setName(event.target.value);
                  }
                />
                <input
                  name="type"
                  type="text"
                  className="form-control multi-row"
                  placeholder="Enter seat type"
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="price"
                  type="number"
                  className="form-control multi-row"
                  placeholder="Enter seat price"
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="staff"
                  type="number"
                  className="form-control multi-row"
                  placeholder="Enter staff id"
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
            Add More Seat
          </button>
          <br />
          <br />
          <button className="btn btn-success" onClick={addSeat}>
            Add Seat
          </button>
        </form>
      </div>
      <hr />
      <div className="seatButton">
        <button className="btn btn-primary" onClick={getSeats}>
          Refresh Seat List
        </button>
        <br />
        <br />
        {seatDetailList.map((val, key) => {
          return (
            <div className="seats card">
              <div className="card-body text-left">
                <p className="card-text">Seat ID: {val["seat_id"]}</p>
                <p className="card-text">Seat No: {val["seat_no"]}</p>
                <p className="card-text">Theatre ID: {val["theatre_id"]}</p>
                <p className="card-text">Seat Type: {val["seat_type"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  id={val["seat_id"]}
                  seatNO={val["seat_no"]}
                  theatreID={val["theatre_id"]}
                  type={val["seat_type"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteSeat(val["seat_id"]);
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

export default Seat;
