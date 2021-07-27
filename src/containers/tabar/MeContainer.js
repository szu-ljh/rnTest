import React from 'react';
import { SafeAreaView, StyleSheet,Text,Button} from 'react-native';

const MeContainer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>我的MeContainer</Text>
      <Button
        title="退出登录"
        onPress={()=>{navigation.navigate('login')}}>
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MeContainer;
