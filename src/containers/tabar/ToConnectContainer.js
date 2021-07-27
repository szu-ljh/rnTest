import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
const ToConnectContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>设备ToConnectContainer</Text>
      <Button 
        title='添加设备'
        onPress={()=>{
          navigation.navigate('home');
        }}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ToConnectContainer;
