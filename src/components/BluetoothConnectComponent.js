import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'; //蓝牙串口
import DeviceList from './BluetoothDeviceListComponent';
import {useSelector, useDispatch} from 'react-redux';
import * as BlueToothAction from '../actions/BlueToothActions';
import {Buffer} from 'buffer';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {requestLocationPermission} from '../utils/permission';
global.Buffer = Buffer;
const Button = ({title, onPress, style, textStyle}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
);

const BluetoothConnectComponent = () => {
  const activeTabStyle = {borderBottomWidth: 6, borderColor: '#009688'};
  const [BTisEnabled, setBTisEnabled] = useState(false);
  const navigation = useNavigation();
  const [BTdiscovering, setBTdiscovering] = useState(false);
  const [BTConnectdevice, setBTConnectdevice] = useState([]);
  const [BTdevices, setBTdevices] = useState([]);
  const [BTunpairedDevices, setBTunpairedDevices] = useState([]);
  const [BTconnected, setBTconnected] = useState(false);
  const [BTconnecting, setBTconnecting] = useState(false);
  const [BTsection, setBTsection] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        //values为 promise的返回结果
        const [isEnabled, devices] = values;
        setBTisEnabled(isEnabled);
        setBTdevices(devices);
        dispatch(BlueToothAction.bluetoothConnectState({enabled: isEnabled}));
      },
    );

    BluetoothSerial.on('bluetoothEnabled', () => {
      //蓝牙监听（蓝牙特定是事件）事件字符串为固定字符
      console.log('Bluetooth enabled');
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          dispatch(BlueToothAction.bluetoothConnectState({enabled: isEnabled}));
          setBTisEnabled(isEnabled);
          setBTdevices(devices);
        },
      );
    });

    BluetoothSerial.on('bluetoothDisabled', () => {
      console.log('Bluetooth disabled');
      setBTdevices([]);
      setBTisEnabled(false);
      dispatch(BlueToothAction.bluetoothConnectState({enabled: false}));
    });

    BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
    BluetoothSerial.on('connectionLost', () => {
      if (BTdevices) {
        console.log(`Connection to device ${BTdevices.name} has been lost`);
      }
      setBTconnected(false);
      dispatch(BlueToothAction.bluetoothConnectState({connected: false}));
    });
  }, []);

  /**
   * [android]
   * 请求蓝牙
   */
  const requestEnable = () => {
    BluetoothSerial.requestEnable()
      .then(res => {
        setBTisEnabled(true);
        dispatch(BlueToothAction.bluetoothConnectState({enabled: true}));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  /**
   * [android]
   * 关闭蓝牙
   */
   const disable = () => {
    BluetoothSerial.disable()
      .then(()=>{
        BluetoothSerial.isEnabled()
          .then(res=>{
          setBTisEnabled(res)
        })
        .catch(err => {
          console.log(err.message);
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  /**
   * [android]
   * 打开-关闭蓝牙开关
   */
  const toggleBluetooth = value => {
    if (value === true) {
      requestEnable();
    } else {
      disable();
    };
  };

  /**
   * [android]
   * 发现未配对设备
   */
  const discoverUnpaired = () => {
    requestLocationPermission();
    if (BTdiscovering) {
      return false;
    } else {
      setBTdiscovering(true);
      dispatch(
        BlueToothAction.bluetoothConnectState({
          connected: false,
          connecting: true,
        }),
      );
      BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          setBTunpairedDevices(unpairedDevices);
          setBTdiscovering(false);
          dispatch(
            BlueToothAction.bluetoothConnectState({
              connected: false,
              connecting: false,
            }),
          );
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
        });
    }
  };

  /**
   * [android]
   * 取消发送
   */
  const cancelDiscovery = () => {
    if (BTdiscovering) {
      BluetoothSerial.cancelDiscovery()
        .then(() => {
          setBTdiscovering(false);
          dispatch(
            BlueToothAction.bluetoothConnectState({
              connected: false,
              connecting: false,
            }),
          );
        })
        .catch(err => console.log(err.message));
    }
  };

  /**
   * [android]
   * 配对设备
   */
  const pairDevice = device => {
    BluetoothSerial.pairDevice(device.id)
      .then(paired => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`);
          const devices = BTdevices;
          devices.push(device);
          setBTdevices(devices);
          setBTunpairedDevices(
            BTunpairedDevices.filter(d => d.id !== device.id),
          );
        } else {
          console.log(`Device ${device.name} pairing failed`);
        }
      })
      .catch(err => console.log(err.message));
  };

  /**
   * 通过id连接蓝牙设备
   * @param  {Object} device
   */
  const connect = device => {
    setBTconnecting(true);
    BluetoothSerial.connect(device.id)
      .then(res => {
        console.log(`Connected to device ${device.name}`);
        setBTConnectdevice(device);
        setBTconnected(true);
        setBTconnecting(false);
        navigation.dispatch(CommonActions.goBack());
        dispatch(
          BlueToothAction.bluetoothRead(
            {},
            () => {},
            () => {},
          ),
        );
        dispatch(BlueToothAction.bluetoothDevice({device}));
        dispatch(
          BlueToothAction.bluetoothConnectState({
            connected: true,
            connecting: false,
          }),
        );
      })
      .catch(err => {
        console.log(err.message);
        setBTconnecting(false);
      });
  };

  /**
   * 根据所在页面判断连接或配对设备
   * @param {Object} device
   */
  const onDevicePress = device => {
    if (BTsection === 0) {
      connect(device);

    } else {
      pairDevice(device);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>请确保手机蓝牙已打开…</Text>

        {Platform.OS === 'android' ? (
          <View style={styles.enableInfoWrapper}>
            <Text style={{fontSize: 14, color: '#000000'}}>
              {BTisEnabled ? '关闭蓝牙' : '打开蓝牙'}
            </Text>
            <Switch
              onValueChange={value => toggleBluetooth(value)}
              value={BTisEnabled}
            />
          </View>
        ) : null}
      </View>
      {Platform.OS === 'android' ? (
        <View
          style={[
            styles.topBar,
            {justifyContent: 'center', paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[styles.tab, BTsection === 0 && activeTabStyle]}
            onPress={() => setBTsection(0)}>
            <Text style={{fontSize: 14, color: '#000000'}}>常用设备</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, BTsection === 1 && activeTabStyle]}
            onPress={() => setBTsection(1)}>
            <Text style={{fontSize: 14, color: '#000000'}}>新设备</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {BTdiscovering && BTsection === 1 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator style={{marginBottom: 15}} size={60} />
          <Button
            textStyle={{color: '#FFFF00'}}
            style={styles.buttonRaised}
            title="取消搜索"
            onPress={() => cancelDiscovery()}
          />
        </View>
      ) : (
        <DeviceList
          devices={BTsection === 0 ? BTdevices : BTunpairedDevices}
          onDevicePress={device => onDevicePress(device)}
        />
      )}

      <View style={{alignSelf: 'flex-end', height: 52}}>
        <ScrollView horizontal contentContainerStyle={styles.fixedFooter}>
          {Platform.OS === 'android' && BTsection === 1 && BTisEnabled === true ? (
            <Button
              title={BTdiscovering ? '正在搜索蓝牙设备...' : '开始搜索蓝牙设备'}
              onPress={() => discoverUnpaired()}
            />
          ) : null}
          {Platform.OS === 'android' && !BTisEnabled ? (
            <Button title="Request enable" onPress={() => requestEnable()} />
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#000000',
  },
  enableInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 0.5,
    height: 56,
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderColor: 'transparent',
  },
  connectionInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  connectionInfo: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 10,
    color: '#238923',
  },
  button: {
    height: 36,
    margin: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#7B1FA2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonRaised: {
    backgroundColor: '#7B1FA2',
    borderRadius: 2,
    elevation: 2,
  },
});
export default BluetoothConnectComponent;
