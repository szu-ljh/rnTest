import React,{useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as constant from '../../Constant'
import * as BlueToothAction from '../../actions/BlueToothActions';
import {useSelector,useDispatch} from 'react-redux';
import * as ScreenUtil from '../../utils/ScreenUtil'

const interval = []; //定时器
const RespMoniterContainer=({navigation})=>{
    const [isMeasure, setIsMasure] = useState(false);
    const dispatch = useDispatch();
    const BTdata = useSelector((state) => state);
    if (BTdata.data && BTdata.data.type === constant.TYPE_RESP) {
        var {Wave, Rate} = BTdata.data;
    }

    function startMeasure() {
        interval.push(setInterval(taskPer200ms, 2500)); //启动计时器，调用函数，
    }

    function taskPer200ms() {
        //console.log(interval);
        dispatch(
          BlueToothAction.getBluetoothRead(
            {type: constant.TYPE_RESP},
            () => {},
            () => {},
          ),
        );
    }

    function stopMeasure() {
        for (let index = 0; index < interval.length; index++) {
          const element = interval[index];
          clearInterval(element);
        }
        interval.splice(0, interval.length);
        duration = 180;
      }

    return (
        <View>
            <Text>RespMoniterContainer</Text>
            <Text>呼吸率</Text>
            <Text>{Rate}（bmp）</Text>
            <TouchableOpacity
                style={styles.botton}
                onPress={() => {
                  setIsMasure(!isMeasure);
                  if (!isMeasure) {
                    console.log('测量ks');
                    dispatch(
                      BlueToothAction.useBluetoothRead({
                        type: constant.TYPE_RESP,
                        use: true,
                      }),
                    );
                    startMeasure();
                  } else {
                    console.log('测量结束');
                    dispatch(
                      BlueToothAction.useBluetoothRead({
                        type: constant.TYPE_RESP,
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
        top: ScreenUtil.scaleHeight(10),
        backgroundColor: '#F75353',
        alignItems: 'center',
        borderRadius: 20,
      },
    bottontext: {
        top: ScreenUtil.scaleHeight(10),
        color: 'white',
        fontWeight: 'bold',
    },
});


export default RespMoniterContainer;