import { Animated, Dimensions, ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// 获取当前屏幕宽度
const { width: screenWidth } = Dimensions.get('window');

// 设计稿的屏幕宽度 (根据你的设计稿宽度调整)
const DESIGN_SCREEN_WIDTH = 390; // 假设设计稿的宽度是375

/**
 * 转换样式的数值单位函数，仅转换指定样式属性。
 * @param styles 样式对象，键为样式类名，值为样式属性的对象。
 * @returns 转换后的样式对象，适配不同屏幕尺寸。
 */
export function transformStyles<
    T extends Record<string, ViewStyle | TextStyle | ImageStyle>
>(styles: T): T {
    // 需要转换的样式属性
    const propertiesToTransform: string[] = ['width', 'height', 'fontSize'];

    // padding 和 margin 子属性匹配规则
    const propertiesToTransformSub: string[] = [
        'padding',
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'margin',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'marginHorizontal',
        'paddingHorizontal',
        'paddingVertical',
        'marginVertical',
    ];

    const transformedStyles: Record<string, Record<string, any>> = {};

    Object.keys(styles).forEach((cls) => {
        transformedStyles[cls] = {};
        Object.keys(styles[cls]).forEach((key) => {
            if (propertiesToTransform.includes(key) && typeof styles[cls][key] === 'number') {
                // 转换宽度、高度、字体大小
                transformedStyles[cls][key] = (styles[cls][key] / DESIGN_SCREEN_WIDTH) * screenWidth;
            } else if (propertiesToTransformSub.includes(key) && typeof styles[cls][key] === 'number') {
                // 转换 padding 和 margin 相关属性
                transformedStyles[cls][key] = (styles[cls][key] / DESIGN_SCREEN_WIDTH) * screenWidth;
            } else {
                // 保持其他样式值不变
                transformedStyles[cls][key] = styles[cls][key];
            }
        });
    });

    return StyleSheet.create(transformedStyles) as T;
}



export const commonStyles = {
    colors: {
        primary: '#FF8800',
        secondary: '#FFA500',
        error: '#D3D3D3',
        borderColor: '#E5E5E5',
        textColor: '#3D3D3D',
        white: '#FFFFFF',
    },
    button: {
        lightButton: {
            backgroundColor: '#FF8800',
            borderRadius: 40,
            borderWidth: 1,
            borderColor: '#FFB224',
            fontSize: 12,
            color: '#3D3D3D',
            textAlign: 'center',
        },
        whiteButton: {
            backgroundColor: '#FFFFFF',
            borderRadius: 40,
            borderWidth: 1,
            borderColor: '#FFB224',
            fontSize: 12,
            color: '#FF8800',
            textAlign: 'center',
        },
        disableButton: {
            backgroundColor: '#D3D3D3',
        },
    },
    input: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FF8800',
    },
};

export const validateEmail = (input: string) => {
    // Email 正则验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
};

export const startShakeAnimation = (shakeAnimationRef: any) => {
    Animated.sequence([
        Animated.timing(shakeAnimationRef, {
            toValue: 10, // 向右偏移
            duration: 50,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationRef, {
            toValue: -10, // 向左偏移
            duration: 50,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationRef, {
            toValue: 0, // 回归原位
            duration: 50,
            useNativeDriver: true,
        }),
    ]).start();
};