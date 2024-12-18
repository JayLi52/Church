import React from 'react';
import { StyleSheet, View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import BaseText from '@components/BaseText';

const { width, height } = Dimensions.get('window');

function QrCode(): React.JSX.Element {
    return (
        <View style={styles.container}>
            {/* 背景模糊效果 */}
            <ImageBackground
                source={{
                    uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
                }}
                style={styles.imageBackground}
                blurRadius={10} // 模糊程度
            >
                {/* 内容区域 */}
                <View style={styles.contentBox}>
                    {/* 头像 */}
                    <Image
                        source={{
                            uri: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960', // 头像URL替换
                        }}
                        style={styles.avatar}
                    />

                    {/* 用户信息 */}
                    <BaseText style={styles.username}>用户名文本信息</BaseText>
                    <BaseText style={styles.groupInfo}>芝加哥西北华人教会 恩慈小组</BaseText>

                    {/* 标签 */}
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <BaseText style={styles.tagText}>同工</BaseText>
                        </View>
                        <View style={[styles.tag, styles.siblingTag]}>
                            <BaseText style={[styles.tagText, styles.siblingText]}>姊妹</BaseText>
                        </View>
                    </View>

                    {/* 二维码 */}
                    <Image
                        source={require('@assets/images/common/qrcode.png')}
                        style={styles.qrcode}
                    />

                    {/* 扫描按钮 */}
                    <TouchableOpacity style={styles.scanButton}>
                        <BaseText style={styles.scanButtonText}>扫描</BaseText>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFF',
        width,
        height,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '85%',
        alignItems: 'center',
        padding: 20,
        elevation: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    groupInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tag: {
        backgroundColor: '#5C9EFF',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    siblingTag: {
        backgroundColor: '#F0C66F',
    },
    tagText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    siblingText: {
        color: '#333',
    },
    qrcode: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    scanButton: {
        backgroundColor: '#FF8C00',
        borderRadius: 25,
        width: '80%',
        paddingVertical: 12,
        alignItems: 'center',
    },
    scanButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QrCode;
