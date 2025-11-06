// import { useDispatch, useSelector } from "react-redux";
import { MyUseSelector, myUseDispatch } from "../store/store";

function CarApp() {
  const cars = MyUseSelector((state) => state);
  console.log("cars", cars);
  const dispatch = myUseDispatch();
  console.log("dispatch", dispatch);

  return (
    <>
      <h1>Car App</h1>
      <ul style={{ display: "flex", gap: "20px" }}>
        {cars.map(({ make, quantity, id }) => (
          <div
            key={id}
            style={{
              border: "1px solid black",
              padding: "15px",
              width: "100px",
            }}
          >
            <p>{make}</p>
            <p>{quantity}</p>
            <button onClick={() => dispatch({ type: "car/sell", payload: id })}>
              Sell
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default CarApp;