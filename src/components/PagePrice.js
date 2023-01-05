import "./PagePrice.css";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function PricePage({ price }) {
  return (
    <>
      <Header />
      <div className="time">
        <p>
          Daily Weighted-average Interbank Exchange Rate -{" "}
          {price?.data?.data_detail?.[0]?.period} - Rates of Exchange of
          Commercial Banks in Bangkok Metropolis.{" "}
        </p>
      </div>
      <div id="head">
        <h2> Unit : Baht / 1 Unit of Foreign Currency </h2>
        <h6>Source : Bank of Thailand</h6>
      </div>
      <div className="price">
        {price?.data?.data_detail?.map((e, index) => {
          return (
            <Link key={index} to={`/price/${e.currency_id}`}>
              <div className="flex-price">
                <h1>{e.currency_id}</h1>
                <h6>{e.currency_name_eng}</h6>
                <h5>{Math.round(e.mid_rate * 1000) / 1000} ฿</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
