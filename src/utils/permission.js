import {Platform, PermissionsAndroid} from 'react-native';
export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '是否允许位置权限',
          message: '拒绝后无法获取未配对设备列表',
          buttonNeutral: '稍后询问',
          buttonNegative: '拒绝权限',
          buttonPositive: '允许权限',
        },
      );
      console.log('granted', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission for bluetooth scanning granted');
        return true;
      } else {
        console.log('Location permission for bluetooth scanning revoked');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
}
