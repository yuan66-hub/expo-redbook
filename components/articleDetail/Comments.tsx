import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import dayjs from 'dayjs';
import Heart from '../home/Heart';
import { HOST } from '@/utils/const';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
export default function Comments({
  comments = [],
  userInfo = {},
}: {
  comments: ArticleComment[],
  userInfo: any,
}) {
  const count = comments.length || 0;
  return (
    <>
      <Text style={styles.commentsCountTxt}>
        {count ? `共 ${count} 条评论` : '暂无评论'}
      </Text>
      <View style={styles.inputLayout}>
        <Image
          style={styles.userAvatarImg}
          source={{ uri: `${HOST}${userInfo.avatar}` }}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="说点什么吧，万一火了呢～"
          placeholderTextColor={'#bbb'}
        />
      </View>

      {!!count && (
        <View style={styles.commentsContainer}>
          {comments?.map((i: ArticleComment, index: number) => {
            return (
              <View key={`${index}`} style={{}}>
                <View style={styles.commentItem}>
                  <Image
                    style={styles.cAvatar}
                    source={{ uri: `${HOST}${i.avatarUrl}` }}
                  />
                  <View style={styles.contentLayout}>
                    <Text style={styles.nameTxt}>{i.userName}</Text>
                    <Text style={styles.messageTxt}>
                      {i.message}
                      <Text style={styles.timeLocationTxt}>
                        {dayjs(i.dateTime).format('MM-DD')} {i.location}
                      </Text>
                    </Text>

                    {!!i.children?.length &&
                      i.children.map((j: ArticleComment, subIndex: number) => {
                        return (
                          <View
                            key={`${index}-${subIndex}`}
                            style={[
                              styles.commentItem,
                              { marginTop: 12, width: SCREEN_WIDTH - 80 },
                            ]}
                          >
                            <Image
                              style={[
                                styles.cAvatar,
                                { width: 32, height: 32 },
                              ]}
                              source={{ uri: `${HOST}${j.avatarUrl}` }}
                            />
                            <View style={styles.contentLayout}>
                              <Text style={styles.nameTxt}>{j.userName}</Text>
                              <Text style={styles.messageTxt}>
                                {j.message}
                                <Text style={styles.timeLocationTxt}>
                                  {dayjs(j.dateTime).format('MM-DD')}{' '}
                                  {j.location}
                                </Text>
                              </Text>
                            </View>

                            <View style={styles.countLayout}>
                              <Heart size={20} value={j.isFavorite} />
                              <Text style={styles.fCount}>
                                {j.favoriteCount}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                  </View>

                  <View style={styles.countLayout}>
                    <Heart size={20} value={i.isFavorite} />
                    <Text style={styles.fCount}>{i.favoriteCount}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  commentsCountTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginLeft: 16,
  },
  inputLayout: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  commentInput: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  commentItem: {
    width: '100%',
    flexDirection: 'row',
  },
  cAvatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
  },
  messageTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  timeLocationTxt: {
    fontSize: 12,
    color: '#bbb',
  },
  countLayout: {
    alignItems: 'center',
  },
  fCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    marginLeft: 50,
    marginRight: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
});
