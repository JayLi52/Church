import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

function BookIntroScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.headerButton}>
                        <FontAwesome name="book" size={18} color="#333" iconStyle="solid" />
                    </TouchableOpacity>
                    <BaseText style={styles.headerTitle}>马太福音</BaseText>
                </View>
                <TouchableOpacity style={styles.headerButton}>
                    <FontAwesome name="xmark" size={18} color="#333" iconStyle="solid" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                {/* 封面图片 */}
                <View style={styles.coverContainer}>
                    <Image
                        source={{ uri: 'https://your-image-url.com/cover.jpg' }}
                        style={styles.coverImage}
                    />
                    <TouchableOpacity style={styles.likeButton}>
                        <FontAwesome name="heart" size={24} color="#fff" iconStyle="solid" />
                    </TouchableOpacity>
                </View>

                {/* 描述文本 */}
                <View style={styles.contentContainer}>
                    <BaseText style={styles.description}>
                        反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。反映四福音书均记载了耶稣在世的事迹，马太福音是用了一个见证为出发点记录主上所作的事的特殊意思的角度去看他的生平与教导，为此缘故，本书将旧约的预言与耶稣的生平连贯起来，从而阐演了旧约与新约之间的桥梁。
                    </BaseText>
                </View>

                {/* 底部互动数据 */}
                <View style={styles.interactionContainer}>
                    <View style={styles.interactionBox}>
                        <FontAwesome name="comment" size={20} color="#666" iconStyle="solid" />
                        <BaseText style={styles.interactionCount}>9999</BaseText>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#F6F6F6',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerButton: {
        padding: 8,
        marginHorizontal: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    coverContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    likeButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
    },
    contentContainer: {
        padding: 16,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    interactionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    interactionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 4,
    },
    interactionCount: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
});

export default BookIntroScreen;