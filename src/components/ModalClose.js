export default function ModalClose({ idDelete }) {
  const handleDelete = () => {
    const email = localStorage.getItem("email");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        idDelete,
      }),
    };
    const url = "https://ill-puce-lion-yoke.cyclic.app/delete";
    fetch(url, requestOptions)
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Delete Currency Success!");
          window.location = "/favorites";
        } else {
          console.log(data);
          console.log("Delete not Success");
        }
      });
  };

  return (
    <>
      <div className="modal fade" id="showFormClose">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header bg-warning fs-4">
              <h5 className="modal-title fs-4">Delete</h5>
              <i className="fa-duotone fa-message-exclamation"></i>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body ">
              <div className="fs-6 ">
                Are you sure to delete currency "{idDelete}" from your Portfolio
                ?
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-warning "
                  style={{ width: 160 }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
