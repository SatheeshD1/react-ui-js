import { SET_DATA, SET_STREAM_DATA } from "../actions/actions";

const initialState = {
  data: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_STREAM_DATA:
      return { ...state, data:[...state.data,action.payload]};
    default:
      return state;
  }
};

export default searchReducer;