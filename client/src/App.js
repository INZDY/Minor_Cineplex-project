import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Customer from "./pages/Customer/Customer.js";
import Staff from './pages/Staff/Staff.js'
import Branch from "./pages/Branch/Branch.js";
import Theatre from "./pages/Theatre/Theatre.js";
import Memtype from "./pages/MemberType/Memtype.js";
import Seat from "./pages/Seat/Seat.js";
import MovRegis from "./pages/MovRegis/MovRegis";
import MovLicen from "./pages/MovLicen/MovLicen";
import Showtime from "./pages/Showtime/Showtime";
import Reservation from "./pages/Reservation/Reservation";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/memtype" element={<Memtype />} />
          <Route path="/seat" element={<Seat />} />
          <Route path="/movies" element={<MovRegis />} />
          <Route path="/movielicense" element={<MovLicen />} />
          <Route path="/showtime" element={<Showtime />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
