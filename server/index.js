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
    "INSERT INTO customer \
    (customer_fname, customer_lname, customer_email, customer_tel, \
      customer_citizen_id, customer_address, customer_gender, customer_DOB, \
      type_name) VALUES (?,?,?,?,?,?,?,?,?)",
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
    [
      fname,
      lname,
      position,
      salary,
      branchID,
      email,
      tel,
      citizenID,
      address,
      gender,
      DOB,
    ],
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
    [
      fname,
      lname,
      position,
      salary,
      branchID,
      email,
      tel,
      citizenID,
      address,
      gender,
      DOB,
      id,
    ],
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
//BRANCH////////////////////////////////////////////////////////////////////////

//THEATRE///////////////////////////////////////////////////////////////////////
app.get("/theatre", (req, res) => {
  db.query("SELECT * FROM theatre", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_theatre", (req, res) => {
  const theatre_no = req.body.theatre_no;
  const branch_id = req.body.branch_id;
  const capacity = req.body.capacity;
  const type = req.body.theatre_type;
  console.log(res);

  db.query(
    "INSERT INTO theatre (theatre_no, branch_id, capacity, theatre_type) VALUES (?,?,?,?)",
    [theatre_no, branch_id, capacity, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/edit_theatre", (req, res) => {
  const id = req.body.theatre_id;
  const theatre_no = req.body.theatre_no;
  const branch_id = req.body.branch_id;
  const capacity = req.body.capacity;
  const type = req.body.theatre_type;

  db.query(
    "UPDATE theatre SET theatre_no = ?, branch_id = ?, capacity = ?, theatre_type = ? WHERE theatre_id = ?",
    [theatre_no, branch_id, capacity, type, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_theatre/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM theatre WHERE theatre_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//THEATRE///////////////////////////////////////////////////////////////////////

//MEMTYPE///////////////////////////////////////////////////////////////////////
app.get("/memtype", (req, res) => {
  db.query("SELECT * FROM membertype", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_memtype", (req, res) => {
  const name = req.body.type_name;
  const price = req.body.discount_price;
  console.log(res);

  db.query(
    "INSERT INTO membertype (type_name, discount_price) VALUES (?,?)",
    [name, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/edit_memtype/:old_name", (req, res) => {
  const old_name = req.params.old_name;
  const name = req.body.type_name;
  const price = req.body.discount_price;

  db.query(
    "UPDATE membertype SET type_name = ?, discount_price = ? WHERE type_name = ?",
    [name, price, old_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_memtype/:name", (req, res) => {
  const name = req.params.name;
  db.query(
    "DELETE FROM membertype WHERE type_name = ?",
    name,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//MEMTYPE///////////////////////////////////////////////////////////////////////

//SEAT DETAILS//////////////////////////////////////////////////////////////////
// get
app.get("/seatdetails", (req, res) => {
  db.query("SELECT * FROM seatdetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/seathistory", (req, res) => {
  db.query(
    "SELECT t1.* FROM seatpricehistory t1 \
    JOIN (SELECT seat_id, MAX(date) AS max_date \
    FROM seatpricehistory GROUP BY seat_id) t2 ON t1.seat_id = t2.seat_id \
    AND t1.date = t2.max_date ORDER BY seat_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//add
app.post("/add_seatdetails", (req, res) => {
  const seatNO = req.body.seat_no;
  const theatreID = req.body.theatre_id;
  const type = req.body.seat_type;

  //insert as a new seat if it is not already present
  db.query(
    "INSERT INTO seatdetails (seat_no, theatre_id, seat_type) VALUES (?,?,?)",
    [seatNO, theatreID, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_seathistory", (req, res) => {
  const seatID = req.body.seat_id;
  const date = req.body.date;
  const price = req.body.price;
  const staffID = req.body.staff_id;

  //insert only if before != after
  db.query(
    "INSERT INTO seatpricehistory (seat_id, date, price, staff_id) VALUES (?,?,?,?)",
    [seatID, date, price, staffID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//edit
app.put("/edit_seatdetails", (req, res) => {
  const id = req.body.seat_id;
  const seat_no = req.body.seat_no;
  const theatre_id = req.body.theatre_id;
  const type = req.body.seat_type;

  db.query(
    "UPDATE seatdetails SET seat_no = ?, theatre_id = ?, seat_type = ? WHERE seat_id = ?",
    [seat_no, theatre_id, type, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_seatdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM seatdetails WHERE seat_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//SEAT DETAILS//////////////////////////////////////////////////////////////////

//MOVIE REGISTRATION////////////////////////////////////////////////////////////
//get
app.get("/movielist", async (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/moviegenre", async (req, res) => {
  db.query("SELECT * FROM moviegenre", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add
app.post("/add_movies", async (req, res) => {
  const title = req.body.title;
  const crating = req.body.content_rating;
  const length = req.body.length;
  const srating = req.body.score_rating;
  const times_aired = req.body.times_aired;
  const movie_status = req.body.movie_status;
  // console.log(res);

  db.query(
    "INSERT INTO movies (title, content_rating, length, score_rating, times_aired, movie_status) VALUES (?,?,?,?,?,?)",
    [title, crating, length, srating, times_aired, movie_status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_moviegenre", async (req, res) => {
  const id = req.body.movie_id;
  const genre = req.body.genre;
  console.log(genre);

  db.query(
    "INSERT INTO moviegenre (movie_id, genre) VALUES (?,?)",
    [id, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/edit_movies", (req, res) => {
  const id = req.body.movie_id;
  const title = req.body.title;
  const crating = req.body.content_rating;
  const length = req.body.length;
  const srating = req.body.score_rating;

  db.query(
    "UPDATE movies SET title = ?, content_rating = ?, length = ?, score_rating = ? WHERE movie_id = ?",
    [title, crating, length, srating, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_movies/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM movies WHERE movie_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete_moviegenre/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM moviegenre WHERE movie_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//MOVIE REGISTRATION////////////////////////////////////////////////////////////

//MOVIE LICENSING///////////////////////////////////////////////////////////////
app.get("/movielicense", async (req, res) => {
  db.query("SELECT * FROM movielicense", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add_movielicense", async (req, res) => {
  const movID = req.body.movie_id;
  const licStart = req.body.license_start;
  const licEnd = req.body.license_end;
  const cost = req.body.movie_cost;

  db.query(
    "INSERT INTO movielicense (license_start, license_end, movie_id, movie_cost) VALUES (?,?,?,?)",
    [licStart, licEnd, movID, cost],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//adding license changes movie status
app.put("/edit_moviestatus", (req, res) => {
  const id = req.body.movie_id;
  const status = req.body.movie_status;

  db.query(
    "UPDATE movies SET movie_status = ? WHERE movie_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//edit movielicense
app.put("/edit_movielicense", (req, res) => {
  const id = req.body.movie_id;
  const movID = req.body.movie_id;
  const licS = req.body.license_start;
  const licE = req.body.license_end;
  const cost = req.body.movie_cost;

  db.query(
    "UPDATE movielicense SET movie_id = ?, license_start = ?, license_end = ?, movie_cost = ? WHERE license_id = ?",
    [movID, licS, licE, cost, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_movielicense/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM movielicense WHERE license_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//MOVIE LICENSING///////////////////////////////////////////////////////////////

//SHOWTIME//////////////////////////////////////////////////////////////////////
app.get("/showtime", async (req, res) => {
  db.query(
    "SELECT s.*, m.title AS title FROM showtime s, movies m WHERE s.movie_id = m.movie_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_showtime", async (req, res) => {
  const movID = req.body.movie_id;
  const theaID = req.body.theatre_id
  const showtime = req.body.show_time;
  const date = req.body.date;
  const lang = req.body.air_language
  const sub = req.body.subtitle
  const free = req.body.available_seats

  db.query(
    "INSERT INTO showtime (movie_id, theatre_id, show_time, date, air_language, subtitle, available_seats) VALUES (?,?,?,?,?,?,?)",
    [movID, theaID, showtime, date, lang, sub, free],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/edit_showtime", (req, res) => {
  const id = req.body.movie_id;
  const movID = req.body.movie_id;
  const theaID = req.body.theatre_id
  const showtime = req.body.show_time
  const date = req.body.date
  const lang = req.body.air_language
  const sub = req.body.subtitle
  const free = req.body.available_seats

  db.query(
    "UPDATE showtime SET \
    movie_id = ?, theatre_id = ?, show_time = ?, date = ?, air_language = ?, \
    subtitle = ?, available_seats = ? WHERE showtime_id = ?",
    [movID, theaID, showtime, date, lang, sub, free, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_showtime/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM showtime WHERE showtime_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//SHOWTIME//////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
