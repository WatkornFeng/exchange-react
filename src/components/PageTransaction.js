import Header from "./Header";
import "./PageTransaction.css";
import { useEffect, useState } from "react";
export default function PageTransaction() {
  const [result, setResult] = useState([]);
  const [token, setToken] = useState(false);
  const [transaction, setTransaction] = useState([]);
  // console.log(result);
  ////////////Authen////////////////////////////

  useEffect(() => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = "http://localhost:3001/authen";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status === "ok") {
          setToken(true);
        } else {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      });
  }, []);
  ////////////get trans data////////////////////////////

  useEffect(() => {
    const email = localStorage.getItem("email");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const url = "http://localhost:3001/transaction";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => setTransaction(data));
  }, []);
  //////////////GET result//////////////////////

  useEffect(() => {
    const email = localStorage.getItem("email");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const url = "http://localhost:3001/result";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => setResult(data));
  }, []);
  return (
    <>
      <Header />
      {token !== null && token !== false ? (
        <>
          <div className="trans">
            <div className="table-responsive">
              <table
                className="table table-dark"
                style={{ color: "yellowgreen" }}
              >
                <thead>
                  <tr>
                    <th>
                      <i className="fa-solid fa-star"></i>
                    </th>
                    <th>Side</th>
                    <th>Units</th>
                    <th>Values(฿)</th>
                    <th>Date||Time</th>
                  </tr>
                </thead>
                {transaction?.map((e, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{e.currency_id}</td>
                        <td>{e.side}</td>
                        <td>
                          {e.amount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td>
                          {e.side === "BUY"
                            ? e.sum.toLocaleString()
                            : e.sum.toLocaleString()}
                        </td>
                        <td>{e.time}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="sum">
                Total Profit/Loss :
                {result[0]?.result > 0 ? (
                  <div style={{ color: "green" }}>
                    {result?.[0]?.result?.toLocaleString()}
                  </div>
                ) : (
                  <div style={{ color: "red" }}>
                    {result?.[0]?.result?.toLocaleString()}
                  </div>
                )}{" "}
                BATH
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="black"></div>
      )}
    </>
  );
}
/*
<div className="sum">
Total Profit/Loss :
{result[0]?.result > 0 ? (
  <div style={{ color: "green" }}>
    {result?.[0]?.result?.toLocaleString()}
  </div>
) : (
  <div style={{ color: "red" }}>
    {result?.[0]?.result?.toLocaleString()}
  </div>
)}{" "}
BATH
</div>*/
