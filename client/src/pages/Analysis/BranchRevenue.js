import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function () {
  const [TableList, setTableList] = React.useState([""]);
  const [Day1, setDay1] = React.useState("1");
  const [Month1, setMonth1] = React.useState("April2023");
  const [Day2, setDay2] = React.useState("1");
  const [Month2, setMonth2] = React.useState("April2023");

  useEffect(() => {
    const delay = setTimeout(() => {
      refresh(Day1, Month1, Day2, Month2);
    }, 300);
    return () => {
      clearTimeout(delay);
    };
  }, [Day1, Month1, Day2, Month2]);

  const Day1handler = (event) => {
    const input = event.target.value;
    setDay1(input);
  };
  const Month1handler = (event) => {
    const input = event.target.value;
    setMonth1(input);
  };
  const Day2handler = (event) => {
    const input = event.target.value;
    setDay2(input);
  };
  const Month2handler = (event) => {
    const input = event.target.value;
    setMonth2(input);
  };

  const refresh = (Day1, Month1) => {
    Axios.get(
      `http://localhost:3001/AnalysisRevenue/${Day1}/${Month1}/${Day2}/${Month2}`
    ).then((response) => {
      setTableList(response.data);
    });
  };

  return (
    <div className="pagecontainer">
      <div className="reports">
        {" "}
        {/* className should be change to something else .Punch*/}
        <h1>Branches' Revenue Analysis report</h1>
        <h4>Select Start Date</h4>
        <div className="mb-3">
          <select onChange={Day1handler}>
            {" "}
            {/*INSERT NEW DUMMY Day1_ID AND Month1 FILTER HERE */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select onChange={Month1handler}>
            {" "}
            {/*INSERT NEW DUMMY Day1_ID AND Month1 FILTER HERE */}
            <option value="April2023">April 2023</option>
            <option value="May2023">May 2023</option>
            <option value="June2023">June 2023</option>
            <option value="July2023">July 2023</option>
          </select>
        </div>
        <h4>Select End Date</h4>
        <div className="mb-3">
          <select onChange={Day2handler}>
            {" "}
            {/*INSERT NEW DUMMY Day1_ID AND Month1 FILTER HERE */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select onChange={Month2handler}>
            {" "}
            {/*INSERT NEW DUMMY Day1_ID AND Month1 FILTER HERE */}
            <option value="April2023">April 2023</option>
            <option value="May2023">May 2023</option>
            <option value="June2023">June 2023</option>
            <option value="July2023">July 2023</option>
          </select>
        </div>
      </div>
      <div className="analysistable">
        <table className="table">
          <thead>
            <tr className="row">
              <th className="col">
                {" "}
                <h3>Branch</h3>
              </th>
              <th className="col">
                {" "}
                <h3>Movie</h3>
              </th>
              <th className="col">
                {" "}
                <h4>Revenue</h4>
              </th>
              <th className="col">
                {" "}
                <h4>Profit </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {TableList.map((val, key) => {
              return (
                <tr className="row">
                  <th className="col">
                    <p>{val["Branch"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["Movie"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["Revenue"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["Profit"]}</p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
