import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Movie Explorer</h3>

        <p className="footer-text">
          Educational full-stack project for SPECTR Academy
        </p>

        <div className="footer-links">
          <a href="!#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="!#" target="_blank" rel="noreferrer">Facebook</a>
          <a href="!#" target="_blank" rel="noreferrer">GitHub</a>
        </div>

        <div className="footer-watchlist">
          <Link to="/watchlist" className="watchlist-button">
            My Watchlist
          </Link>
        </div>

        <p className="footer-copy">
          © 2026 Movie Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

