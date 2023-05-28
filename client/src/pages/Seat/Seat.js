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
    // console.log(inputFields);
    // console.log(theatreID, date);
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
  const getSeats = async () => {
    //get ALL seatdetails
    await Axios.get("http://localhost:3001/seatdetails").then((response) => {
      setSeatDetailList(response.data);
    });
    // console.log(seatDetailList);

    // console.log(seatList.map(item => item.seat_id))
    // const seatIDs = seatList.map(item => item.seat_id)

    //get ALL, MOST RECENT seathistory
    await Axios.get("http://localhost:3001/seathistory").then((response) => {
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
        price: seatHistoryList[index].price,
        staff_id: seatHistoryList[index].staff_id,
      };
    });
    setSeatList(temp);
    // console.log(seatList);
  };
  /////

  const addSeat = async () => {
    inputFields.map(async (input, index) => {
      const response = await Axios.post(
        "http://localhost:3001/add_seatdetails",
        {
          theatre_id: theatreID,
          seat_no: input["no"],
          seat_type: input["type"],
        }
      );

      const ID = response.data.insertId;
      // console.log(ID);

      await Axios.post("http://localhost:3001/add_seathistory", {
        seat_id: ID,
        date: date,
        price: input["price"],
        staff_id: input["staff"],
      });
    });

    // console.log(seatDetailList);
  };

  const deleteSeat = (id) => {
    Axios.delete(`http://localhost:3001/delete_seatdetails/${id}`);
  };

  return (
    <div className="pagecontainer">
      <div className="seat">
        <h1>Seat Information</h1>
        <br />
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
                    onChange={(event) => handleFormChange(index, event)}
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
            <button className="btn btn-success" type="button" onClick={addSeat}>
              Add Seat
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={getSeats}
            >
              Refresh Seat List
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
                <th scope="col">Seat ID</th>
                <th scope="col">Theatre ID</th>
                <th scope="col">Seat No</th>
                <th scope="col">Seat Type</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {seatList.map((val, key) => {
                return (
                  <tr>
                    <th>{val["seat_id"]}</th>
                    <th>{val["theatre_id"]}</th>
                    <th>{val["seat_no"]}</th>
                    <th>{val["seat_type"]}</th>
                    <th>{val["price"]}</th>
                    <th>
                      <UpdateButton
                        id={val["seat_id"]}
                        theatreID={val["theatre_id"]}
                        seatNO={val["seat_no"]}
                        type={val["seat_type"]}
                        price={val["price"]}
                      />
                    </th>
                    <th>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteSeat(val["seat_id"]);
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

export default Seat;
