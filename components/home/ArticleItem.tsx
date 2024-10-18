import { TouchableOpacity, Text, View, StyleSheet, Dimensions, } from 'react-native'
import { Image } from 'expo-image';
import ResizeImage from '../ResizeImage'
import Heart from '@/components/home/Heart'
interface IProps {
    item: ArticleSimple,
    index: number
}

export default function ArticleItem({ item, index }: IProps) {
    const onArticlePress = (item:ArticleSimple) =>{
        return () =>{}
    }
    const host = 'http://192.168.4.6:3000/'
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={onArticlePress(item)}
        >
            <ResizeImage uri={`${host}${item.images[0]}`} />
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.nameLayout}>
                <Image style={styles.avatarImg} source={{ uri: `${host}${item.avatarUrl}` }} />
                <Text style={styles.nameTxt}>{item.userName}</Text>
                <Heart
                    value={item.isFavorite}
                />
                <Text style={styles.countTxt}>{item.favoriteCount}</Text>
            </View>
        </TouchableOpacity>
    );
}
const SCREEN_WIDTH = Dimensions.get('window').width; // 获取应用窗口的宽度
const styles = StyleSheet.create({
    item: {
        width: SCREEN_WIDTH - 18 >> 1,
        backgroundColor: 'white',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
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
    countTxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4,
    },
})