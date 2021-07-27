import React from 'react';
import {SafeAreaView, StyleSheet,Text, Button} from 'react-native';

const LoginContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>登录LoginContainer</Text>
      <Button
        title="登录"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('home');
        }}>
      </Button>
      <Button
        title="注册"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('register');
        }}>
      </Button>
      <Button
        title="忘记密码"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('foget');
        }}>
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LoginContainer;
