import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import PagePrice from "./components/PagePrice";
import PageDetailPrice from "./components/PageDetailPrice";
import PageTransaction from "./components/PageTransaction";
import PageFavorites from "./components/PageFavorites";
import Page404 from "./components/Page404";
import PageLogin from "./components/PageLogin";
import PageCreateAcc from "./components/PageCreateAcc";
import "./App.css";

function App4() {
  const [price, setPrice] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "X-IBM-Client-Id": apiKey,
    },
  };
  const url =
    "https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?";
  const yesterday = new Date();

  useEffect(() => {
    getPrice();
    async function getPrice() {
      let i = 0;
      if (price !== "") {
        while (true) {
          i++;
          yesterday.setDate(yesterday.getDate() - i);
          function padTo2Digits(num) {
            return num.toString().padStart(2, "0");
          }
          function formatDate(date) {
            return [
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
            ].join("-");
          }
          const previousDay = formatDate(yesterday);
          console.log(previousDay);
          const start_period = `start_period=${previousDay}`;
          const end_period = `&end_period=${previousDay}`;
          const api = url + start_period + end_period;

          const response = await fetch(api, requestOptions);
          const responseJson = await response.json();
          const data = responseJson.result.data.data_detail[0].period;

          if (data !== "") {
            setPrice(responseJson.result);
            break;
          }
        }
      } else {
        console.log("emply at 1st time");
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<PagePrice price={price} />} />
        <Route path="/transaction" element={<PageTransaction />} />
        <Route path="/favorites" element={<PageFavorites price={price} />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/create" element={<PageCreateAcc />} />
        <Route
          path="/price/:priceId"
          element={<PageDetailPrice price={price} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
export default App4;
