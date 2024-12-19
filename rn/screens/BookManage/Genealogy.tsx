import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

const genealogyData = [
    { id: 1, text: '亚伯拉罕的后裔，大卫的子孙、耶稣基督的家谱。' },
    { id: 2, text: '亚伯拉罕生以撒，以撒生雅各，雅各生犹大和他的弟兄。' },
    { id: 3, text: '犹大从他玛氏生法勒斯和谢拉。法勒斯生希斯仑，希斯仑生亚兰。' },
    { id: 4, text: '亚兰生亚米拿达，亚米拿达生拿顺，拿顺生撒门。' },
    { id: 5, text: '撒门从喇合氏生波阿斯，波阿斯从路得氏生俄备得，俄备得生耶西。' },
    { id: 6, text: '耶西生大卫王。大卫从乌利亚的妻子生所罗门。' },
    { id: 7, text: '所罗门生罗波安，罗波安生亚比雅，亚比雅生亚撒。' },
    { id: 8, text: '亚撒生约沙法，约沙法生约兰，约兰生乌西亚。' },
    { id: 9, text: '乌西亚生约坦，约坦生亚哈斯，亚哈希西家。' }
];

function GenealogyScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return (
        <>

            {/* 自定义 Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.headerButton}>
                        <FontAwesome name="book" size={18} color="#333" iconStyle="solid" />
                    </TouchableOpacity>
                    <BaseText style={styles.headerTitle}>马太福音 第一章</BaseText>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <FontAwesome name="arrow-rotate-left" size={18} color="#333" iconStyle="solid" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <FontAwesome name="xmark" size={18} color="#333" iconStyle="solid" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <BaseText style={styles.title}>最后的问候</BaseText>
                </View>

                {genealogyData.map((item, index) => (
                    <View key={item.id} style={styles.verseContainer}>
                        <View style={styles.verseContent}>
                            <BaseText style={styles.verseNumber}>{index + 1}</BaseText>
                            <BaseText style={styles.verseText}>{item.text}</BaseText>
                        </View>
                        <View style={styles.actionButtons}>
                            <FontAwesome name="comment" size={16} color="#999" style={styles.icon} iconStyle="solid" />
                            <BaseText style={styles.commentCount}>99+</BaseText>
                            <FontAwesome name="share" size={16} color="#999" style={styles.icon} iconStyle="solid" />
                            <BaseText style={styles.shareCount}>99+</BaseText>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    verseContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    verseContent: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    verseNumber: {
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: '#3B8E58',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginRight: 6,
        overflow: 'hidden',
    },
    verseText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    icon: {
        marginHorizontal: 4,
    },
    commentCount: {
        fontSize: 12,
        color: '#999',
        marginRight: 12,
    },
    shareCount: {
        fontSize: 12,
        color: '#999',
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default GenealogyScreen;
