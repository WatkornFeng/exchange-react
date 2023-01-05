import { useEffect, useState } from "react";

export default function ModalBuy({ detail }) {
  const [amount, setAmount] = useState(0);
  const [checkInput, setCheckInput] = useState(false);

  const time = new Date().toLocaleTimeString();
  const day = new Date().toDateString();
  const buyTime = day + " || " + time;

  useEffect(() => {
    if (amount > 0 && amount.length > 0) {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
  }, [amount]);
  const cancelfn = () => {
    setAmount(0);
  };

  const buyC = (e) => {
    e.preventDefault();
    const values = (amount * detail?.[0]?.selling).toFixed(3);
    const email = localStorage.getItem("email");
    const currencyId = detail?.[0]?.currency_id;
    const currencyEng = detail?.[0]?.currency_name_eng;
    const buy = "BUY";

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
          currencyEng,
          buyTime,
          amount,
          buy,
        }),
      };
      const url = "https://ill-puce-lion-yoke.cyclic.app/buy";
      fetch(url, requestOptions)
        .then((Response) => Response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Buy Currency Success!");
            window.location = "/favorites";
          } else {
            console.log(data);
            console.log("Buy not Success");
          }
        });
    } else {
      console.log("Input Values = 0");
    }
  };
  return (
    <div className="modal fade" id="showForm">
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h5 className="modal-title">Buy</h5>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={cancelfn}
            ></button>
          </div>
          <div className="modal-body ">
            <form onSubmit={buyC}>
              <div className="mx-auto fs-4 " style={{ width: 30 }}>
                {detail?.[0]?.currency_id}
              </div>
              <div>Buy Price : {detail?.[0]?.selling} THB / 1 Units</div>
              <div className="form-group ">
                <label>Amount (Units)</label>
                <input
                  type="number"
                  className="form-control mb-1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <p className="text-primary">
                  {amount} x {detail?.[0]?.selling}
                </p>
                <p className="text-primary fs-5">
                  Totals :{" "}
                  {(amount * detail?.[0]?.selling)
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
                className="btn btn-info "
                disabled={!checkInput}
                style={{ width: 160 }}
                onClick={buyC}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
