import { View, Image, TextInput, Text, StyleSheet } from 'react-native';
import icon_edit_comment from '@/assets/images/articleDetail/icon_edit_comment.png';
import icon_collection from '@/assets/images/articleDetail/icon_collection.png';
import icon_collection_selected from '@/assets/images/articleDetail/icon_collection_selected.png';
import icon_comment from '@/assets/images/articleDetail/icon_comment.png';

import Heart from '../home/Heart';
export default function Bottom({ detail }: { detail: Article | any }) {
  return (
    <View style={styles.bottomLayout}>
      <View style={styles.bottomEditLayout}>
        <Image style={styles.editImg} source={icon_edit_comment} />
        <TextInput
          style={styles.bottomCommentInput}
          placeholder="说点什么"
          placeholderTextColor={'#333'}
        />
      </View>
      <Heart size={30} value={detail.isFavorite} />
      <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>

      <Image
        style={styles.bottomIcon}
        source={
          detail.isCollection ? icon_collection_selected : icon_collection
        }
      />
      <Text style={styles.bottomCount}>{detail.collectionCount}</Text>

      <Image style={styles.bottomIcon} source={icon_comment} />
      <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomLayout: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomEditLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  editImg: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  bottomCommentInput: {
    height: '100%',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12,
  },
});
