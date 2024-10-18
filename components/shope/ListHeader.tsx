import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import { HOST } from '@/utils/const';
export default function ListHeader({ categoryList }:{ categoryList:GoodsCategory[] }){
    return (
        <View style={styles.container}>
        {categoryList.map((item, index) => {
            return (
                <View key={`${index}`} style={styles.categoryItem}>
                    <Image
                        style={styles.itemImg}
                        source={{ uri: `${HOST}${item.image}` }}
                    />
                    <Text style={styles.itemNameTxt}>{item.name}</Text>
                </View>
            );
        })}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center',
        flexWrap: 'wrap',
    },
    categoryItem: {
        width: '19%',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemImg: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    itemNameTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
    },
})