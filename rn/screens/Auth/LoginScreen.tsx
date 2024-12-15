import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
} from 'react-native';
import {
  commonStyles,
  startShakeAnimation,
  transformStyles,
  validateEmail,
} from '@utils/index';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { translations } from '@utils/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@store/type';
import { checkCode } from '@store/thunks';
import { setIsLoggedIn } from '@store/actions';
// import { Observer } from 'mobx-react';

export default function LoginScreen() {
  const [isSending, setIsSending] = useState(false); // 控制按钮发送状态
  const [countdown, setCountdown] = useState(60); // 倒计时状态
  const [codes, setCodes] = useState(['', '', '', '', '']); // 存储验证码值
  const inputRefs = useRef<TextInput[]>([]); // 存储输入框引用
  const verificationInputs = useRef<TextInput[]>([]);
  const [email, setEmail] = useState('');
  const [isValidCode, setCodeValidate] = useState(true);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [showProto, setShowProtoBtn] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const proto = useRef({
    title: translations.proto.zh.title,
    content: translations.proto.zh.content
  })

  const isLoggedIn = useSelector((state: GlobalState) => state.isLoggedIn);
  const isLogIning = useSelector((state: GlobalState) => state.isLogIning);
  const dispatch = useDispatch();

  const handleSendCode = () => {
    if (!validateEmail(email)) {
      startShakeAnimation(shakeAnimation); // 触发抖动效果
    } else {
      setIsSending(true);
      let remainingTime = 60;

      // 启动倒计时
      const interval = setInterval(() => {
        remainingTime -= 1;
        setCountdown(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          setIsSending(false);
          setCountdown(60);
        }
      }, 1000);

      // 将光标聚焦到第一个输入框
      verificationInputs.current[0]?.focus();
    }
  };

  const handleSubmitCode = async (newCodes: string[]) => {
    const fullCode = newCodes.join('');
    if (fullCode.length !== 5) {
      Alert.alert('提示', '请输入完整的验证码');
      return;
    }

    setIsSending(true); // 禁用交互
    try {
      const isValid = await dispatch(checkCode(fullCode)); // 正确调用 Thunk

      if (isValid) {
        setCodeValidate(true);
        dispatch(setIsLoggedIn(true)); // 更新 Redux 状态
        Alert.alert('验证成功', '您已成功登录！');
        // navigation.navigate('Main'); // 跳转到主页面
      } else {
        Alert.alert('验证失败', '验证码错误，请重试');
        startShakeAnimation(shakeAnimation); // 触发动画效果
      }
    } catch (error) {
      console.error('验证码验证失败', error);
      Alert.alert('验证失败', '发生错误，请稍后再试');
    } finally {
      setIsSending(false); // 恢复交互
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // inputRefs.current[codes.indexOf('')]?.focus(); // 聚焦到第一个空元素
    if (key === 'Backspace' && codes[index] === '') {
      // 如果按下删除键且当前输入框为空
      if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // 聚焦到前一个输入框
        const newCodes = [...codes];
        newCodes[index - 1] = '';
        setCodes(newCodes);
      }
    }
  };

  const handleChangeText = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;

    if (text.length > 0 && index < codes.length - 1) {
      // 输入完成后聚焦到下一个输入框
      inputRefs.current[index + 1]?.focus();
    }

    setCodes(newCodes);

    if (newCodes.indexOf('') > -1) {
      inputRefs.current[newCodes.indexOf('')]?.focus(); // 聚焦到第一个空元素
    } else {
      // 验证码输完了
      handleSubmitCode(newCodes);
      inputRefs.current[newCodes.length - 1]?.blur(); // 聚焦到第一个空元素
    }
  };



  return (
    <GestureHandlerRootView>
      {isLogIning && <></>}
      {!isLoggedIn && (
        <ImageBackground
          source={require('@assets/images/login/background.png')}>
          <View style={styles.wrapper}>
            <Image
              source={require('@assets/images/login/icon.png')}
              style={styles.logo}
            />
            <View style={styles.formContainer}>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  { transform: [{ translateX: shakeAnimation }] },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </Animated.View>
              <TouchableOpacity onPress={handleSendCode} disabled={isSending}>
                <Text
                  style={[
                    styles.buttonText,
                    isSending && styles.disabledButton,
                  ]}>
                  {isSending ? `重新发送${countdown}s` : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.verificationCodeContainer}>
              {codes.map((code, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref!)} // 保存输入框引用
                  style={styles.verificationCodeBox}
                  value={code}
                  onChangeText={text => handleChangeText(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  maxLength={1} // 限制每个输入框只能输入一个字符
                  keyboardType="number-pad" // 限制为数字键盘
                  selectionColor={commonStyles.colors.primary}
                />
              ))}
            </View>
            <TouchableOpacity onPress={() => {
              if (isValidCode) {
                bottomSheetRef.current?.expand();
                setShowProtoBtn(true)
              }
            }}>
              <Text style={styles.agreeButton}>
                阅读并同意《spirituallife用户协议》
              </Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // 初始状态关闭
        snapPoints={['80%']} // 弹窗高度选项
        enablePanDownToClose={true} // 允许下滑关闭
        onChange={(index: number) => {
          console.log('handleSheetChanges', index);
          if (index === -1) {
            setShowProtoBtn(false)
          }
        }}
      >
        {/* 弹窗内容 */}
        <BottomSheetScrollView style={styles.contentContainer}>
          <Text style={styles.contentTextTitle}>{proto.current.title}</Text>
          <Text style={styles.contentTextContent}>{proto.current.content}</Text>
        </BottomSheetScrollView>
      </BottomSheet>

      {showProto && (
        <View style={styles.contentTextBtn}>
          <TouchableOpacity onPress={() => {
            proto.current.title = translations.proto.en.title
            proto.current.content = translations.proto.en.content
          }}>
            <Text style={styles.contentButtonTextEng}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            dispatch(setIsLoggedIn(true))
            // navigation.navigate('Main')
          }}>
            <Text style={styles.contentButtonTextLogin}>同意并登录</Text>
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = transformStyles({
  wrapper: {
    marginTop: 104,
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: 15
  },
  formContainer: {
    width: '100%',
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  input: {
    width: 224,
    height: 44,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 16,
  },
  verificationCodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 36,
    marginBottom: 44,
  },
  verificationCodeBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    textAlign: 'center',
    // fontSize: 18,
    marginHorizontal: 15,
  },
  disabledButton: {
    ...commonStyles.button.disableButton,
  },
  buttonText: {
    ...commonStyles.button.lightButton,
    height: 44,
    lineHeight: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  agreeButton: {
    ...commonStyles.button.lightButton,
    paddingVertical: 13,
    // paddingHorizontal: 53,
    marginHorizontal: 45
  },

  contentContainer: {
    marginTop: 22,
    paddingHorizontal: 25,
    position: 'relative',
  },
  contentTextTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  contentTextContent: {
    paddingBottom: 90,
  },
  contentTextBtn: {
    // marginBottom: 200,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 30,
    width: '100%'
  },
  contentButtonTextEng: {
    ...commonStyles.button.whiteButton,
    paddingHorizontal: 30,
    paddingVertical: 13,
    marginRight: 30,
  },
  contentButtonTextLogin: {
    ...commonStyles.button.lightButton,
    paddingHorizontal: 80,
    paddingVertical: 13,
  },
});
