import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native'
import WaterfallFlow from 'react-native-waterfall-flow' // 基于FlatList瀑布流组件
import CategoryList from '@/components/home/CategoryList';
import Footer from '@/components/home/Footer';
import TitleBar from '@/components/home/TitleBar';
import { useCallback, useEffect, useState } from 'react';
import ArticleItem from '@/components/home/ArticleItem';
import request from '@/utils/request';
import { DEFAULT_CATEGORY_LIST } from '@/data/category'

export default function Home() {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [articlesList,setData] = useState<ArticleSimple[]>([])
    const [page,setPage] = useState<number>(1)
    const [finish,setFinish] = useState<boolean>(false)

    const refreshNewData =  useCallback(()=>{
        setData([])
        setFinish(false)
        setPage(1)
        fetchPage()
     },[])
    const loadMoreData = () => { 
        fetchPage()
    }
    const fetchPage = async () => {
        if(refreshing || finish){
            return
        }
        const { items=[],total=0 } = await request.get('api/home/articles', {
            data: {
                page,
                pageSize: 10
            }
        }) as any
        setData([...articlesList,...items])
        if(articlesList.length < total){
            setPage(page+1)
        }else{
            setFinish(true)
        }
        
    }
    // 初始化
    useEffect(()=>{  
        fetchPage()
    },[])
    return (
        <View style={styles.root}>
            {/* 头部 */}
            <TitleBar tab={1} />
            {/* 滚动区域*/}
            {/* @ts-ignore */}
            <WaterfallFlow
                style={styles.flatList}
                data={articlesList} //瀑布流数据源，可以是任意内容的数组
                keyExtractor={(item: ArticleSimple) => `${item.id}`}
                extraData={[refreshing]}
                contentContainerStyle={styles.container}
                renderItem={ArticleItem}
                numColumns={2}
                refreshing={refreshing}
                onRefresh={refreshNewData}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreData}
                ListFooterComponent={<Footer finish={finish} />}
                ListHeaderComponent={
                    <CategoryList
                        categoryList={DEFAULT_CATEGORY_LIST}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    flatList: {
        width: '100%',
        height: '100%',
    },
    container: {},
})