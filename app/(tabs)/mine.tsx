import { Text, Image, View, StyleSheet, ScrollView, RefreshControl } from "react-native"
import Header from "@/components/mine/Header"
import { useEffect, useRef, useState } from "react";
import Info from "@/components/mine/Info";
import Tabs from "@/components/mine/Tabs";
import List from "@/components/mine/List";
import icon_mine_bg from '@/assets/images/mine/icon_mine_bg.png';
import {
    useSafeAreaInsets
} from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "@/utils/request";
import Provider from "@/components/mine/Provider";

export default function Mine() {
    const [bgImgHeight, setBgImgHeight] = useState<number>(400);
    const [userInfo, setUserInfo] = useState<any>({})
    const [info, setInfo] = useState<any>({})
    const [favorateList, setFavorateList] = useState<any>({})
    // 获取状态栏的高度
    const insets = useSafeAreaInsets();

    const onGetUserInfo = async () => {
        const data = await AsyncStorage.getItem('userinfo') as any
        setUserInfo(JSON.parse(data))
    }

    const onGetInfo = async () => {
        const data = await request.get('api/user/accountInfo', {})
        setInfo(data)
    }
    // 获取点赞列表
    const onFavorateList = async () => {
        const data = await request.get('api/home/favorate', {})        
        setFavorateList(data)
    }

    useEffect(() => {
        Promise.all([onGetUserInfo(), onGetInfo(), onFavorateList()])
    }, [])



    return (
        <Provider>
            <View style={{ ...styles.root, paddingTop: insets.top }}>
                <Image
                    style={[styles.bgImg, { height: bgImgHeight + 64 }]}
                    source={icon_mine_bg}
                />
                <Header></Header>
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => { }}
                        />
                    }
                >
                    <Info setBgImgHeight={setBgImgHeight} userInfo={userInfo} info={info}></Info>
                    <Tabs ></Tabs>
                    <List noteList={[]} collectionList={[]} favorateList={favorateList} ></List>
                </ScrollView>
            </View>
        </Provider>

    )
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 400,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
})