import {
    Text,
    StyleSheet,
} from 'react-native'

export default  function Footer() {
    return (
        <Text style={styles.footerTxt}>没有更多数据</Text>
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