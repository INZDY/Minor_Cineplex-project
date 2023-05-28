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

app.get("/theatreseatcount/:theatre_id", (req, res) => {
  const theaID = req.params.theatre_id;
  db.query(
    "SELECT t.capacity, COUNT(*) AS count \
  FROM theatre t, seatdetails s \
  WHERE t.theatre_id = ? AND s.theatre_id = ?",
    [theaID, theaID],
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
  const theaID = req.body.theatre_id;
  const showtime = req.body.show_time;
  const date = req.body.date;
  const lang = req.body.air_language;
  const sub = req.body.subtitle;
  const free = req.body.available_seats;

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
  const theaID = req.body.theatre_id;
  const showtime = req.body.show_time;
  const date = req.body.date;
  const lang = req.body.air_language;
  const sub = req.body.subtitle;
  const free = req.body.available_seats;

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

app.put("/edit_timesaired", (req, res) => {
  const id = req.body.movie_id;
  const times = req.body.times_aired;

  db.query(
    "UPDATE movies SET times_aired = ? WHERE movie_id = ?",
    [times, id],
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
  db.query("DELETE FROM showtime WHERE showtime_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//SHOWTIME//////////////////////////////////////////////////////////////////////

//RESERVATION///////////////////////////////////////////////////////////////////
//get
app.get("/reservation", async (req, res) => {
  db.query(
    "SELECT r.*, sh.theatre_id FROM \
    reservation r, showtime sh WHERE r.showtime_id = sh.showtime_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/reservedseats", async (req, res) => {
  const query1 =
    "SELECT r.*, s.seat_no \
  FROM reservedseats r, seatdetails s, seatpricehistory sp WHERE r.seat_id = s.seat_id";

  const queryWithPrice =
    "SELECT r.*, s.seat_no, sp.price \
    FROM reservedseats r JOIN seatdetails s \
    ON r.seat_id = s.seat_id \
    JOIN( SELECT sp.* FROM seatpricehistory sp \
    JOIN( SELECT seat_id, MAX(DATE) AS max_date \
    FROM seatpricehistory GROUP BY seat_id ) AS t2 \
    ON sp.seat_id = t2.seat_id AND sp.date = t2.max_date ) AS sp \
    ON r.seat_id = sp.seat_id";

  db.query(queryWithPrice, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add
app.post("/add_reservation", async (req, res) => {
  const date = req.body.date;
  const cusID = req.body.customer_id;
  const showID = req.body.showtime_id;
  const totalp = req.body.total_price;

  db.query(
    "INSERT INTO reservation (date, customer_id, showtime_id, total_price) VALUES (?,?,?,?)",
    [date, cusID, showID, totalp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_reservedseats", async (req, res) => {
  const resID = req.body.reserve_id;
  const seatID = req.body.seat_id;

  db.query(
    "INSERT INTO reservedseats (reserve_id, seat_id) VALUES (?,?)",
    [resID, seatID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//updates
app.put("/edit_reserveprice", (req, res) => {
  const id = req.body.reserve_id;
  const price = req.body.price;

  db.query(
    "UPDATE reservation SET total_price = ? WHERE reserve_id = ?",
    [price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/edit_reservation", (req, res) => {
  const id = req.body.reserve_id;
  const date = req.body.date;
  const cusID = req.body.customer_id;
  const showID = req.body.showtime_id;

  db.query(
    "UPDATE reservation SET date = ?, customer_id = ?, showtime_id = ? WHERE reserve_id = ?",
    [date, cusID, showID, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//delete
app.delete("/delete_reservation/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM reservation WHERE reserve_id = ?",
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

app.delete("/delete_reservedseats/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM reservedseats WHERE reserve_id = ?",
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
//RESERVATION///////////////////////////////////////////////////////////////////

//REPORTS///////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AanlysisAgerange

app.get("/AnalysisAgerange/:branch/:month", async (req, res) => {
  const branch = req.params.branch;
  const month = req.params.month;
  if (branch == "all") {
    if (month == "all") {
      ////////// All branch All month
      db.query(
        " \
        SELECT s2.`Age range`, s2.genre, s2.amount, branch_name\
        FROM (\
          SELECT s1.`Age range`, s1.genre, s1.amount,\
            ROW_NUMBER() OVER (PARTITION BY s1.`Age range` ORDER BY s1.amount DESC) AS row_num, branch_name\
          FROM (\
            SELECT `range` AS `Age range`, genre, SUM(price) AS amount, branch_name\
            FROM (\
              SELECT CASE\
                WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                ELSE '60+' END AS `range`, genre, price, reserved_id, branch_name\
              FROM (\
                SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, mg.genre AS genre,\
                  r.total_price AS price, r.reserve_id AS reserved_id, b.branch_name AS branch_name\
                FROM customer c\
                JOIN reservation r ON c.customer_id = r.customer_id\
                JOIN showtime s ON r.showtime_id = s.showtime_id\
                JOIN movies m ON s.movie_id = m.movie_id\
                JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                JOIN theatre t ON s.theatre_id = t.theatre_id\
                JOIN branch b ON t.branch_id = b.branch_id\
              ) AS Age\
            ) AS `range`\
            GROUP BY `range`, genre\
          ) AS s1\
        ) AS s2\
      WHERE s2.row_num = 1\
      ORDER BY CASE WHEN s2.`Age range` = '5-10' THEN 1 ELSE s2.`Age range` END",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      ////////// All branch Some month
      db.query(
        " \
        SELECT s2.`Age range`, s2.genre, s2.amount, branch_name\
        FROM (\
          SELECT s1.`Age range`, s1.genre, s1.amount,\
            ROW_NUMBER() OVER (PARTITION BY s1.`Age range` ORDER BY s1.amount DESC) AS row_num, branch_name\
          FROM (\
            SELECT `range` AS `Age range`, genre, SUM(price) AS amount, branch_name\
            FROM (\
              SELECT CASE\
                WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                ELSE '60+' END AS `range`, genre, price, reserved_id, branch_name\
              FROM (\
                SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, mg.genre AS genre,\
                  r.total_price AS price, r.reserve_id AS reserved_id, b.branch_name AS branch_name\
                FROM customer c\
                JOIN reservation r ON c.customer_id = r.customer_id\
                JOIN showtime s ON r.showtime_id = s.showtime_id\
                JOIN movies m ON s.movie_id = m.movie_id\
                JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                JOIN theatre t ON s.theatre_id = t.theatre_id\
                JOIN branch b ON t.branch_id = b.branch_id\
                WHERE r.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y') AND r.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
              ) AS Age\
            ) AS `range`\
            GROUP BY `range`, genre\
          ) AS s1\
        ) AS s2\
      WHERE s2.row_num = 1\
      ORDER BY CASE WHEN s2.`Age range` = '5-10' THEN 1 ELSE s2.`Age range` END",
        [month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  } else {
    ////////// Some branch All month
    if (month == "all") {
      db.query(
        " \
      SELECT s2.`Age range`, s2.genre, s2.amount, branch_name\
      FROM (\
        SELECT s1.`Age range`, s1.genre, s1.amount,\
          ROW_NUMBER() OVER (PARTITION BY s1.`Age range` ORDER BY s1.amount DESC) AS row_num, branch_name\
        FROM (\
          SELECT `range` AS `Age range`, genre, SUM(price) AS amount, branch_name\
          FROM (\
            SELECT CASE\
                     WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                     WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                     WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                     WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                     WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                     ELSE '60+' END AS `range`, genre, price, reserved_id, branch_name\
            FROM (\
              SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, mg.genre AS genre,\
                     r.total_price AS price, r.reserve_id AS reserved_id, b.branch_name AS branch_name\
              FROM customer c\
              JOIN reservation r ON c.customer_id = r.customer_id\
              JOIN showtime s ON r.showtime_id = s.showtime_id\
              JOIN movies m ON s.movie_id = m.movie_id\
              JOIN moviegenre mg ON m.movie_id = mg.movie_id\
              JOIN theatre t ON s.theatre_id = t.theatre_id\
              JOIN branch b ON t.branch_id = b.branch_id\
              WHERE t.branch_id = ?\
            ) AS Age\
          ) AS `range`\
          GROUP BY `range`, genre\
            \
        ) AS s1\
      ) AS s2\
      \
      WHERE s2.row_num = 1\
      ORDER BY CASE WHEN s2.`Age range` = '5-10' THEN 1 ELSE s2.`Age range` END\
      ",
        branch,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      ////////// Some branch Some month
      db.query(
        " \
      SELECT s2.`Age range`, s2.genre, s2.amount, branch_name\
      FROM (\
        SELECT s1.`Age range`, s1.genre, s1.amount,\
          ROW_NUMBER() OVER (PARTITION BY s1.`Age range` ORDER BY s1.amount DESC) AS row_num, branch_name\
        FROM (\
          SELECT `range` AS `Age range`, genre, SUM(price) AS amount, branch_name\
          FROM (\
            SELECT CASE\
                     WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                     WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                     WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                     WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                     WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                     ELSE '60+' END AS `range`, genre, price, reserved_id, branch_name\
            FROM (\
              SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, mg.genre AS genre,\
                     r.total_price AS price, r.reserve_id AS reserved_id, b.branch_name AS branch_name\
              FROM customer c\
              JOIN reservation r ON c.customer_id = r.customer_id\
              JOIN showtime s ON r.showtime_id = s.showtime_id\
              JOIN movies m ON s.movie_id = m.movie_id\
              JOIN moviegenre mg ON m.movie_id = mg.movie_id\
              JOIN theatre t ON s.theatre_id = t.theatre_id\
              JOIN branch b ON t.branch_id = b.branch_id\
              WHERE t.branch_id = ? AND r.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M %Y') AND r.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M %Y'))\
            ) AS Age\
          ) AS `range`\
          GROUP BY `range`, genre\
            \
        ) AS s1\
      ) AS s2\
      \
      WHERE s2.row_num = 1\
      ORDER BY CASE WHEN s2.`Age range` = '5-10' THEN 1 ELSE s2.`Age range` END\
      ",
        [branch, month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AanlysisShowtime

app.get("/AnalysisShowtime/:branch/:month", async (req, res) => {
  const branch = req.params.branch;
  const month = req.params.month;
  if (branch == "all") {
    if (month == "all") {
      ////////// All branch All month
      db.query(
        " SELECT Showtime, Amount, `Top Age Range`,branch_name\
        FROM ( SELECT Showtime, SUM(Amount) AS Amount , CASE WHEN row_num2=1 THEN `Age range` END AS `Top Age range`,branch_name\
        FROM( SELECT Showtime, Amount , `Age range`,  ROW_NUMBER() OVER (PARTITION BY Showtime ORDER BY Amount DESC) AS row_num2,branch_name\
        FROM ( SELECT Showtime, `Age range`, SUM(price) AS Amount ,branch_name\
        FROM ( SELECT Showtime, price,`range` AS `Age range`, ROW_NUMBER() OVER (PARTITION BY re_id ORDER BY price DESC) AS row_num1,branch_name\
        FROM (SELECT CASE\
                             WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                             WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                             WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                             WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                             WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                             ELSE '60+' END AS `range`,\
                    CASE\
                          WHEN showtime BETWEEN CAST('09:00:00' AS TIME) AND CAST('12:00:00' AS TIME) THEN 'Morning'\
                            WHEN showtime BETWEEN CAST('12:00:01' AS TIME) AND CAST('16:00:00' AS TIME) THEN 'Afternoon'\
                            WHEN showtime BETWEEN CAST('16:00:01' AS TIME) AND CAST('19:00:00' AS TIME) THEN 'Evening'\
                            WHEN showtime BETWEEN CAST('19:00:01' AS TIME) AND CAST('22:30:00' AS TIME) THEN 'Night'\
                            ELSE 'Other' END AS Showtime, price , re_id,branch_name\
                    FROM (\
                      SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, r.total_price AS price, s.show_time AS showtime, r.reserve_id AS re_id,b.branch_name AS branch_name\
                      FROM customer c\
                      JOIN reservation r ON c.customer_id = r.customer_id\
                      JOIN showtime s ON r.showtime_id = s.showtime_id\
                      JOIN movies m ON s.movie_id = m.movie_id\
                      JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                      JOIN theatre t ON s.theatre_id = t.theatre_id\
                    JOIN branch b ON t.branch_id = b.branch_id\
                    ) AS age\
                  ) AS `range`\
                ) s1\
                WHERE row_num1 = 1\
                GROUP BY Showtime,`Age range`\
         ) s2  \
         ) s3\
        GROUP BY Showtime\
            ) s4\
        ORDER BY CASE WHEN Showtime='Morning' THEN 1 WHEN Showtime='Afternoon' THEN 2  WHEN Showtime='Evening' THEN 3 WHEN Showtime='Night' THEN 4 WHEN Showtime='Other' THEN 5 END              \
        ",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      ////////// All branch Some month
      db.query(
        " SELECT Showtime, Amount, `Top Age Range`,branch_name\
        FROM ( SELECT Showtime, SUM(Amount) AS Amount , CASE WHEN row_num2=1 THEN `Age range` END AS `Top Age range`,branch_name\
        FROM( SELECT Showtime, Amount , `Age range`,  ROW_NUMBER() OVER (PARTITION BY Showtime ORDER BY Amount DESC) AS row_num2,branch_name\
        FROM ( SELECT Showtime, `Age range`, SUM(price) AS Amount ,branch_name\
        FROM ( SELECT Showtime, price,`range` AS `Age range`, ROW_NUMBER() OVER (PARTITION BY re_id ORDER BY price DESC) AS row_num1,branch_name\
        FROM (SELECT CASE\
                             WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                             WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                             WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                             WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                             WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                             ELSE '60+' END AS `range`,\
                    CASE\
                          WHEN showtime BETWEEN CAST('09:00:00' AS TIME) AND CAST('12:00:00' AS TIME) THEN 'Morning'\
                            WHEN showtime BETWEEN CAST('12:00:01' AS TIME) AND CAST('16:00:00' AS TIME) THEN 'Afternoon'\
                            WHEN showtime BETWEEN CAST('16:00:01' AS TIME) AND CAST('19:00:00' AS TIME) THEN 'Evening'\
                            WHEN showtime BETWEEN CAST('19:00:01' AS TIME) AND CAST('22:30:00' AS TIME) THEN 'Night'\
                            ELSE 'Other' END AS Showtime, price , re_id,branch_name\
                    FROM (\
                      SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, r.total_price AS price, s.show_time AS showtime, r.reserve_id AS re_id,b.branch_name AS branch_name\
                      FROM customer c\
                      JOIN reservation r ON c.customer_id = r.customer_id\
                      JOIN showtime s ON r.showtime_id = s.showtime_id\
                      JOIN movies m ON s.movie_id = m.movie_id\
                      JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                      JOIN theatre t ON s.theatre_id = t.theatre_id\
                    JOIN branch b ON t.branch_id = b.branch_id\
                      WHERE r.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y') AND r.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
                    ) AS age\
                  ) AS `range`\
                ) s1\
                WHERE row_num1 = 1\
                GROUP BY Showtime,`Age range`\
         ) s2  \
         ) s3\
        GROUP BY Showtime\
            ) s4\
        ORDER BY CASE WHEN Showtime='Morning' THEN 1 WHEN Showtime='Afternoon' THEN 2  WHEN Showtime='Evening' THEN 3 WHEN Showtime='Night' THEN 4 WHEN Showtime='Other' THEN 5 END\
              \
        ",
        [month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  } else {
    ////////// Some branch All month
    if (month == "all") {
      db.query(
        "SELECT Showtime, Amount, `Top Age Range`,branch_name\
        FROM ( SELECT Showtime, SUM(Amount) AS Amount , CASE WHEN row_num2=1 THEN `Age range` END AS `Top Age range`,branch_name\
        FROM( SELECT Showtime, Amount , `Age range`,  ROW_NUMBER() OVER (PARTITION BY Showtime ORDER BY Amount DESC) AS row_num2,branch_name\
        FROM ( SELECT Showtime, `Age range`, SUM(price) AS Amount ,branch_name\
        FROM ( SELECT Showtime, price,`range` AS `Age range`, ROW_NUMBER() OVER (PARTITION BY re_id ORDER BY price DESC) AS row_num1,branch_name\
        FROM (SELECT CASE\
                             WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                             WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                             WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                             WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                             WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                             ELSE '60+' END AS `range`,\
                    CASE\
                          WHEN showtime BETWEEN CAST('09:00:00' AS TIME) AND CAST('12:00:00' AS TIME) THEN 'Morning'\
                            WHEN showtime BETWEEN CAST('12:00:01' AS TIME) AND CAST('16:00:00' AS TIME) THEN 'Afternoon'\
                            WHEN showtime BETWEEN CAST('16:00:01' AS TIME) AND CAST('19:00:00' AS TIME) THEN 'Evening'\
                            WHEN showtime BETWEEN CAST('19:00:01' AS TIME) AND CAST('22:30:00' AS TIME) THEN 'Night'\
                            ELSE 'Other' END AS Showtime, price , re_id,branch_name\
                    FROM (\
                      SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, r.total_price AS price, s.show_time AS showtime, r.reserve_id AS re_id,b.branch_name AS branch_name\
                      FROM customer c\
                      JOIN reservation r ON c.customer_id = r.customer_id\
                      JOIN showtime s ON r.showtime_id = s.showtime_id\
                      JOIN movies m ON s.movie_id = m.movie_id\
                      JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                      JOIN theatre t ON s.theatre_id = t.theatre_id\
                    JOIN branch b ON t.branch_id = b.branch_id\
                      WHERE t.branch_id = ?\
                    ) AS age\
                  ) AS `range`\
                ) s1\
                WHERE row_num1 = 1\
                GROUP BY Showtime,`Age range`\
         ) s2  \
         ) s3\
        GROUP BY Showtime\
            ) s4\
        ORDER BY CASE WHEN Showtime='Morning' THEN 1 WHEN Showtime='Afternoon' THEN 2  WHEN Showtime='Evening' THEN 3 WHEN Showtime='Night' THEN 4 WHEN Showtime='Other' THEN 5 END\
              \
         ",
        branch,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      ////////// Some branch Some month
      db.query(
        "SELECT Showtime, Amount, `Top Age Range`,branch_name\
        FROM ( SELECT Showtime, SUM(Amount) AS Amount , CASE WHEN row_num2=1 THEN `Age range` END AS `Top Age range`,branch_name\
        FROM( SELECT Showtime, Amount , `Age range`,  ROW_NUMBER() OVER (PARTITION BY Showtime ORDER BY Amount DESC) AS row_num2,branch_name\
        FROM ( SELECT Showtime, `Age range`, SUM(price) AS Amount ,branch_name\
        FROM ( SELECT Showtime, price,`range` AS `Age range`, ROW_NUMBER() OVER (PARTITION BY re_id ORDER BY price DESC) AS row_num1,branch_name\
        FROM (SELECT CASE\
                             WHEN Age BETWEEN 5 AND 10 THEN '5-10'\
                             WHEN Age BETWEEN 11 AND 15 THEN '11-15'\
                             WHEN Age BETWEEN 16 AND 22 THEN '16-22'\
                             WHEN Age BETWEEN 23 AND 45 THEN '23-45'\
                             WHEN Age BETWEEN 46 AND 60 THEN '46-60'\
                             ELSE '60+' END AS `range`,\
                    CASE\
                          WHEN showtime BETWEEN CAST('09:00:00' AS TIME) AND CAST('12:00:00' AS TIME) THEN 'Morning'\
                            WHEN showtime BETWEEN CAST('12:00:01' AS TIME) AND CAST('16:00:00' AS TIME) THEN 'Afternoon'\
                            WHEN showtime BETWEEN CAST('16:00:01' AS TIME) AND CAST('19:00:00' AS TIME) THEN 'Evening'\
                            WHEN showtime BETWEEN CAST('19:00:01' AS TIME) AND CAST('22:30:00' AS TIME) THEN 'Night'\
                            ELSE 'Other' END AS Showtime, price , re_id,branch_name\
                    FROM (\
                      SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), c.customer_DOB)), '%Y') + 0 AS age, r.total_price AS price, s.show_time AS showtime, r.reserve_id AS re_id,b.branch_name AS branch_name\
                      FROM customer c\
                      JOIN reservation r ON c.customer_id = r.customer_id\
                      JOIN showtime s ON r.showtime_id = s.showtime_id\
                      JOIN movies m ON s.movie_id = m.movie_id\
                      JOIN moviegenre mg ON m.movie_id = mg.movie_id\
                      JOIN theatre t ON s.theatre_id = t.theatre_id\
                    JOIN branch b ON t.branch_id = b.branch_id\
                      WHERE t.branch_id = ? AND r.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y') AND r.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
                    ) AS age\
                  ) AS `range`\
                ) s1\
                WHERE row_num1 = 1\
                GROUP BY Showtime,`Age range`\
         ) s2  \
         ) s3\
        GROUP BY Showtime\
            ) s4\
        ORDER BY CASE WHEN Showtime='Morning' THEN 1 WHEN Showtime='Afternoon' THEN 2  WHEN Showtime='Evening' THEN 3 WHEN Showtime='Night' THEN 4 WHEN Showtime='Other' THEN 5 END\
              \
         ",
        [branch, month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AanlysisSeatPop
app.get("/AnalysisSeatPop/:branch/:month", async (req, res) => {
  const branch = req.params.branch;
  const month = req.params.month;
  if (branch == "all") {
    if (month == "all") {
      db.query("", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      db.query(
        "SELECT\
        s1.seat_type,\
        s1.amount,\
        s2.amount_last_month,\
        (s1.amount - s2.amount_last_month) AS `Gain/Loss`,\
        ((s1.amount - s2.amount_last_month) / s2.amount_last_month) * 100 AS `Gain/Loss_percentage`,\
        branch.branch_name\
    FROM\
        (\
            SELECT DISTINCT\
                seatdetails.seat_type AS seat_type,\
                COUNT(*) AS amount,\
                branch.branch_id\
            FROM\
                reservedseats\
                INNER JOIN reservation ON reservation.reserve_id = reservedseats.reserve_id\
                INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
                INNER JOIN theatre ON theatre.theatre_id = seatdetails.theatre_id\
                INNER JOIN branch ON branch.branch_id = theatre.branch_id\
            WHERE\
                MONTH(reservation.date) = MONTH(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
                AND YEAR(reservation.date) = YEAR(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
            GROUP BY\
                seatdetails.seat_type, branch.branch_id\
        ) s1\
        JOIN (\
            SELECT DISTINCT\
                seatdetails.seat_type AS seat_type,\
                COUNT(*) AS amount_last_month,\
                branch.branch_id\
            FROM\
                reservedseats\
                INNER JOIN reservation ON reservation.reserve_id = reservedseats.reserve_id\
                INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
                INNER JOIN theatre ON theatre.theatre_id = seatdetails.theatre_id\
                INNER JOIN branch ON branch.branch_id = theatre.branch_id\
            WHERE\
                MONTH(reservation.date) = MONTH(DATE_SUB(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'), INTERVAL 1 MONTH))\
                AND YEAR(reservation.date) = YEAR(DATE_SUB(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'), INTERVAL 1 MONTH))\
            GROUP BY\
                seatdetails.seat_type, branch.branch_id\
        ) s2 ON s1.seat_type = s2.seat_type AND s1.branch_id = s2.branch_id\
        INNER JOIN branch ON branch.branch_id = s1.branch_id; ",
        [month, month, month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  } else {
    if (month == "all") {
      db.query("", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      db.query(
        "\
        SELECT\
        s1.seat_type,\
        s1.amount,\
        s2.amount_last_month,\
        (s1.amount - s2.amount_last_month) AS `Gain/Loss`,\
        ((s1.amount - s2.amount_last_month) / s2.amount_last_month) * 100 AS `Gain/Loss_percentage`,\
        branch.branch_name\
    FROM\
        (\
            SELECT DISTINCT\
                seatdetails.seat_type AS seat_type,\
                COUNT(*) AS amount,\
                branch.branch_id\
            FROM\
                reservedseats\
                INNER JOIN reservation ON reservation.reserve_id = reservedseats.reserve_id\
                INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
                INNER JOIN theatre ON theatre.theatre_id = seatdetails.theatre_id\
                INNER JOIN branch ON branch.branch_id = theatre.branch_id\
            WHERE\
                MONTH(reservation.date) = MONTH(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
                AND YEAR(reservation.date) = YEAR(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))\
                AND branch.branch_id = ?\
            GROUP BY\
                seatdetails.seat_type, branch.branch_id\
        ) s1\
        JOIN (\
            SELECT DISTINCT\
                seatdetails.seat_type AS seat_type,\
                COUNT(*) AS amount_last_month,\
                branch.branch_id\
            FROM\
                reservedseats\
                INNER JOIN reservation ON reservation.reserve_id = reservedseats.reserve_id\
                INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
                INNER JOIN theatre ON theatre.theatre_id = seatdetails.theatre_id\
                INNER JOIN branch ON branch.branch_id = theatre.branch_id\
            WHERE\
                MONTH(reservation.date) = MONTH(DATE_SUB(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'), INTERVAL 1 MONTH))\
                AND YEAR(reservation.date) = YEAR(DATE_SUB(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'), INTERVAL 1 MONTH))\
                AND branch.branch_id = ?\
            GROUP BY\
                seatdetails.seat_type, branch.branch_id\
        ) s2 ON s1.seat_type = s2.seat_type AND s1.branch_id = s2.branch_id\
        INNER JOIN branch ON branch.branch_id = s1.branch_id; ",
        [month, month, branch, month, month, branch],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AnalysisAiring

app.get("/AnalysisAiring/:branch/:month", async (req, res) => {
  const branch = req.params.branch;
  const month = req.params.month;
  if (branch == "all") {
    if (month == "all") {
      db.query(
        "SELECT DISTINCT movies.title, showtime.air_language, showtime.subtitle,\
          (SELECT SUM(reservation.total_price)\
           FROM reservation\
           WHERE reservation.showtime_id = showtime.showtime_id) AS amount ,branch.branch_name\
   FROM movies\
   INNER JOIN moviegenre ON moviegenre.movie_id = movies.movie_id\
   INNER JOIN showtime ON showtime.movie_id = movies.movie_id\
   INNER JOIN reservation ON reservation.showtime_id = showtime.showtime_id\
   INNER JOIN reservedseats ON reservedseats.reserve_id = reservation.reserve_id\
   INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
   INNER JOIN seatpricehistory ON seatpricehistory.seat_id = seatdetails.seat_id\
   INNER JOIN theatre ON theatre.theatre_id = showtime.theatre_id\
   INNER JOIN branch ON branch.branch_id = theatre.branch_id ",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      db.query(
        "SELECT DISTINCT movies.title, moviegenre.genre, showtime.air_language, showtime.subtitle,\
        (SELECT SUM(reservation.total_price)\
         FROM reservation\
         WHERE reservation.showtime_id = showtime.showtime_id AND reservation.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y') AND reservation.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))) AS amount ,branch.branch_name\
 FROM movies\
 INNER JOIN moviegenre ON moviegenre.movie_id = movies.movie_id\
 INNER JOIN showtime ON showtime.movie_id = movies.movie_id\
 INNER JOIN reservation ON reservation.showtime_id = showtime.showtime_id\
 INNER JOIN reservedseats ON reservedseats.reserve_id = reservation.reserve_id\
 INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
 INNER JOIN seatpricehistory ON seatpricehistory.seat_id = seatdetails.seat_id\
 INNER JOIN theatre ON theatre.theatre_id = showtime.theatre_id\
 INNER JOIN branch ON branch.branch_id = theatre.branch_id\
 \
 ",
        [month, month],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  } else {
    if (month == "all") {
      db.query(
        "SELECT DISTINCT movies.title, moviegenre.genre, showtime.air_language, showtime.subtitle,\
        (SELECT SUM(reservation.total_price)\
         FROM reservation\
         WHERE reservation.showtime_id = showtime.showtime_id) AS amount ,branch.branch_name\
 FROM movies\
 INNER JOIN moviegenre ON moviegenre.movie_id = movies.movie_id\
 INNER JOIN showtime ON showtime.movie_id = movies.movie_id\
 INNER JOIN reservation ON reservation.showtime_id = showtime.showtime_id\
 INNER JOIN reservedseats ON reservedseats.reserve_id = reservation.reserve_id\
 INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
 INNER JOIN seatpricehistory ON seatpricehistory.seat_id = seatdetails.seat_id\
 INNER JOIN theatre ON theatre.theatre_id = showtime.theatre_id\
 INNER JOIN branch ON branch.branch_id = theatre.branch_id\
 WHERE branch.branch_id = ?\
 ",
        branch,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      db.query(
        "SELECT DISTINCT movies.title, moviegenre.genre, showtime.air_language, showtime.subtitle,\
        (SELECT SUM(reservation.total_price)\
         FROM reservation\
         WHERE reservation.showtime_id = showtime.showtime_id AND reservation.Date >= STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y') AND reservation.Date <= LAST_DAY(STR_TO_DATE(CONCAT('01 ',?),'%d %M%Y'))) AS amount ,branch.branch_name\
 FROM movies\
 INNER JOIN moviegenre ON moviegenre.movie_id = movies.movie_id\
 INNER JOIN showtime ON showtime.movie_id = movies.movie_id\
 INNER JOIN reservation ON reservation.showtime_id = showtime.showtime_id\
 INNER JOIN reservedseats ON reservedseats.reserve_id = reservation.reserve_id\
 INNER JOIN seatdetails ON seatdetails.seat_id = reservedseats.seat_id\
 INNER JOIN seatpricehistory ON seatpricehistory.seat_id = seatdetails.seat_id\
 INNER JOIN theatre ON theatre.theatre_id = showtime.theatre_id\
 INNER JOIN branch ON branch.branch_id = theatre.branch_id\
 WHERE branch.branch_id = ?\
 ",
        [month, month, branch],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AanlysisRevenue
app.get("/AnalysisRevenue/:day1/:month1/:day2/:month2", async (req, res) => {
  const day1 = req.params.day1;
  const month1 = req.params.month1;
  const day2 = req.params.day2;
  const month2 = req.params.month2;

  db.query(
    "SELECT DISTINCT branch.branch_id AS Branch,movies.title AS Movie,\
   (SELECT SUM(reservation.total_price) FROM reservation WHERE reservation.showtime_id = showtime.showtime_id) AS Revenue,\
   (SELECT revenue - movielicense.movie_cost FROM movielicense WHERE movielicense.movie_id = movies.movie_id) AS Profit\
  FROM branch\
  INNER JOIN theatre ON theatre.branch_id = branch.branch_id\
  INNER JOIN showtime ON showtime.theatre_id = theatre.theatre_id\
  INNER JOIN movies ON movies.movie_id = showtime.movie_id\
  INNER JOIN reservation ON reservation.showtime_id = showtime.showtime_id\
  INNER JOIN movielicense ON movielicense.movie_id = movies.movie_id\
  WHERE reservation.date > STR_TO_DATE(CONCAT(?,?),'%d%M%Y') AND reservation.date < STR_TO_DATE(CONCAT(?,?),'%d%M%Y');",
    [day1, month1, day2, month2],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//REPORTS///////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
