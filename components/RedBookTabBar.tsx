import * as ImagePicker from 'expo-image-picker';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import icon_tab_publish from '@/assets/images/tabbar/icon_tab_publish.png';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});

export default function RedBookTabBar(props: any) {
  const { state, descriptors, navigation } = props;
  const { routes, index } = state;
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const pickImageAsync = async () => {
    const { granted } = status as ImagePicker.MediaLibraryPermissionResponse;
    if (!granted) {
      // 获取用户相册权限
      await requestPermission();
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true, // 是否允许编辑图片
        quality: 1, // 图片质量
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // 选取图片类型
      });

      if (!result.canceled) {
        console.log(result);
      } else {
      }
    }
  };
  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route: any, i: number) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;
        if (i === 2) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={pickImageAsync}
            >
              <Image
                style={styles.icon_tab_publish}
                source={icon_tab_publish}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => {
              navigation.navigate(route.name);
            }}
          >
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? '#333' : '#999',
                fontWeight: isFocused ? 'bold' : 'normal',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
