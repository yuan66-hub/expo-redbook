import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';

import icon_qrcode from '@/assets/images/mine/icon_qrcode.png';
import icon_add from '@/assets/images/mine/icon_add.png';
import icon_male from '@/assets/images/mine/icon_male.png';
import icon_female from '@/assets/images/mine/icon_female.png';
import icon_setting from '@/assets/images/mine/icon_setting.png';
import { HOST } from '@/utils/const';

export default function Info({
  userInfo,
  info,
  setBgImgHeight,
}: {
  userInfo: any,
  info: any,
  setBgImgHeight: any,
}) {
  const { avatar, nickName, redBookId, desc, sex } = userInfo || {};

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        const { height } = e.nativeEvent.layout;
        setBgImgHeight(height);
      }}
    >
      <View style={styles.avatarLayout}>
        <Image style={styles.avatarImg} source={{ uri: `${HOST}${avatar}` }} />
        <Image style={styles.addImg} source={icon_add} />
        <View style={styles.nameLayout}>
          <Text style={styles.nameTxt}>{nickName}</Text>
          <View style={styles.idLayout}>
            <Text style={styles.idTxt}>小红书号：{redBookId}</Text>
            <Image style={styles.qrcodeImg} source={icon_qrcode} />
          </View>
        </View>
      </View>
      <Text style={styles.descTxt}>{desc}</Text>
      <View style={styles.sexLayout}>
        <Image
          style={styles.sexImg}
          source={sex === 'male' ? icon_male : icon_female}
        />
      </View>
      <View style={styles.infoLayout}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{info.followCount}</Text>
          <Text style={styles.infoLabel}>关注</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{info.fans}</Text>
          <Text style={styles.infoLabel}>粉丝</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{info.favorateCount}</Text>
          <Text style={styles.infoLabel}>获赞与收藏</Text>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.editTxt}>编辑资料</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Image style={styles.settingImg} source={icon_setting} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  avatarImg: {
    width: 96,
    height: 96,
    resizeMode: 'cover',
    borderRadius: 48,
  },
  addImg: {
    width: 28,
    height: 28,
    marginLeft: -28,
    marginBottom: 2,
  },
  nameLayout: {
    marginLeft: 20,
  },
  nameTxt: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  idLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  idTxt: {
    fontSize: 12,
    color: '#bbb',
  },
  qrcodeImg: {
    width: 12,
    height: 12,
    marginLeft: 6,
    tintColor: '#bbb',
  },
  descTxt: {
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 16,
  },
  sexLayout: {
    width: 32,
    height: 24,
    backgroundColor: '#ffffff50',
    borderRadius: 12,
    marginTop: 12,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexImg: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  infoLayout: {
    width: '100%',
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  infoItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoValue: {
    fontSize: 18,
    color: 'white',
  },
  infoLabel: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 6,
  },
  infoButton: {
    height: 32,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  editTxt: {
    fontSize: 14,
    color: '#ffffff',
  },
  settingImg: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
});
