import Header from "./Header";
import { useEffect, useState } from "react";
import ModalSell from "./ModalSell";
import ModalClose from "./ModalClose";
import "./PageFavorites.css";
export default function PageFavorites({ price }) {
  const [fav, setfav] = useState([]);
  const [sell, setSell] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  /////////////GET current selling prices////////////////
  const dataPrices = price?.data?.data_detail;
  const ID = fav?.map((e) => {
    return e.currency_id;
  });

  const sellPrices = dataPrices?.filter((element) => {
    return ID?.includes(element.currency_id);
  });

  ///////////////////****Check Token *******///////////////////////////

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
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          window.location = "/login";
        }
      });
  }, []);
  ///////////////////****Get Favorites DATA *******///////////////////////////
  useEffect(() => {
    const email = localStorage.getItem("email");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const url = "https://ill-puce-lion-yoke.cyclic.app/port";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => setfav(data));
  }, []);
  ///////////// Sell click ///////////////////
  const handleSell = (e) => {
    const value = e.target.value;
    const arr = value.split(",");
    setSell(arr);
  };
  const handleDelete = (e) => {
    setIdDelete(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="fav">
        <div className="price">
          {fav?.map((e, index) => {
            return sellPrices?.map((x) => {
              if (x.currency_id === e.currency_id) {
                return (
                  <>
                    <div className="flex-price" key={index}>
                      <h1>{e.currency_id}</h1>
                      <h6>{e.currency_name_eng}</h6>
                      <h5 style={{ color: "#BF40BF", fontSize: 20 }}>
                        You Have :{" "}
                        {e.buy_amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        {e.currency_id} <br></br>
                        VALUE :{" "}
                        {e.buy_amount === 0
                          ? 0
                          : (Math.round(e.buy_sum * 1000) / 1000)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        ฿
                      </h5>

                      <h4 style={{ color: "yellow", fontSize: 20 }}>
                        Market VALUE :{" "}
                        {(
                          Math.round(e.buy_amount * x.buying_transfer * 1000) /
                          1000
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ฿
                      </h4>
                      <div style={{ color: "white", fontSize: 20 }}>
                        Realized P/L :{" "}
                        {Math.round(e.buy_sum * 1000) / 1000 -
                          Math.round(e.buy_amount * x.buying_transfer * 1000) /
                            1000 <
                        0 ? (
                          <h4 style={{ color: "green", display: "inline" }}>
                            +
                            {(
                              Math.round(
                                e.buy_amount * x.buying_transfer * 1000
                              ) /
                                1000 -
                              Math.round(e.buy_sum * 1000) / 1000
                            )
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </h4>
                        ) : (
                          <h4 style={{ color: "red", display: "inline" }}>
                            -
                            {(
                              Math.round(e.buy_sum * 1000) / 1000 -
                              Math.round(
                                e.buy_amount * x.buying_transfer * 1000
                              ) /
                                1000
                            )
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </h4>
                        )}{" "}
                        ฿ <br></br>
                      </div>

                      <div className="foot">
                        <button
                          className="btn-sell-fav"
                          data-bs-target="#showFormSell"
                          data-bs-toggle="modal"
                          value={[
                            e.currency_id,
                            x.buying_transfer,
                            e.buy_amount,
                          ]}
                          onClick={handleSell}
                        >
                          Sell
                        </button>
                        <button
                          className="btn-close-fav"
                          data-bs-target="#showFormClose"
                          data-bs-toggle="modal"
                          value={[e.currency_id]}
                          disabled={e.buy_amount !== 0 ? true : false}
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <ModalSell sell={sell} />
                    <ModalClose idDelete={idDelete} />
                  </>
                );
              }
            });
          })}
        </div>
      </div>
    </>
  );
}
