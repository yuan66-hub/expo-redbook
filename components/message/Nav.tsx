import { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import icon_group from '@/assets/images/message/icon_group.png';
import FloatMenu, { FloatMenuRef } from './FloatMenu';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Nav() {
  // 获取状态栏的高度
  const insets = useSafeAreaInsets();
  const ref = useRef<FloatMenuRef>(null);
  return (
    <>
      <View style={{ ...styles.titleLayout, paddingTop: insets.top }}>
        <Text style={styles.titleTxt}>消息</Text>
        <TouchableOpacity
          style={{ ...styles.groupButton, top: insets.top }}
          onPress={(event: GestureResponderEvent) => {
            const { pageY } = event.nativeEvent;
            ref.current?.show(pageY);
          }}
        >
          <Image style={styles.iconGroup} source={icon_group} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
      <FloatMenu ref={ref}></FloatMenu>
    </>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupButton: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconGroup: {
    width: 16,
    height: 16,
  },
  groupTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
});
