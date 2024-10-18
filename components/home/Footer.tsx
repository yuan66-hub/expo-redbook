import {
    Text,
    StyleSheet,
} from 'react-native'

export default  function Footer({ finish }:{ finish:boolean }) {
    return (
        <Text style={styles.footerTxt}>{ finish?'没有更多数据':'加载中...' }</Text>
    );
}

const styles = StyleSheet.create({
    footerTxt: {
        width: '100%',
        fontSize: 14,
        color: '#999',
        marginVertical: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})