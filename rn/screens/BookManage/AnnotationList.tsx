import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import { transformStyles } from '@utils/index';

function AnnotationList(): React.JSX.Element {
    const [annotations, setAnnotations] = useState([
        {
            id: 1,
            date: '2024-01-22 14:23',
            type: '公共',
            icon: 'globe',
            content:
                '批注文本内容批注文本内容批注文本内容批注文本内容批注文本内容批注文本内容...',
            likes: 9999,
            comments: 9999,
            selected: false, // 是否选中
            image: 'https://placekitten.com/40/40',
        },
        {
            id: 2,
            date: '2024-01-22 14:23',
            type: '组长',
            icon: 'leaf',
            content:
                '批注文本内容批注文本内容批注文本内容批注文本内容批注文本内容批注文本内容...',
            likes: 9999,
            comments: 1234,
            selected: false, // 是否选中
            image: 'https://placekitten.com/40/40',
        },
    ]);

    // 模拟接口获取的数据
    const title = '马太福音 1:2-2';
    const subtitle =
        '亚伯拉罕生以撒；以撒生雅各；雅各生犹大和他的弟兄。';

    // 处理选中状态
    const toggleSelection = (id: number) => {
        setAnnotations((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    return (
        <View style={styles.container}>
            {/* 头部组件 */}
            <View style={styles.header}>
                <View></View>
                <TouchableOpacity onPress={() => {

                }} style={styles.backButton}>
                    <FontAwesome style={styles.backText} name="xmark" iconStyle="solid" />
                </TouchableOpacity>
            </View>

            <BaseText style={styles.title}>{title}</BaseText>

            {/* Subtitle 带指示器 */}
            <View style={styles.subtitleContainer}>
                <View style={styles.indicator} />
                <BaseText style={styles.subtitle}>{subtitle}</BaseText>
            </View>

            {/* 批注区域 */}
            <ScrollView style={styles.annotationBox}>
                <BaseText style={styles.annotationBoxTitle}>公有批注 <FontAwesome style={{ color: '#3B8E58', fontSize: 8 }} name="circle" iconStyle="solid" /></BaseText>

                {annotations.map((item) => (
                    <View key={item.id} style={styles.card}>
                        {/* 左侧内容 */}
                        <TouchableOpacity
                            onPress={() => toggleSelection(item.id)}
                            style={styles.cardLeft}
                        >
                            <FontAwesome
                                name={item.selected ? 'square-check' : 'square'}
                                size={18}
                                color={'#2E2E2E'}
                            />
                        </TouchableOpacity>
                        {/* 中间内容 */}
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <BaseText style={styles.date}>{item.date}</BaseText>
                                <BaseText
                                    style={[
                                        styles.tag,
                                        item.type === '公共'
                                            ? styles.tagPublic
                                            : styles.tagGreen,
                                    ]}
                                >
                                    {item.type}
                                </BaseText>
                            </View>
                            <BaseText style={styles.content}>{item.content}</BaseText>
                            <View style={styles.cardFooter}>
                                <FontAwesome name="eye" color={'#727272'} />
                                <BaseText style={{ color: '#727272' }}>{item.likes}</BaseText>
                                <FontAwesome name="share" color={'#727272'} iconStyle='solid' />
                                <BaseText style={{ color: '#727272' }}>{item.comments}</BaseText>
                            </View>
                        </View>
                        {/* 右侧头像 */}
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>

            {/* 输入区域 */}
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="发布组长批注"
                    placeholderTextColor="#999"
                    selectionColor="#FFB224" // 光标颜色
                />
            </View>
        </View>
    );
}

export default AnnotationList;

const styles = transformStyles({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    backButton: {
        padding: 8,
    },
    backText: {
        fontSize: 20,
    },
    title: {
        marginLeft: 28,

        fontSize: 16,
        color: '#3B8E58',
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        // paddingHorizontal: 16,
    },
    indicator: {
        width: 4,
        height: 14,
        backgroundColor: '#3B8E58',
        borderRadius: 2,
        marginRight: 6,
        marginLeft: 18,
    },
    subtitle: {
        fontSize: 14,
        color: '#2E2E2E',
    },
    annotationBox: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFFFFF',
        // paddingTop: 8,
        // paddingHorizontal: 16,
    },
    annotationBoxTitle: {
        color: '#727272',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 12,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 14,
        padding: 12,
    },
    cardLeft: {
        justifyContent: 'center',
        marginRight: 8,
    },
    cardContent: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    date: {
        color: '#999',
        fontSize: 12,
        marginRight: 8,
    },
    tag: {
        fontSize: 12,
        paddingHorizontal: 6,
        borderRadius: 11,
        color: '#fff',
    },
    tagPublic: {
        backgroundColor: '#51A9DF',
    },
    tagGreen: {
        backgroundColor: '#5D9875',
    },
    content: {
        color: '#000000',
        fontSize: 16,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 8,
    },
    inputBox: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    input: {
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#333',
    },
});
