import React from "react";
import { useState } from "react";
import Axios from "axios";
import UpdateButton from "./EditMemtype";

function Memtype() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [memtypeList, setMemtypeList] = useState([]);

  const getMemtypes = () => {
    Axios.get("http://localhost:3001/memtype").then((response) => {
      setMemtypeList(response.data);
    });
    console.log(memtypeList);
  };

  const addMemtype = () => {
    Axios.post("http://localhost:3001/add_memtype", {
      type_name: name,
      discount_price: price,
    }).then(() => {
      setMemtypeList([
        ...memtypeList,
        {
          type_name: name,
          discount_price: price,
        },
      ]);
    });
    console.log(memtypeList);
  };

  const deleteMemtype = (name) => {
    Axios.delete(`http://localhost:3001/delete_memtype/${name}`);
  };

  return (
    <div className="memtype">
      <h1>Memtype Information</h1>
      <br />
      <div className="memtypeInformation">
        <form action="">

          <div className="mb-3">
            <label htmlFor="type_name" className="form-label">
              Type Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter type name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="discount_price" className="form-label">
              Discount Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter discount price"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>

          <button className="btn btn-success" onClick={addMemtype}>
            Add Memtype
          </button>
        </form>
      </div>
      <hr />
      <div className="memtypeButton">
        <button className="btn btn-primary" onClick={getMemtypes}>
          Refresh Memtype List
        </button>
        <br />
        <br />
        {memtypeList.map((val, key) => {
          return (
            <div className="memtypes card">
              <div className="card-body text-left">
                <p className="card-text">Type Name: {val["type_name"]}</p>
                <p className="card-text">Discount Price: {val["discount_price"]}</p>
                <br />

                {/* UPDATE BUTTON */}
                <UpdateButton
                  name={val["type_name"]}
                  price={val["discount_price"]}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteMemtype(val["type_name"]);
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

export default Memtype;
