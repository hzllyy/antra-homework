const initialState = [
  {
    make: "Toyota",
    quantity: 10,
    id: 1,
  },
  {
    make: "Honda",
    quantity: 10,
    id: 2,
  },
  {
    make: "Nissan",
    quantity: 10,
    id: 3,
  },
];

function carReducer(state = initialState, action) {
  switch (action.type) {
    case "car/sell": {
      const updatedCars = state.map((car) => {
        if (car.id === action.payload) {
          return {
            ...car,
            quantity: car.quantity - 1,
          };
        }
        return car;
      });
      return updatedCars;
    }
    default:
      return state;
  }
}

export default carReducer;