import React, {Component, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

const deviceName = /^SN[0-9]{4}[A-Z][0-9]{7}$/;

const BluetoothDeviceList = ({
  devices,
  onDevicePress,
}) => (
  <ScrollView style={styles.container}>
    {devices.map((device, i) => {

      return (
        deviceName.test(device.name)?
        (<View style={styles.devicecontainer}>
          <TouchableHighlight
            underlayColor="#DDDDDD"
            key={`${device.id}_${i}`}
            style={styles.imagecontainer}
            onPress={() => onDevicePress(device)}>
            <View style={styles.imagecontainer}>
            <Image source={require('./../img/box.png')} 
                  style={{
                   width: 100,
                   height: 50,
                  }}/>
            </View>
          </TouchableHighlight>
          <View style={styles.infocontainer}>
            <Text style={styles.infotxt}>机型参数信息清单</Text>
            <Text style={{fontWeight: 'bold'}}>{device.name}</Text>
            <Text>{`<${device.id}>`}</Text>
          </View>
        </View>):null);
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#FFFFFF',
  },

  devicecontainer: {
    flexDirection: 'row',
    //flex:1,
    height: 120,
    marginTop: 10,
    marginLeft: 30,
    borderColor: '#ccc',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  imagecontainer: {
    width: 130,
    height: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    borderRadius: 10,
    elevation: 10,
  },
  imagetxt: {
    fontSize: 15,
  },
  infocontainer: {
    marginTop: -50,
    marginLeft: 50,
  },
  infotxt: {
    fontSize: 15,
  },
});
export default BluetoothDeviceList;
