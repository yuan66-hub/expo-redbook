import { HOST } from '@/utils/const';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH - 20 >> 1;

export default function Goods({ item, index }: { item: GoodsSimple,index:number }) {    
    return (
        <View style={styles.item}>
            <Image style={styles.img} source={{ uri: `${HOST}${item.image}` }} />
            <Text style={styles.titleTxt} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.prefix}>
                ¥
                <Text style={styles.priceTxt}>{item.price}{!!item.originPrice && <Text style={styles.originTxt}>原价：{item.originPrice}</Text>}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: ITEM_WIDTH,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 6,
    },
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
        height:40
    },
    prefix: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 4,
    },
    priceTxt: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    originTxt: {
        fontSize: 13,
        color: '#999',
        fontWeight: 'normal',
        textDecorationLine:'line-through',
        marginLeft:2
    },
    promotionTxt: {
        width: 78,
        fontSize: 12,
        color: '#999',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bbb',
        textAlign: 'center',
        marginTop: 4,
    },
});