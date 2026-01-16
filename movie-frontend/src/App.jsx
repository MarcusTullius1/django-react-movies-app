import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

