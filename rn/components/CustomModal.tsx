import { transformStyles } from '@utils/index';
import React, { useState, forwardRef, useImperativeHandle, ReactNode } from 'react';
import {
    View,
    Modal,
    Pressable,
    TouchableWithoutFeedback,
    StyleProp,
    ViewStyle,
} from 'react-native';

interface CustomModalProps {
    children: ReactNode; // 模态框内容
    modalContentWrapStyle?: StyleProp<ViewStyle>; // 自定义模态框内容容器样式
}

export interface CustomModalRef {
    open: () => void; // 打开模态框方法
    close: () => void; // 关闭模态框方法
}

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false); // 控制弹框显示

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        open: () => setIsVisible(true),
        close: () => setIsVisible(false),
    }));

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                <View style={styles.overlay}>
                    <Pressable
                        style={props.modalContentWrapStyle}
                        onPress={() => {
                            /* 阻止事件冒泡 */
                        }}
                    >
                        {props.children}
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
});

CustomModal.displayName = 'CustomModal';

// 样式
const styles = transformStyles({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});

export default CustomModal;
