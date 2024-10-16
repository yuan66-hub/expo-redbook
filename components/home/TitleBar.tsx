import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import icon_daily from '@/assets/images/home/icon_daily.png'
import icon_search from '@/assets/images/home/icon_search.png'
import { useEffect, useState } from 'react';
import {
    useSafeAreaInsets
} from 'react-native-safe-area-context';
interface IProps {
    tab: number,
    onTabChanged?: (tabIndex: number) => void;
}

export default function TitleBar({ tab, onTabChanged }: IProps) {
    const [tabIndex, setTabIndex] = useState<number>(1)
    // 获取状态栏的高度
    const insets = useSafeAreaInsets();
    useEffect(()=>{
      setTabIndex(tab)
    },[tab])
    return (
        <View style={{...styles.titleLayout, paddingTop:insets.top}}>
            {/* 每日推荐 */}
            <TouchableOpacity
                style={styles.dailyButton}
            >
                <Image style={styles.icon} source={icon_daily} />
            </TouchableOpacity>
            {/* 关注 */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => {
                    setTabIndex(0);
                    onTabChanged?.(0);
                }}
            >
                <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>关注</Text>
                {tabIndex === 0 && <View style={styles.line} />}
            </TouchableOpacity>
             {/* 发现 */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => {
                    setTabIndex(1);
                    onTabChanged?.(1);
                }}
            >
                <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>发现</Text>
                {tabIndex === 1 && <View style={styles.line} />}
            </TouchableOpacity>
            {/* 广州 */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => {
                    setTabIndex(2);
                    onTabChanged?.(2);
                }}
            >
                <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>广州</Text>
                {tabIndex === 2 && <View style={styles.line} />}
            </TouchableOpacity>
            {/* 搜索 */}
            <TouchableOpacity
                style={styles.searchButton}
            >
                <Image style={styles.icon} source={icon_search} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    titleLayout: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    icon: {
        width: 28,
        height: 28,
    },
    dailyButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12,
        marginRight: 42,
    },
    searchButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
        marginLeft: 42,
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
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabTxt: {
        fontSize: 16,
        color: '#999',
    },
    tabTxtSelected: {
        fontSize: 17,
        color: '#333',
    },
});