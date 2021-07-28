import React,{useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as constant from '../../Constant'
import * as BlueToothAction from '../../actions/BlueToothActions';
import {useSelector,useDispatch} from 'react-redux';
import * as ScreenUtil from '../../utils/ScreenUtil'
const interval = [];//定时器
let preCufPre =1000;//上次袖带压
let sentPR = 0;
let sentDis = 0;
let sentSys = 0;
let measureFlag = false;

const NbpMoniterContainer=({navigation})=>{
    const [isMeasure, setIsMasure] = useState(false);
    const dispatch = useDispatch();
    const BTdata = useSelector((state) => state); //蓝牙接受数据发生改变是刷新组件

    if ((BTdata.data && BTdata.data.type) === constant.TYPE_NBP) {
        var {CufPre, PR, Dis, Sys, Ave} = BTdata.data;

        if (preCufPre === CufPre && preCufPre <= 70) {
            //袖带压不变，表示测量结束
            measureFlag = false;
            if (PR) {
              sentPR = PR;
              sentDis = Dis;
              sentSys = Sys;
      
              console.log('脉率', PR);
              console.log('收缩压', Dis);
              console.log('舒张压', Sys);
            }
        } else {
            preCufPre = CufPre;
            measureFlag = true;
        }
    }
    function startMeasure() {
        //启动定时器函数，开始测量
        interval.push(setInterval(taskPer200ms, 1000)); //启动计时器，调用函数，
    }
    function taskPer200ms() {
        //console.log(interval);
        //preCufPre = CufPre;
        
        dispatch(
         BlueToothAction.getBluetoothRead(
            {type: constant.TYPE_NBP},
                () => {},
                () => {},
            ),
          
        );
        if (!measureFlag) {
          //袖带压不变，表示测量结束
          // measureFlag = true;
          stopMeasure();
          console.log('我被调用了，结束了1111');
        }
    }
    function stopMeasure() {
      for (let index = 0; index < interval.length; index++) {
        const element = interval[index];
        clearInterval(element);
      }
      console.log('我被调用了，结束了');
      interval.splice(0, interval.length);
      
      setIsMasure(false);
      measureFlag = false;
      dispatch(
        BlueToothAction.useBluetoothRead({type: constant.TYPE_NBP, use: false}),
      );
    }
    
    return (
        <View>
            <Text>NbpMoniterContainer</Text>
            <View>
              <Text >袖带压{CufPre}（mmHg）</Text>
              <Text >
                脉率 {measureFlag ? 0 : PR}
              </Text>
              <Text >
                收缩压 {measureFlag ? 0 : Sys}
              </Text>
              <Text >
                舒张压 {measureFlag ? 0 : Dis}
              </Text>
              <Text >
                平均压 {measureFlag ? 0 : Ave}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.botton}
              onPress={() => {
                setIsMasure(!isMeasure);
                // console.log(isMeasure);
                if (!isMeasure) {
                  measureFlag=!measureFlag;
                  console.log('测量ks');
                  dispatch(
                    BlueToothAction.useBluetoothRead({
                      type: constant.TYPE_NBP,
                      use: true,
                    }),
                  );
                  startMeasure();
                } else {
                  console.log('测量结束');
                  dispatch(
                    BlueToothAction.useBluetoothRead({
                      type: constant.TYPE_NBP,
                      use: false,
                    }),
                  );
                  stopMeasure();
                }
              }}>
              <Text style={styles.bottontext}>
                {measureFlag ? '停止测量' : '开始测量'}
              </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
bottontext: {
    top: ScreenUtil.scaleHeight(14),
    color: 'white',
    fontWeight: 'bold',
  },
botton: {
    width: ScreenUtil.scaleSize(141),
    height: ScreenUtil.scaleHeight(44),
    top: ScreenUtil.scaleHeight(20),
    backgroundColor: '#34C82F',
    alignItems: 'center',
    borderRadius: 20,
  }
})

export default NbpMoniterContainer;