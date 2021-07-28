import {all} from 'redux-saga/effects';

import {
  watchReadBTData,watchUseReadBTData,watchGetReadBTData
 } from './BluetoothSagas';

function* rootSaga() {
  yield all([
    watchReadBTData(),
    watchUseReadBTData(),
    watchGetReadBTData()
  ]);
}
export default rootSaga;