import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ onSearch }) {
  const token = localStorage.getItem("access");

  function submitHandler(e) {
    e.preventDefault();
    const text = e.target.search.value;
    onSearch(text);
  }

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  }

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">MovieApp</Link>

        <div className="header__right">
          <form onSubmit={submitHandler}>
            <input
              name="search"
              type="text"
              className="header__search"
              placeholder="Поиск..."
            />
          </form>

          {token && (
            <>
              <Link to="/profile" className="header__link">
                Профиль
              </Link>
              <button className="header__link" onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
