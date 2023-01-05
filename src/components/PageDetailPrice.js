import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./PageDetail.css";
import { useEffect, useState } from "react";
import ModalBuy from "./ModalBuy";
export default function PageDetailPrice({ price }) {
  //////////////Authen//////////////////
  const [token, setToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = "https://ill-puce-lion-yoke.cyclic.app/authen";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status === "ok") {
          //console.log("veriify token ok");
          setToken(true);
        } else {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      });
  }, []);
  //////////////////////////////////////////////////////
  const { data } = price;
  const { priceId } = useParams();
  const detail = data?.data_detail.filter(
    (e) => e.currency_id === priceId.toUpperCase()
  );

  ///////////////////MODAL BUY-SELL///////////////////////

  return (
    <>
      <Header />
      {token !== false && token !== null ? (
        <>
          <div className="detail">
            <div className="item-box">
              <div className="item">{detail?.[0]?.currency_id}</div>
              <div className="item">{detail?.[0]?.currency_name_eng}</div>
              <div className="item">{detail?.[0]?.currency_name_th}</div>
              <div className="item">
                Weighted average interbank exchange rate :{" "}
                {detail?.[0]?.mid_rate}
              </div>
              <div className="items-2">
                <div className="item-buy">
                  Average buying rate : {detail?.[0]?.selling}
                  <button
                    className="btn-buy"
                    data-bs-target="#showForm"
                    data-bs-toggle="modal"
                  >
                    Buy
                  </button>
                </div>
                <div className="item-sell">
                  Average selling rate : {detail?.[0]?.buying_transfer}
                  <Link to="/favorites">
                    <button className="btn-sell">Sell</button>
                  </Link>
                </div>
                <div className="item-back">
                  <Link to="/">
                    <button className="btn-back">Back</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ModalBuy detail={detail} />
        </>
      ) : (
        <div className="black"></div>
      )}
    </>
  );
}
