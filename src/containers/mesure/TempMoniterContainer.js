import React,{useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as constant from '../../Constant'
import * as BlueToothAction from '../../actions/BlueToothActions';
import {useSelector,useDispatch} from 'react-redux';
import * as ScreenUtil from '../../utils/ScreenUtil'
const interval = []; //定时器
const TempMoniterContainer=({navigation})=>{
    const [isMeasure, setIsMasure] = useState(false);
    const dispatch = useDispatch();
    const BTdata = useSelector((state) => state);
    if (BTdata.data && BTdata.data.type === constant.TYPE_TEMP) {
        var {Temp1, Temp2, Lead1, Lead2} = BTdata.data;
    }

    function startMeasure() {
        interval.push(setInterval(taskPer200ms, 1000)); //启动计时器，调用函数，
    }
    function taskPer200ms() {
        dispatch(
          BlueToothAction.getBluetoothRead(
            {type: constant.TYPE_TEMP},
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
    }
    return (
        <View>
            <Text>TempMoniterContainer</Text>
            <Text>
                体温探头1：{Lead1 ? '已连接' : '脱落'}
              </Text>
              <Text>{Temp1 ? Temp1 : ''}（°C）</Text>
              <Text>
                体温探头2：{Lead2 ? '已连接' : '脱落'}
              </Text>
              <Text>{Temp2 ? Temp2 : ''}（°C）</Text>
              <TouchableOpacity
              style={styles.botton}
              onPress={() => {
                setIsMasure(!isMeasure);
                if (!isMeasure) {
                  console.log('测量ks');
                  dispatch(
                    BlueToothAction.useBluetoothRead({
                      type: constant.TYPE_TEMP,
                      use: true,
                    }),
                  );
                  startMeasure();
                } else {
                  console.log('测量结束');
                  dispatch(
                    BlueToothAction.useBluetoothRead({
                      type: constant.TYPE_TEMP,
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
    )
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

export default TempMoniterContainer;