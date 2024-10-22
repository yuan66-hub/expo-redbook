import {
      View,
      Image,
      StyleSheet
} from 'react-native'
import icon_logo_main from '@/assets/images/welcome/icon_main_logo.png';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Welcome(){
      useEffect(()=>{
      //  TODO: 数据预加载
      setTimeout(()=>{
            router.push('/(tabs)/home')
      },3000)
      },[])

      return (
            <View style={styles.root}>
                  <Image style={styles.logo_main} source={icon_logo_main} />
            </View>
      )
}


const styles = StyleSheet.create({
      root: {
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
      },
      logo_main: {
          width: 200,
          height: 105,
          marginTop: 200,
          resizeMode: 'contain',
      },
  });
  