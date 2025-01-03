import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  useEffect,
} from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {transformStyles} from '@utils/index';

type SlideDirection = 'top' | 'bottom';

interface CustomModalProps {
  children: ReactNode;
  modalContentWrapStyle?: StyleProp<ViewStyle>;
  slideDirection?: SlideDirection;
}

export interface CustomModalRef {
  open: () => void;
  close: () => void;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>(
  (props, ref) => {
    const {slideDirection = 'bottom'} = props;
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(
      new Animated.Value(
        slideDirection === 'bottom' ? SCREEN_HEIGHT : -SCREEN_HEIGHT,
      ),
    )[0];

    // 动画配置
    const animationConfig = {
      duration: 300,
      useNativeDriver: true,
    };

    // 打开动画
    const fadeIn = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          ...animationConfig,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          ...animationConfig,
        }),
      ]).start();
    };

    // 关闭动画
    const fadeOut = (callback: () => void) => {
      const slideToValue =
        slideDirection === 'bottom' ? SCREEN_HEIGHT : -SCREEN_HEIGHT;

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(slideAnim, {
          toValue: slideToValue,
          ...animationConfig,
        }),
      ]).start(callback);
    };

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsVisible(true);
      },
      close: () => {
        handleClose();
      },
    }));

    // 处理关闭
    const handleClose = () => {
      fadeOut(() => {
        setIsVisible(false);
      });
    };

    // 监听显示状态变化，触发动画
    useEffect(() => {
      if (isVisible) {
        fadeIn();
      }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Pressable style={styles.backdrop} onPress={handleClose} />
        </Animated.View>

        <Animated.View
          style={[
            props.modalContentWrapStyle,
            {
              transform: [{translateY: slideAnim}],
            },
            slideDirection === 'top' && styles.topPosition,
          ]}>
          <Pressable>{props.children}</Pressable>
        </Animated.View>
      </View>
    );
  },
);

CustomModal.displayName = 'CustomModal';

const styles = transformStyles({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentWrapper: {
    backgroundColor: '#FFF',
    // borderRadius: 12,
    paddingHorizontal: 20,
    minWidth: 300,
    // 添加阴影效果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default CustomModal;
