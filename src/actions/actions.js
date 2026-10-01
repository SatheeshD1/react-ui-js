export const SET_DATA = 'SET_DATA';
export const SET_STREAM_DATA = 'SET_STREAM_DATA';
export const SET_PAY_INFO = 'SET_PAY_INFO';

export const setData = (data) => ({
  type: SET_DATA,
  payload: data
});

export const setStreamData = (data) => ({
  type: SET_STREAM_DATA,
  payload: data
});

export const setPayInfo = (data) => ({
  type: SET_PAY_INFO,
  payload: data
});

