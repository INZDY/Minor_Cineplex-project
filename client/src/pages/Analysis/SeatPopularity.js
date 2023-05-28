import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function () {
  const [TableList, setTableList] = React.useState([""]);
  const [Branch, setBranch] = React.useState("all");
  const [Month, setMonth] = React.useState("may2023");

  useEffect(() => {
    const delay = setTimeout(() => {
      refresh(Branch, Month);
    }, 300);
    return () => {
      clearTimeout(delay);
    };
  }, [Branch, Month]);

  const Branchhandler = (event) => {
    const input = event.target.value;
    setBranch(input);
  };
  const Monthhandler = (event) => {
    const input = event.target.value;
    setMonth(input);
  };

  const refresh = (Branch, Month) => {
    Axios.get(`http://localhost:3001/AnalysisSeatPop/${Branch}/${Month}`).then(
      (response) => {
        setTableList(response.data);
      }
    );
  };

  return (
    <>
      <div className="pagecontainer customer">
        {" "}
        {/* className should be change to something else .Punch*/}
        <h1>Seat popularity Analysis report</h1>
        {Branch === "all" ? (
          <h2>
            Branch name : All branch {Month === "all" ? ", All month" : ""}
          </h2>
        ) : (
          <h2>
            Branch name : {TableList[0].branch_name}{" "}
            {Month === "all" ? ", All month" : ""}
          </h2>
        )}
        <h4>Select Branch</h4>
        <div className="mb-3">
          <select onChange={Branchhandler}>
            {" "}
            {/*INSERT NEW DUMMY BRANCH_ID AND MONTH FILTER HERE */}
            <option value="all">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <h4>Select Month</h4>
        <div>
          <select onChange={Monthhandler}>
            {" "}
            {/*INSERT NEW DUMMY BRANCH_ID AND MONTH FILTER HERE */}
            <option value="may2023">May 2023</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr className="row">
              <th className="col">
                {" "}
                <h3>Seat Type</h3>
              </th>
              <th className="col">
                {" "}
                <h5>Amount (Thoundsand unit)</h5>
              </th>
              <th className="col">
                {" "}
                <h5>Last month amount (Thoundsand unit)</h5>
              </th>
              <th className="col">
                {" "}
                <h5>Gain/Loss (Amount)</h5>
              </th>
              <th className="col">
                {" "}
                <h5>Gain/Loss (Percentage)</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {TableList.map((val, key) => {
              return (
                <tr className="row">
                  <th className="col">
                    <p>{val["seat_type"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["amount"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["amount_last_month"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["Gain/Loss"]}</p>
                  </th>
                  <th className="col">
                    <p>{val["Gain/Loss_percentage"]}</p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
