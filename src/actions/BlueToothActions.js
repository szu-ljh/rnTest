import * as types from './types';

//normal
export const bluetoothisable = (data) => ({
  type: types.BLUE_TOOTH_ISABLE,
  data,
});

export const bluetoothConnectState = (data) => ({
  type: types.BLUE_TOOTH_CONNECT_STATE,
  data,
});



export const bluetoothDevice = (data) => ({
  type: types.BLUE_TOOTH_DEVICE,
  data,
});


//sagas
export const bluetoothRead = (data, onSuccess, onError) => ({
  type: types.BLUE_TOOTH_READ,
  data,
  onSuccess,
  onError,
});

export const useBluetoothRead = (data) => ({
  type: types.USE_BLUE_TOOTH_READ,
  data,
});


export const getBluetoothRead = (data) => ({
  type: types.GET_BLUE_TOOTH_READ,
  data,
});

export const getWaveData = (data) => ({
  type: types.GET_WAVE_DATA,
  data,
});

export const setBluetoothRead = (data) => ({
    type: types.SET_BLUE_TOOTH_READ,
    data,
  });