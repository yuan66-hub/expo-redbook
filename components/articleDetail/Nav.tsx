import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import icon_arrow from '@/assets/images/home/icon_arrow.png';
import icon_share from '@/assets/images/mine/icon_share.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HOST } from '@/utils/const';
export default function Nav({
  avatarUrl = '',
  userName = '',
}: {
  avatarUrl: string,
  userName: string,
}) {
  // 获取状态栏的高度
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={{ ...styles.titleLayout, paddingTop: insets.top + 4 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image style={styles.backImg} source={icon_arrow} />
      </TouchableOpacity>
      <Image style={styles.avatarImg} source={{ uri: `${HOST}${avatarUrl}` }} />
      <Text style={styles.userNameTxt}>{userName}</Text>
      <Text style={styles.followTxt}>关注</Text>
      <Image style={styles.shareImg} source={icon_share} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  userNameTxt: {
    fontSize: 15,
    flex: 1,
    color: '#333',
    marginLeft: 16,
  },
  followTxt: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    width: 28,
    height: 28,
    marginHorizontal: 16,
  },
});
