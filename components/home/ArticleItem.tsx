/*
 * @Author: 'yuanjianming' '1743394015@qq.com'
 * @Date: 2024-10-19 15:52:57
 * @LastEditors: 'yuanjianming' '1743394015@qq.com'
 * @LastEditTime: 2024-10-19 19:29:47
 * @FilePath: \expo-redbook\components\home\ArticleItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import ResizeImage from '../ResizeImage';
import Heart from '@/components/home/Heart';
import { HOST } from '@/utils/const';
import { router } from 'expo-router';
interface IProps {
  item: ArticleSimple;
  index: number;
}

export default function ArticleItem({ item, index }: IProps) {
  const onArticlePress = (item: ArticleSimple) => {
    return () => {
      router.push(`/articleDetail?id=${item.id}`);
    };
  };
  const host = HOST;
  return (
    <TouchableOpacity style={styles.item} onPress={onArticlePress(item)}>
      <ResizeImage uri={`${host}${item.images[0]}`} />
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.nameLayout}>
        <Image
          style={styles.avatarImg}
          source={{ uri: `${host}${item.avatarUrl}` }}
        />
        <Text style={styles.nameTxt}>{item.userName}</Text>
        <Heart value={item.isFavorite} />
        <Text style={styles.countTxt}>{item.favoriteCount}</Text>
      </View>
    </TouchableOpacity>
  );
}
const SCREEN_WIDTH = Dimensions.get('screen').width; // 获取应用窗口的宽度
const styles = StyleSheet.create({
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
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
});
