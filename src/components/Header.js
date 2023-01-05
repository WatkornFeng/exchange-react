import "./Header.css";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  const [navClick, setNavClick] = useState(false);
  const handleClickMobile = () => {
    setNavClick(!navClick);
  };
  const [status, setStatus] = useState("notloggin");

  const email = localStorage.getItem("email");
  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email !== null && token !== null) {
      setStatus("loggin");
    } else {
      setStatus("notloggin");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setStatus("notloggin");
    window.location = "/";
  };
  return (
    <>
      <nav>
        <Link id="logo" to="/">
          ExChange.F
        </Link>
        <div id="mobile" onClick={handleClickMobile}>
          <i
            className={navClick === false ? "fas fa-bars" : "fa-solid fa-xmark"}
          ></i>
        </div>

        <ul
          id="navlist"
          className={navClick === false ? "#navlist" : "#navlist active"}
        >
          <li>
            <NavLink
              className={({ isActive }) =>
                "#navlist" + (isActive ? " activated" : "")
              }
              to="/"
            >
              Price
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "#navlist" + (isActive ? " activated" : "")
              }
              to="/favorites"
            >
              My Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "#navlist" + (isActive ? " activated" : "")
              }
              to="/transaction"
            >
              Transaction
            </NavLink>
          </li>

          <Link to="/login">
            <button className={status === "notloggin" ? "log" : "notlog"}>
              Login
            </button>
          </Link>
          <div>
            <p id="avatar" className={status === "loggin" ? "log" : "notlog"}>
              {email}
            </p>
            <button
              className={status === "loggin" ? "log" : "notlog"}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </ul>
      </nav>
    </>
  );
}
