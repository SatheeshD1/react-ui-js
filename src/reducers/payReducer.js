import { SET_PAY_INFO } from "../actions/actions";

const initialState = {
  amount: 0,
  status: "NOT PAID"
};

const payReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAY_INFO:
      return { ...state, amount: action.payload.amount, status: action.payload.status};
    default:
      return state;
  }
};

export default payReducer;