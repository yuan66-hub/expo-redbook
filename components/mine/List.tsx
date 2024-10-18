import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import Empty from '../Empty';
import Heart from '../home/Heart';
import icon_no_note from '@/assets/images/mine/icon_no_note.webp';
import icon_no_collection from '@/assets/images/message/icon_no_collection.webp';
import icon_no_favorate from '@/assets/images/mine/icon_no_favorate.webp';
import { useContext, useEffect, useState } from 'react';
import { MineContext } from './Provider';
import { HOST } from '@/utils/const';

const EMPTY_CONFIG = [
    {icon: icon_no_note, tips: '快去发布今日的好心情吧～'},
    {icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～'},
    {icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～'},
];



const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function List({ noteList, collectionList, favorateList }:any){
    const [currentList,setList] = useState<any[]>([])
    const { tabIndex } = useContext(MineContext) as any
    
    useEffect(()=>{
        const  list = [noteList, collectionList, favorateList][tabIndex];
        setList(list)
    },[tabIndex,favorateList,collectionList,noteList])
    const onArticlePress = (item:any) =>{ return ()=>{} }
    if (!currentList?.length) {
        const config = EMPTY_CONFIG[tabIndex];
        return <Empty icon={config.icon} tips={config.tips} />
    }
  
    return (
        <View style={styles.listContainer}>
        {currentList.map((item:any, index:number) => {
            return (
                <TouchableOpacity
                    key={`${item.id}-${index}`}
                    style={styles.item}
                    onPress={onArticlePress(item)}
                >
                    <Image style={styles.itemImg} source={{uri: `${HOST}${item.images[0]}` }} />
                    <Text style={styles.titleTxt}>{item.title}</Text>
                    <View style={styles.nameLayout}>
                        <Image style={styles.avatarImg} source={{ uri: `${HOST}${item.avatarUrl}` }} />
                        <Text style={styles.nameTxt}>{item.userName}</Text>
                        <Heart
                            value={item.isFavorite}
                        />
                        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
    </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
    },
    item: {
        width: SCREEN_WIDTH - 18 >> 1,
        backgroundColor: 'white',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 10,
        marginVertical: 4,
    },
    nameLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    avatarImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    nameTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
        flex: 1,
    },
    heart: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    countTxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4,
    },
    itemImg: {
        width: SCREEN_WIDTH - 18 >> 1,
        height: 240,
    },
})