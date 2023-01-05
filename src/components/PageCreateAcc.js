import { useState } from "react";
import { Link } from "react-router-dom";
import "./PageCreateAcc.css";

export default function PageCreateAcc() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [invalidEmail, setInvalidEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pass: pass }),
    };
    const url = "http://localhost:3001/register";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status !== "bad") {
          //console.log("ok");
          alert("Create Account Success");
          window.location = "/login";
        } else {
          setInvalidEmail(data.status);
        }
      });
  };
  return (
    <>
      <div className="login">
        <div className="center">
          <h2 className="logo">Exchange.F</h2>
          <h2 className="head">Create Account</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="user"
              placeholder=" Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={invalidEmail === "bad" ? "y" : "n"}>
              This Email was used! Please try again.
            </span>
            <input
              type="password"
              className="pass"
              placeholder="Password"
              required
              onChange={(e) => setPass(e.target.value)}
            />

            <button className="btn-sign">Create Account</button>

            <Link to="/login">
              <button className="btn-sign">Back</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
