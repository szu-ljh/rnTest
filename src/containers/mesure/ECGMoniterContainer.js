import React,{useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as constant from '../../Constant'
import * as BlueToothAction from '../../actions/BlueToothActions';
import {useSelector,useDispatch} from 'react-redux';
import * as ScreenUtil from '../../utils/ScreenUtil'

const interval = []; //定时器
let duration = 180; //计时（单位秒）每3分钟上传一次
const ECGWave1 = [];
const ECGWave2 = []; //波形缓冲区

const ECGMoniterContainer=({navigation})=>{
    const [isMeasure, setIsMasure] = useState(false);
    const dispatch = useDispatch();
    const BTdata = useSelector((state) => state); //蓝牙接受数据发生改变是刷新组件
    if (BTdata.data && BTdata.data.type === constant.TYPE_ECG) {
        var {Wave1, Wave2, EcgHr, LlLead, LaLead, RaLead, VLead} = BTdata.data;
        ECGWave1.push(...Wave1);
        ECGWave2.push(...Wave2);
    }
    function startMeasure() {
        interval.push(setInterval(taskPer200ms, 1500)); //启动计时器，调用函数，
    }
    function taskPer200ms() {
        duration = duration - 1;
        dispatch(
          BlueToothAction.getBluetoothRead(
            {type: constant.TYPE_ECG},
            () => {},
            () => {},
          ),
        );
        if (LlLead & VLead & (duration <= 0)) {
          console.log('发送');
          duration = 180;
        }
    }
    function stopMeasure() {
        for (let index = 0; index < interval.length; index++) {
          const element = interval[index];
          clearInterval(element);
        }
        interval.splice(0, interval.length);
        ECGWave1.splice(0);
        //setECGWave1([]);
        ECGWave2.splice(0);
        duration = 180;
    }
    
    return (
        <View>
            <Text>ECGMoniterContainer</Text>
            <Text >心率(BPM):{EcgHr}</Text>
                <Text >
                  RA : {RaLead ? '已连接' : '脱落'}
                </Text>
                <Text >
                  LA : {LlLead ? '已连接' : '脱落'}
                </Text>
                <Text >
                  V : {VLead ? '已连接' : '脱落'}
                </Text>
                <TouchableOpacity
                style={styles.botton}
                onPress={() => {
                  setIsMasure(!isMeasure);
                  //readBT();
                  if (!isMeasure) {
                    console.log('测量ks');
                    dispatch(
                      BlueToothAction.useBluetoothRead({
                        type: constant.TYPE_ECG,
                        use: true,
                      }),
                    );
                    startMeasure();
                  } else {
                    console.log('测量结束');
                    dispatch(
                      BlueToothAction.useBluetoothRead({
                        type: constant.TYPE_ECG,
                        use: false,
                      }),
                    );
                    stopMeasure();
                  }
                }}>
                <Text style={styles.bottontext}>
                  {isMeasure ? '停止测量' : '开始测量'}
                </Text>
              </TouchableOpacity>
        </View>
    );
    
};
const styles = StyleSheet.create({
    botton: {
      width: ScreenUtil.scaleSize(141),
      height: ScreenUtil.scaleHeight(44),
      top: ScreenUtil.scaleHeight(20),
      backgroundColor: '#F75353',
      alignItems: 'center',
      borderRadius: 20,
    },
    contenttext: {
      right: ScreenUtil.scaleSize(100),
      top: ScreenUtil.scaleHeight(30),
      fontSize: ScreenUtil.setSpText(15),
    },
    bottontext: {
        top: ScreenUtil.scaleHeight(14),
        color: 'white',
        fontWeight: 'bold',
      },
  });

export default ECGMoniterContainer;