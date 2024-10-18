import { useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'

import icon_menu from '@/assets/images/mine/icon_menu.png';
import icon_shop_car from '@/assets/images/shope/icon_shop_car.png';
import icon_share from '@/assets/images/mine/icon_share.png';
import SideMenu from './SideMenu';


export default function Header() {
    const sideMenuRef = useRef<any>()
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
                <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_shop_car} />
                <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_share} />
            </View>
            <SideMenu ref={sideMenuRef}></SideMenu>
        </>

    )
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
})