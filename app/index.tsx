import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native'
import Toast from "@/components/widget/Toast";
import Loading from "@/components/widget/Loading";
import { useRouter } from 'expo-router';
import request from "@/utils/request";
import { formatPhone, replaceBlank } from '@/utils/util';
import icon_logo_main from '@/assets/images/login/icon_main_logo.png';
import icon_unselected from '@/assets/images/login/icon_unselected.png';
import icon_selected from '@/assets/images/login/icon_selected.png';
import icon_arrow from '@/assets/images/login/icon_arrow.png';
import icon_wx_small from '@/assets/images/login/icon_wx_small.png';
import icon_triangle from '@/assets/images/login/icon_triangle.png';
import icon_eye_open from '@/assets/images/login/icon_eye_open.png';
import icon_eye_close from '@/assets/images/login/icon_eye_close.png';
import icon_exchange from '@/assets/images/login/icon_exchange.png';
import icon_wx from '@/assets/images/login/icon_wx.png';
import icon_qq from '@/assets/images/login/icon_qq.webp';
import icon_close_modal from '@/assets/images/login/icon_close_modal.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Index() {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [canLogin, setCanLogin] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  const router = useRouter();
  // 登录
  const onLoginPress = async () => {
    const canLogin = phone?.length === 13 && pwd?.length === 6;
    if (!check || !canLogin) {
      ToastAndroid.show('未勾选同意《用户协议》和《隐私政策》',ToastAndroid.SHORT)
      return
    }
    if(loading) return
    setLoading(true)
    try {
      const data = await request.post('api/auth/login', {
        data:{
          username: replaceBlank(phone),
          password: pwd,
        }
      })
      await AsyncStorage.setItem('userinfo', JSON.stringify(data));
      router.replace('/(tabs)/home')
    } catch (error:any) {
      ToastAndroid.show(error.message || '未知错误',ToastAndroid.SHORT)
    }
    setLoading(false)
  }
  useEffect(()=>{
    setCanLogin(phone?.length === 13 && pwd?.length === 6)
  },[phone,pwd])
  // 快捷登录方式
  const renderQuickLogin = () => {


    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080'
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{ rotate: '180deg', }]
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      <View style={styles.root}>
        {/* 隐私协议用户协议 */}
        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}
          >
            <Image
              style={allStyles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />

          </TouchableOpacity>
          <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com')
            }}
          >
            <Text style={allStyles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}
        >
          <Text style={styles.otherLoginTxt}>其它登陆方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wxLoginButton}
          activeOpacity={0.7}
        >
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginTxt}>微信登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.oneKeyLoginButton}
          activeOpacity={0.7}
          onPress={() => {
            router.push('/(tabs)/home')
          }}
        >
          <Text style={styles.oneKeyLoginTxt}>一键登陆</Text>
        </TouchableOpacity>
        <Image style={styles.logoMain} source={icon_logo_main} />
      </View>
    )
  }
  // 手机号输入方式
  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 68,
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginButtonDisable: {
        width: '100%',
        height: 56,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      iconWx: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 36,
        top: 48,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    })
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登陆</Text>
        <Text style={styles.tip}>
          未注册的手机号登陆成功后将自动注册
        </Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor="#bbb"
            placeholder='请输入手机号码'
            autoFocus={false}
            keyboardType='number-pad'
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
          />
        </View>

        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder='输入密码'
            autoFocus={false}
            keyboardType='number-pad'
            maxLength={6}
            secureTextEntry={!eyeOpen}
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen)
            }}
          >
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginTxt}>验证码登陆</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
        </View>

        <TouchableOpacity
          activeOpacity={canLogin ? 0.7 : 1}
          style={canLogin ? styles.loginButton : styles.loginButtonDisable}
          onPress={onLoginPress}
        >
          <Text style={styles.loginTxt}>登陆</Text>
        </TouchableOpacity>

        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}
          >
            <Image
              style={allStyles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com')
            }}
          >
            <Text style={allStyles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wxqqLayout}>
          <Image style={styles.iconWx} source={icon_wx} />
          <Image style={styles.iconQQ} source={icon_qq} />
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick')
          }}
        >
          <Image style={styles.closeImg} source={icon_close_modal} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={allStyles.root}>
      {
        loginType === 'quick' ? renderQuickLogin() : renderInputLogin()
      }
    </View>
  )
}

const allStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  lableTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
});