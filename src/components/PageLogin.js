import { Link } from "react-router-dom";
import "./PageLogin.css";
import { useState } from "react";

export default function PageLogin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userLog, setUserLog] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    const url = "http://localhost:3001/login";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status !== "bad") {
          alert("login success");
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.mail);
          window.location = "/";
        } else {
          setUserLog(data.status);
        }
      });
  };

  return (
    <>
      <div className="login">
        <div className="center">
          <h2 className="logo">Exchange.F</h2>
          <h2 className="head">LOGIN</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="user"
              placeholder="  Email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <div id="blind">
              <input
                type="password"
                className="pass"
                placeholder="  Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <span className={userLog === "bad" ? "yes" : "no"}>
              Email or Password are not correct
            </span>

            <button className="btn-sign">LOGIN</button>

            <Link to="/create" className="acc">
              Create account?{" "}
            </Link>
            <p>- </p>
            <button className="btn-google fade" disabled={true}>
              Sign in with <i className="fa-brands fa-google"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
