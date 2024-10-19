/*
 * @Author: 'yuanjianming' '1743394015@qq.com'
 * @Date: 2024-10-19 15:52:57
 * @LastEditors: 'yuanjianming' '1743394015@qq.com'
 * @LastEditTime: 2024-10-19 16:37:33
 * @FilePath: \expo-redbook\components\mine\Tabs.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MineContext } from './Provider';
export default function Tabs() {
  const { tabIndex, setTabIndex } = useContext(MineContext) as any;

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0);
        }}
      >
        <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
          笔记
        </Text>
        {tabIndex === 0 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1);
        }}
      >
        <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
          收藏
        </Text>
        {tabIndex === 1 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2);
        }}
      >
        <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
          赞过
        </Text>
        {tabIndex === 2 && <View style={styles.line} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: -10,
  },
  icon: {
    width: 28,
    height: 28,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
  tabButton: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  tabTxt: {
    fontSize: 17,
    color: '#999',
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333',
  },
});
