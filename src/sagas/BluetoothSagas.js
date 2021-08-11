import * as types from '../actions/types';
import BluetoothSerial from 'react-native-bluetooth-serial';
import * as BlueToothAction from '../actions/BlueToothActions';
import {takeLatest,put} from 'redux-saga/effects';
import {BluetoothPackUnPack} from '../utils/BluetoothPackUnPack';
import {BlueToothProParaBoardData} from '../utils/BlueToothProParaBoardData';
import * as constant from '../Constant';
let mPackUnPack = new BluetoothPackUnPack();
let use = false;
let type;
let mBlueToothProParaBoardData = new BlueToothProParaBoardData();
export function * readBTData(action) {
  try {
    let datas = [1024];
    BluetoothSerial.withDelimiter('\r').then(() => {
      BluetoothSerial.on('read', btdata => {
        let buffer = Buffer.from(btdata.data.trim(), 'hex');
        datas = buffer.toJSON().data;
        //  console.log(datas)
        // ...解包
        for(let data of datas){
          if(mPackUnPack.unPackData(data)){
            if(use){
              //console.log('使用数据：',mPackUnPack.getUnPackResult());
              mBlueToothProParaBoardData.proData(
                mPackUnPack.getUnPackResult(),
                type,
              )
            }else{
              //console.log('丢弃数据：',mPackUnPack.getUnPackResult());
            }

          }
        }

     });
    });
    
  } catch (error) {
    console.log('eeeee', error);
  }
}

export function* watchReadBTData() {
  yield takeLatest(types.BLUE_TOOTH_READ, readBTData);
}

export function * useReadBTData(action) {
  console.log('进来use!!!');
  try {
    use = action.data.use;
    type = action.data.type;
    if(action.data.type===constant.TYPE_NBP){
      if(action.data.use){
        console.log(Buffer.from(mPackUnPack.packData([0x14,0x80,0,0,0,0,0,0,0,0]),'hex'));
        BluetoothSerial.write(Buffer.from(mPackUnPack.packData([0x14,0x80,0,0,0,0,0,0,0,0]),'hex'))
        .then((res) => {
          console.log('发送成功')
        })
        .catch((err) => console.log(err.message))
      }else{
        BluetoothSerial.write(Buffer.from(mPackUnPack.packData([0x14,0x81,0,0,0,0,0,0,0,0]),'hex'))
        .then((res) => {
          console.log('发送成功')
        })
        .catch((err) => console.log(err.message))
      }
    }
  } catch (error) {
    console.log('eeeee', error);
    //action.onError(error, -1);
  }
}

export function* watchUseReadBTData() {
  yield takeLatest(types.USE_BLUE_TOOTH_READ, useReadBTData);
}

export function * getReadBTData(action) {
  // console.log('进来get!!');
    if(use){            
      try {
          if (mBlueToothProParaBoardData.getProDataOK()){
            // console.log('hhhhOK');
            switch (action.data.type) {
              case constant.TYPE_ECG:
                // console.log('hhhhOK1');
                yield put(BlueToothAction.setBluetoothRead({
                  data: {
                    Wave1: mBlueToothProParaBoardData.getEcg1WaveData(),
                    //Size1: mBlueToothProParaBoardData.getEcg1WaveBufSize(),
                    Wave2: mBlueToothProParaBoardData.getEcg2WaveData(),
                    //Size2: mBlueToothProParaBoardData.getEcg2WaveBufSize(),
                    EcgHr: mBlueToothProParaBoardData.getEcgHr(),
                    LlLead:mBlueToothProParaBoardData.getEcgLlLead(),
                    LaLead:mBlueToothProParaBoardData.getEcgLaLead(),
                    RaLead:mBlueToothProParaBoardData.getEcgRaLead(),
                    VLead :mBlueToothProParaBoardData.getEcgVLead(),
                    type: constant.TYPE_ECG,
                  },
                }));
                // console.log('hhhhOK2');
                break;
                case constant.TYPE_TEMP:
                  yield put(BlueToothAction.setBluetoothRead({
                    data: {
                      Temp1: mBlueToothProParaBoardData.getTemp1(),
                      Temp2: mBlueToothProParaBoardData.getTemp2(),
                      Lead1: mBlueToothProParaBoardData.getTemp1Lead(),
                      Lead2: mBlueToothProParaBoardData.getTemp2Lead(),
                      type: constant.TYPE_TEMP,
                    },
                  }));
                  break;
              case constant.TYPE_NBP:
                console.log('hhhhOK1血压');
                yield put(BlueToothAction.setBluetoothRead({
                  data: {
                    CufPre: mBlueToothProParaBoardData.getNbpCufPre(),
                    PR: mBlueToothProParaBoardData.getNbpPulseRate(),
                    Dis:mBlueToothProParaBoardData.getDisPressure(),
                    Sys:mBlueToothProParaBoardData.getSysPressure(),
                    Ave:mBlueToothProParaBoardData.getAvePressure(),
                    type: constant.TYPE_NBP,
                  },
                }));
                break;
              case constant.TYPE_RESP:
                //console.log(mBlueToothProParaBoardData.getRespWave());
                yield put(BlueToothAction.setBluetoothRead({
                  data: {
                    Wave: mBlueToothProParaBoardData.getRespWave(),
                    //Size: mBlueToothProParaBoardData.getRespWaveBufSize(),
                    Rate: mBlueToothProParaBoardData.getRespRate(),
                    type: constant.TYPE_RESP,
                  },
                }));
                break; 
              case constant.TYPE_SPO2:
                yield put(BlueToothAction.setBluetoothRead({
                  data: {
                    Spo2: mBlueToothProParaBoardData.getSpo2Data(),
                    PR: mBlueToothProParaBoardData.getPulseRate(),
                    Wave: mBlueToothProParaBoardData.getSpo2WaveData(),
                    Lead: mBlueToothProParaBoardData.getSpo2FingerLead(),
                    type: constant.TYPE_SPO2,
                  },
                }));
                break; 
              default:
                console.log('hhhhdefault');
                yield put(BlueToothAction.setBluetoothRead({
                  data: {},
                }));
                break;
            }
          }else{
            console.log('未ok'); 
          }
      } catch (error) {
        console.log('eeeee', error);
      }
   }
}
export function* watchGetReadBTData() {
  console.log('进来watch!!!');
  yield takeLatest(types.GET_BLUE_TOOTH_READ, getReadBTData);
}