import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button
} from 'react-native';

const HomeContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <Text>{'HomeContainer'}</Text>
      <Button
        title="体温"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('temp');
      }}>
      </Button>
      <Button
        title="心率"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('ecg');
      }}>
      </Button>
      <Button
        title="血压"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('nbp');
      }}>
      </Button>
      <Button
        title="血氧"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('spo2');
      }}>
      </Button>
      <Button
        title="呼吸"
        onPress={() => {
          console.log('pressed');
          navigation.navigate('resp');
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
export default HomeContainer;
