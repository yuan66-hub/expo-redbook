/*
 * @Author: 'yuanjianming' '1743394015@qq.com'
 * @Date: 2024-10-19 15:52:57
 * @LastEditors: 'yuanjianming' '1743394015@qq.com'
 * @LastEditTime: 2024-10-19 19:06:06
 * @FilePath: \expo-redbook\components\mine\Header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import icon_menu from '@/assets/images/mine/icon_menu.png';
import icon_shop_car from '@/assets/images/shope/icon_shop_car.png';
import icon_share from '@/assets/images/mine/icon_share.png';
import SideMenu from './SideMenu';

export default function Header() {
  const sideMenuRef = useRef<any>();
  return (
    <>
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            sideMenuRef.current?.show();
          }}
        >
          <Image style={styles.menuImg} source={icon_menu} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <Image
          style={[styles.menuImg, styles.rightMenuImg]}
          source={icon_shop_car}
        />
        <Image
          style={[styles.menuImg, styles.rightMenuImg]}
          source={icon_share}
        />
      </View>
      <SideMenu ref={sideMenuRef}></SideMenu>
    </>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  menuImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  rightMenuImg: {
    marginHorizontal: 12,
    tintColor: 'white',
  },
});
