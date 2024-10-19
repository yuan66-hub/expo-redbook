import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Nav from '@/components/articleDetail/Nav';
import Images from '@/components/articleDetail/Images';
import Info from '@/components/articleDetail/Info';
import Comments from '@/components/articleDetail/Comments';
import Bottom from '@/components/articleDetail/Bottom';
import request from '@/utils/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

import { useLocalSearchParams } from 'expo-router';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function ArticleDetail() {
  const [detail, setDetail] = useState<Article>({} as Article);
  const [userInfo, setUserInfo] = useState<any>();
  const [fetched, setFetched] = useState<boolean>(false);
  const { id } = useLocalSearchParams();

  const onGetDetail = async () => {
    const data = (await request.get('api/home/articleDetail', {
      data: {
        id: id || 1,
      },
    })) as Article;
    setDetail(data);
  };
  const onGetUserInfo = async () => {
    const data = (await AsyncStorage.getItem('userinfo')) as any;
    setUserInfo(JSON.parse(data));
  };
  useEffect(() => {
    (async () => {
      await Promise.all([onGetDetail(), onGetUserInfo()]);
      setFetched(true);
    })();
  }, []);
  return (
    <View style={styles.root}>
      <Nav
        avatarUrl={detail?.avatarUrl || ''}
        userName={detail?.userName || ''}
      ></Nav>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Images images={detail?.images || []}></Images>
        <Info detail={detail} tags={detail?.tag || []}></Info>
        <Comments
          comments={detail?.comments || []}
          userInfo={userInfo}
        ></Comments>
      </ScrollView>
      <Bottom detail={detail}></Bottom>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
