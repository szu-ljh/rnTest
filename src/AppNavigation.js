import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, Image} from 'react-native';
import HomeContainer from './containers/tabar/HomeContainer';
import MeContainer from './containers/tabar/MeContainer';
import ToConnectContainer from './containers/tabar/ToConnectContainer';
import LoginContainer from './containers/login/LoginContainer';
import RegisterContainer from './containers/login/RegisterContainer';
import ECGMoniterContainer from './containers/mesure/ECGMoniterContainer';
import NbpMoniterContainer from './containers/mesure/NbpMoniterContainer';
import RespMoniterContainer from './containers/mesure/RespMoniterContainer';
import Spo2MoniterContainer from './containers/mesure/Spo2MoniterContainer';
import TempMoniterContainer from './containers/mesure/TempMoniterContainer';
import BluetoothConnnectContainer from './containers/bluetooth/BluetoothConnectContainer';
import ForgetContainer from './containers/login/ForgetContainer';
import {useTheme} from 'react-native-paper';

if (Platform.OS === 'ios') {
  MaterialCommunityIcons.loadFont();
}
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeContainer"
      //labeled={true}
      //shifting={true}
      activeColor="#3A85F8"
      inactiveColor="#B4B4B4"
      barStyle={{backgroundColor: '#FFFFFF', height:55}}>
      <Tab.Screen
        name="home"
        component={HomeContainer}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./img/tabmain1.png')
                  : require('./img/tabmain.png')
              }
              style={{
                width: 28,
                height: 28,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={ToConnectContainer}
        options={{
          tabBarLabel: '设备',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./img/tabvideo1.png')
                  : require('./img/tabvideo.png')
              }
              style={{
                width: 28,
                height: 28,
                //tintColor: focused ? '#81D8CF' : '#B4B4B4',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="me"
        component={MeContainer}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./img/tabme1.png')
                  : require('./img/tabme.png')
              }
              style={{
                width: 28,
                height: 28,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" headerMode="none" mode="card">
        <Stack.Screen name="login" component={LoginContainer} />
        <Stack.Screen name="home" component={HomeTabs} />
        <Stack.Screen name="foget" component={ForgetContainer}/>
        <Stack.Screen name="register" component={RegisterContainer} />
        <Stack.Screen name="ecg" component={ECGMoniterContainer}/>
        <Stack.Screen name="nbp" component={NbpMoniterContainer}/>
        <Stack.Screen name="resp" component={RespMoniterContainer}/>
        <Stack.Screen name="spo2" component={Spo2MoniterContainer}/>
        <Stack.Screen name="temp" component={TempMoniterContainer}/>
        <Stack.Screen name="bluetoothconnect" component={BluetoothConnnectContainer}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
