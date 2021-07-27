import React from 'react';
import {SafeAreaView, StyleSheet,Text} from 'react-native';

const ForgetContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ForgetContainer</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ForgetContainer;