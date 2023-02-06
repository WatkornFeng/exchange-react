const apiKey = process.env.REACT_APP_API_KEY;
const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "X-IBM-Client-Id": apiKey,
  },
};
export const url =
  "https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?";
const yesterday = new Date();

export default async function rateApi(price) {
  if (price !== "") {
    while (true) {
      yesterday.setDate(yesterday.getDate() - 1);
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
      const start_period = `start_period=${previousDay}`;
      const end_period = `&end_period=${previousDay}`;
      const api = url + start_period + end_period;

      const response = await fetch(api, requestOptions);
      const responseJson = await response.json();
      const hasData = responseJson.result.data.data_detail[0].period;
      if (hasData !== "") {
        return responseJson.result;
      }
    }
  }
}
