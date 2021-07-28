import React from 'react';
import {
  SafeAreaView, 
  StyleSheet, 
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import BluetoothConnectComponent from '../../components/BluetoothConnectComponent';
import * as ScreenUtil from '../../utils/ScreenUtil';

const{width, height, scale} = Dimensions.get('window');

const BluetoothConnnectContainer = ({navigation}) => {
  let data = useSelector((state) => state.enabled);
  return (
    <SafeAreaView style={styles.container}>
      {/* 标题栏 */}
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require("../../img/backleft.png")}
            style={styles.backbtn}/>
        </TouchableOpacity>
        <Text style={styles.title}>添加设备</Text>
      </View>
      <ScrollView >
      <BluetoothConnectComponent isable ={data}/>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor:"#FFFFFF",
    flexDirection:"column"
  },
  topbar:{
    width,
    height:ScreenUtil.scaleHeight(50),
    backgroundColor:"#2C65F7",
    flexDirection:"row"
  },
  title:{
    fontSize:ScreenUtil.setSpText(18),
    color:"#FFFFFF",
    marginLeft:ScreenUtil.scaleSize(114),
    marginTop:ScreenUtil.scaleHeight(14)
  },
  backbtn:{
    width:ScreenUtil.scaleSize(13),
    height:ScreenUtil.scaleHeight(21),
    marginLeft:ScreenUtil.scaleSize(16),
    marginTop:ScreenUtil.scaleHeight(14)
  },
  fixedFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  button: {
    height: ScreenUtil.scaleHeight(36),
    margin: 5,
    paddingHorizontal: ScreenUtil.scaleSize(16),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#7B1FA2',
    fontWeight: 'bold',
    fontSize: ScreenUtil.setSpText(14)
  },
  buttonRaised: {
    backgroundColor: '#7B1FA2',
    borderRadius: 2,
    elevation: 2
  }
});
export default BluetoothConnnectContainer;
