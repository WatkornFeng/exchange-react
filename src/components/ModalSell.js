import { useEffect, useState } from "react";

export default function ModalSell({ sell }) {
  //console.log(typeof sell[1]);
  const numAmount = parseInt(sell[2]);
  const [amount, setAmount] = useState(0);

  const [checkInput, setCheckInput] = useState(false);

  const time = new Date().toLocaleTimeString();
  const day = new Date().toDateString();
  const sellTime = day + " || " + time;

  useEffect(() => {
    if (amount > 0 && amount.length > 0 && amount <= numAmount) {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
  }, [amount]);
  const cancelfn = () => {
    setAmount(0);
  };

  const sellC = (e) => {
    e.preventDefault();

    const values = (amount * sell[1]).toFixed(3);
    const email = localStorage.getItem("email");
    const currencyId = sell[0];
    const side = "SELL";
    console.log(amount);

    if (amount !== 0) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          values,
          currencyId,
          sellTime,
          amount,
          side,
        }),
      };
      const url = "https://ill-puce-lion-yoke.cyclic.app/sell";
      fetch(url, requestOptions)
        .then((Response) => Response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Sell Currency Success!");
            window.location = "/favorites";
          } else {
            console.log(data);
            console.log("Sell not Success");
          }
        });
    } else {
      console.log("Input Values = 0");
    }
  };

  return (
    <>
      <div className="modal fade" id="showFormSell">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header bg-danger fs-4">
              <h5 className="modal-title fs-4">Sell</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={cancelfn}
              ></button>
            </div>
            <div className="modal-body ">
              <form>
                <div className="mx-auto fs-4 " style={{ width: 30 }}>
                  {sell[0]}
                </div>
                <div className="fs-5 ">
                  Sell Price : {sell[1]} THB / 1 Units
                </div>
                <div className="form-group fs-5 ">
                  <label>Amount (Units) || Now you have {sell[2]} Units</label>
                  <input
                    type="number"
                    className="form-control mb-1"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                  <p className="text-primary">
                    {amount} x {sell[1]}
                  </p>
                  <p className="text-primary fs-5">
                    Totals :{" "}
                    {(amount * sell[1])
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    THB
                  </p>
                </div>
              </form>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={cancelfn}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger "
                  disabled={!checkInput}
                  style={{ width: 160 }}
                  onClick={sellC}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
