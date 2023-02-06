import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import rateApi from "./api/rateApi";
import PagePrice from "./components/PagePrice";
import PageDetailPrice from "./components/PageDetailPrice";
import PageTransaction from "./components/PageTransaction";
import PageFavorites from "./components/PageFavorites";
import Page404 from "./components/Page404";
import PageLogin from "./components/PageLogin";
import PageCreateAcc from "./components/PageCreateAcc";
import "./App.css";

function App() {
  const [price, setPrice] = useState([]);
  async function callApi() {
    const data = await rateApi(price);
    setPrice(data);
  }

  useEffect(() => {
    callApi();
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
export default App;
