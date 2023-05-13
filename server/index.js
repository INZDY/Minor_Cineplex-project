const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Minor_Cineplex",
});

//CUSTOMER//////////////////////////////////////////////////////////////////////
app.get("/customer", (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_customer", (req, res) => {
  const fname = req.body.customer_fname;
  const lname = req.body.customer_lname;
  const email = req.body.customer_email;
  const tel = req.body.customer_tel;
  const citizenID = req.body.customer_citizen_id;
  const address = req.body.customer_address;
  const gender = req.body.customer_gender;
  const DOB = req.body.customer_DOB;
  const type = req.body.type_name;
  console.log(res);

  db.query(
    "INSERT INTO customer (customer_fname, customer_lname, customer_email, customer_tel, customer_citizen_id, customer_address, customer_gender, customer_DOB, type_name) VALUES (?,?,?,?,?,?,?,?,?)",
    [fname, lname, email, tel, citizenID, address, gender, DOB, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/edit_customer", (req, res) => {
  const id = req.body.customer_id;
  const fname = req.body.customer_fname;
  const lname = req.body.customer_lname;
  const email = req.body.customer_email;
  const tel = req.body.customer_tel;
  const citizenID = req.body.customer_citizen_id;
  const address = req.body.customer_address;
  const gender = req.body.customer_gender;
  const DOB = req.body.customer_DOB;
  const type = req.body.type_name;

  db.query(
    "UPDATE customer SET customer_fname = ?, customer_lname = ?, customer_email = ?, customer_tel = ?, customer_citizen_id = ?, customer_address = ?, customer_gender = ?, customer_DOB = ?, type_name = ? WHERE customer_id = ?",
    [fname, lname, email, tel, citizenID, address, gender, DOB, type, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_customer/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM customer WHERE customer_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//CUSTOMER//////////////////////////////////////////////////////////////////////

//STAFF/////////////////////////////////////////////////////////////////////////
app.get("/staff", (req, res) => {
  db.query("SELECT * FROM staff", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_staff", (req, res) => {
  const fname = req.body.staff_fname;
  const lname = req.body.staff_lname;
  const position = req.body.position;
  const salary = req.body.salary;
  const branchID = req.body.branch_id;
  const email = req.body.staff_email;
  const tel = req.body.staff_tel;
  const citizenID = req.body.staff_citizen_id;
  const address = req.body.staff_address;
  const gender = req.body.staff_gender;
  const DOB = req.body.staff_DOB;
  console.log(res);

  db.query(
    "INSERT INTO staff (staff_fname, staff_lname, position, salary, branch_id, staff_email, staff_tel, staff_citizen_id, staff_address, staff_gender, staff_DOB) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [fname, lname, position, salary, branchID, email, tel, citizenID, address, gender, DOB],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/edit_staff", (req, res) => {
  const id = req.body.staff_id;
  const fname = req.body.staff_fname;
  const lname = req.body.staff_lname;
  const position = req.body.position;
  const salary = req.body.salary;
  const branchID = req.body.branch_id;
  const email = req.body.staff_email;
  const tel = req.body.staff_tel;
  const citizenID = req.body.staff_citizen_id;
  const address = req.body.staff_address;
  const gender = req.body.staff_gender;
  const DOB = req.body.staff_DOB;

  db.query(
    "UPDATE staff SET staff_fname = ?, staff_lname = ?, position = ?, salary = ?, branch_id = ?, staff_email = ?, staff_tel = ?, staff_citizen_id = ?, staff_address = ?, staff_gender = ?, staff_DOB = ? WHERE staff_id = ?",
    [fname, lname, position, salary, branchID, email, tel, citizenID, address, gender, DOB, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_staff/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM staff WHERE staff_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//STAFF/////////////////////////////////////////////////////////////////////////

//BRANCH////////////////////////////////////////////////////////////////////////
app.get("/branch", (req, res) => {
  db.query("SELECT * FROM branch", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_branch", (req, res) => {
  const name = req.body.branch_name;
  const email = req.body.branch_email;
  const tel = req.body.branch_tel;
  const address = req.body.address;
  console.log(res);

  db.query(
    "INSERT INTO branch (branch_name, address, branch_tel, branch_email) VALUES (?,?,?,?)",
    [name, address, tel, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/edit_branch", (req, res) => {
  const id = req.body.branch_id;
  const name = req.body.branch_name;
  const email = req.body.branch_email;
  const tel = req.body.branch_tel;
  const address = req.body.address;

  db.query(
    "UPDATE branch SET branch_name = ?, address = ?, branch_tel = ?, branch_email = ? WHERE branch_id = ?",
    [name, address, tel, email, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_branch/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM branch WHERE branch_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//BRANCH/////////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
