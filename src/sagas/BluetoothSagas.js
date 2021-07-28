import * as types from '../actions/types';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {takeLatest} from 'redux-saga/effects';

export function * readBTData(action) {
  try {
    let datas = [1024];
    BluetoothSerial.withDelimiter('\r').then(() => {
      BluetoothSerial.on('read', btdata => {
        let buffer = Buffer.from(btdata.data.trim(), 'hex');
        datas = buffer.toJSON().data;
        console.log(datas)
        // ...解包
     });
    });
    
  } catch (error) {
    console.log('eeeee', error);
  }
}
export function* watchReadBTData() {
  yield takeLatest(types.BLUE_TOOTH_READ, readBTData);
}
