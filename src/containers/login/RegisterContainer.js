import React from 'react';
import {SafeAreaView, StyleSheet,Text} from 'react-native';

const RegisterContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>注册RegisterContainer</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RegisterContainer;
