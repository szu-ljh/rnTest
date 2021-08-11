import * as types from '../actions/types';

const baseinfo ={};



const bluetoothReducers = (state = baseinfo, action) => {
// const bluetoothReducers = (state = baseinfo, action) => {
  switch (action.type) {
    case types.BLUE_TOOTH_DEVICE:
      return {...state, ...action.data};
    case types.BLUE_TOOTH_CONNECT_STATE:
      return {...state, ...action.data};
    case types.BLUE_TOOTH_ISABLE:
      return {...state, ...action.data};
    case types.SET_BLUE_TOOTH_READ:
      return {...state, ...action.data};
    case types.GET_WAVE_DATA:
      return {...state, ...action.data};
    default:
      return state;
  }
};

export default bluetoothReducers;
