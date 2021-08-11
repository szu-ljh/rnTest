import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as constant from '../../Constant';
import * as BlueToothAction from '../../actions/BlueToothActions';
import {useSelector, useDispatch} from 'react-redux';
import * as ScreenUtil from '../../utils/ScreenUtil';
// import Echarts from 'native-echarts';
import {Echarts, echarts} from 'react-native-secharts';

// const interval =[];
// let duration = 180; //计时（单位秒）每3分钟上传一次
// const Wave1 = [];
// const ECGWave2 = []; //波形缓冲区
// const IsNormal = 0; // 0-正常,1-异常
// var DrawBuffer = [];
// var DrawBuffer2 = [];
// var PointNum = 0; //画点个数
// const Normal = 0;
// const Abnormal = 1;

// let temp = [];
// let temp2 = [];
// let timer = null;
// let begin;
// const LEN = 700;

let count = 0;
let Wave1 = [];
let DrawBuffer = [];

const ECGMoniterContainer = ({navigation}) => {
  // const [isMeasure, setIsMasure] = useState(false);
  // const dispatch = useDispatch();
  // const BTdata = useSelector((state) => state); //蓝牙接受数据发生改变是刷新组件
  // if (BTdata.data && BTdata.data.type === constant.TYPE_ECG) {
  //   var {Wave1, Wave2, EcgHr, LlLead, LaLead, RaLead, VLead} = BTdata.data;
  //   Wave1.push(...Wave1);
  // }
  // function startMeasure() {
  //   interval.push(setInterval(taskPer200ms, 150)); //启动计时器，调用函数，
  // }
  // function taskPer200ms() {
  // dispatch(
  //   BlueToothAction.getBluetoothRead(
  //     {type: constant.TYPE_ECG},
  //     () => {},
  //     () => {},
  //   ),
  // );
  // }
  // function stopMeasure() {
  //   for (let index = 0; index < interval.length; index++) {
  //     const element = interval[index];
  //     clearInterval(element);
  //   }
  //   interval.splice(0, interval.length);
  // }

  const [isMeasure, setIsMasure] = useState(false);
  const dispatch = useDispatch();
  const BTdata = useSelector((state) => state.data);
  const [option1,setOption1] = useState(
    [{
      animation: false,
      title: {
        text: 'Wave1',
      },
      color: ['#3398DB'],
      tooltip: {},
      grid: {
        show: false,
        left: 50,
        right: 40,
        top: 28,
        bottom: 30,
      },
      toolbox: {
        left: 'center',
      },
      legend: {
        orient: 'vertical',
        right: 10,
      },
      xAxis: [
        {
          type: 'value',
          scale: true,
          splitLine: {
            //去除网格线
            show: false,
          },
          splitArea: {show: false}, //去除网格区域
        },
      ],
      yAxis: [
        {
          //type:'value'
          splitLine: {
            //去除网格线
            show: false,
          },
          splitArea: {show: false}, //去除网格区域
        },
      ],
      series: {
        type: 'line',
        data: [],
        // data:[0,0],
        clip: true,
        showSymbol: false,
        hoverAnimation: false,
        smooth: true,
      },
    }]
  )

  let EcgHr;
  let LlLead;
  let RaLead;
  let VLead;
  let task;
  const LEN = 700;

  let echart1 = React.createRef();

  if (BTdata && BTdata.type === constant.TYPE_ECG) {
    ({Wave1, Wave2, EcgHr, LlLead, LaLead, RaLead, VLead} = BTdata);
  }

  // console.log('2',Wave1)

  function startMeasure() {
    setTimeout(taskPer100ms, 100);
  }

  function taskPer100ms() {
    dispatch(
      BlueToothAction.getBluetoothRead(
        {type: constant.TYPE_ECG},
        () => {},
        () => {},
      ),
    );

    let temp;
    let temp2;
    let PointData = 0;
    let len = Wave1.length;
    if (len >= 400) {
      len = 400;
      console.log(len);
    }
    // console.log(Wave1.length);
    let num = len;
    if (len + count > LEN) {
      num = len + 1;
    }

    temp = [];
    temp2 = [];
    PointNum = count;

    for (let i = 0; i < num; i++) {
      if (PointNum > LEN) {
        PointNum = 0;
      } else {
        PointData = Wave1.shift();
      }
      // console.log([PointNum, PointData])
      temp.push([PointNum, PointData]);
      PointNum++;
    }
    // console.log(temp);
    if (count + len < LEN + 1) {
      if (count + len < LEN - 4) {
        for (let i = count + len; i < count + len + 5; i++) {
          temp2.push([i, null]);
        }
        DrawBuffer.splice(count, len + 5, ...[...temp, ...temp2]);
      } else {
        DrawBuffer.splice(count, len, ...temp);
      }
      count = count + len;
    } else {
      DrawBuffer.splice(
        count,
        LEN + 1 - count,
        ...temp.splice(0, LEN + 1 - count),
      );
      for (
        let i = num - (LEN + 1) + count;
        i < num - (LEN + 1) + count + 5;
        i++
      ) {
        temp2.push([i, null]);
      }
      DrawBuffer.splice(0, num - (LEN + 1) + count + 5, ...[...temp, ...temp2]);
      count = len - LEN + count;
    }

    setOption1([
      {
        ...option1[0],
        series: {
          type: 'line',
          data: DrawBuffer,
          clip: true,
          showSymbol: false,
          hoverAnimation: false,
          smooth: true,
        },
      }]
    )
    
    task = setTimeout(taskPer100ms, 
      100);
  }

  function stopMeasure() {
    clearTimeout(task);
  }

  // function GetData() {
  //   let temp;
  //   let temp2;
  //   let PointData = 0;
  //   let len = Wave1.length;
  //   if (len >= 400) {
  //     len = 400;
  //     console.log(len);
  //   }
  //   // console.log(Wave1.length);
  //   let num = len;
  //   if (len + count > LEN) {
  //     num = len + 1;
  //   }

  //   temp = [];
  //   temp2 = [];
  //   PointNum = count;

  //   for (let i = 0; i < num; i++) {
  //     if (PointNum > LEN) {
  //       PointNum = 0;
  //     } else {
  //       PointData = Wave1.shift();
  //     }
  //     // console.log([PointNum, PointData])
  //     temp.push([PointNum, PointData]);
  //     PointNum++;
  //   }
  //   // console.log(temp);
  //   if (count + len < LEN + 1) {
  //     if (count + len < LEN - 4) {
  //       for (let i = count + len; i < count + len + 5; i++) {
  //         temp2.push([i, null]);
  //       }
  //       DrawBuffer.splice(count, len + 5, ...[...temp, ...temp2]);
  //     } else {
  //       DrawBuffer.splice(count, len, ...temp);
  //     }
  //     count = count + len;
  //   } else {
  //     DrawBuffer.splice(
  //       count,
  //       LEN + 1 - count,
  //       ...temp.splice(0, LEN + 1 - count),
  //     );
  //     for (
  //       let i = num - (LEN + 1) + count;
  //       i < num - (LEN + 1) + count + 5;
  //       i++
  //     ) {
  //       temp2.push([i, null]);
  //     }
  //     DrawBuffer.splice(0, num - (LEN + 1) + count + 5, ...[...temp, ...temp2]);
  //     count = len - LEN + count;
  //   }

    // console.log(DrawBuffer);
  //   return DrawBuffer;
  // }

  // const option1 = {
  //   animation: false,
  //   title: {
  //     text: 'Wave1',
  //   },
  //   color: ['#3398DB'],
  //   tooltip: {},
  //   grid: {
  //     show: false,
  //     left: 50,
  //     right: 40,
  //     top: 28,
  //     bottom: 30,
  //   },
  //   toolbox: {
  //     left: 'center',
  //   },
  //   legend: {
  //     orient: 'vertical',
  //     right: 10,
  //   },
  //   xAxis: [
  //     {
  //       type: 'value',
  //       scale: true,
  //       splitLine: {
  //         //去除网格线
  //         show: false,
  //       },
  //       splitArea: {show: false}, //去除网格区域
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       //type:'value'
  //       splitLine: {
  //         //去除网格线
  //         show: false,
  //       },
  //       splitArea: {show: false}, //去除网格区域
  //     },
  //   ],
  //   series: {
  //     type: 'line',
  //     data: GetData(),
  //     // data:[0,0],
  //     clip: true,
  //     showSymbol: false,
  //     hoverAnimation: false,
  //     smooth: true,
  //   },
  // };

  return (
    <View>
      {/* <Echarts option={option1} height={175} /> */}
      <Echarts ref={(ref)=>{echart1}} option={option1[0]} height={175} />
      <Text>ECGMoniterContainer</Text>
      <Text>心率(BPM):{EcgHr}</Text>
      <Text>RA : {RaLead ? '已连接' : '脱落'}</Text>
      <Text>LA : {LlLead ? '已连接' : '脱落'}</Text>
      <Text>V : {VLead ? '已连接' : '脱落'}</Text>
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
