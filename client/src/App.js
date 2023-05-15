import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Customer from "./pages/Customer/Customer.js";
import Staff from './pages/Staff/Staff.js'
import Branch from "./pages/Branch/Branch.js";
import Theatre from "./pages/Theatre/Theatre.js";
import Memtype from "./pages/MemberType/Memtype.js";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
