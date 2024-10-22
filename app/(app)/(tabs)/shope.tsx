import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native'
import {
    useSafeAreaInsets
} from 'react-native-safe-area-context';
import Header from '@/components/shope/Header';
import Goods from '@/components/shope/Goods';
import ListHeader from '@/components/shope/ListHeader';
import request from '@/utils/request';

export default function Shope(){
    const [categoryList,setCategoryList] =useState<GoodsCategory[]>([])
    const [goodsList,setGoodsList] =useState<GoodsSimple[]>([])
       // 获取状态栏的高度
    const insets = useSafeAreaInsets();
    // 获取前十商品类目
    const onGetTop10CategoryList = async () =>{
         const data= await request.get('api/shope/top10Category',{}) as GoodsCategory[] 
         setCategoryList(data)
    }
    // 获取商品列表
    const onGetGoodsList = async () => {
        const { items=[] }= await request.get('api/shope/goodsList',{
            data: {
                page:1,
                pageSize:20
            }
        }) as { items:GoodsSimple[]  } 
        setGoodsList(items)
    }
    useEffect(()=>{        
        Promise.all([onGetGoodsList(),onGetTop10CategoryList()])
    },[])
    return (
        <View style={{...styles.root, paddingTop:insets.top}}>
           <Header></Header>
            <FlatList
                style={{flex: 1}}
                data={goodsList}
                keyExtractor={(item) => `${item.id}`}
                extraData={[]}
                renderItem={Goods}
                numColumns={2}
                ListHeaderComponent={<ListHeader categoryList={categoryList} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
})