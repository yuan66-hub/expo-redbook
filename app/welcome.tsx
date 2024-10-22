import {
      View,
      Image,
      StyleSheet
} from 'react-native'
import icon_logo_main from '@/assets/images/welcome/icon_main_logo.png';

export default function Welcome(){

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
  