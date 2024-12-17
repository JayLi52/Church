import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';

const COMMENTS = [
    { id: '1', type: '公共', text: '批注文本内容信息...', time: '24-01-22 14:23', checked: true },
    { id: '2', type: '组长', text: '批注文本内容信息...', time: '24-01-22 14:23', checked: false },
];

const Annote = () => {
    const renderItem = ({ item }) => (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <View style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, item.checked && styles.checkboxChecked]} />
                </View>
                <Text style={styles.commentTime}>{item.time}</Text>
                <Text style={[styles.commentType, item.type === '公共' ? styles.public : styles.leader]}>
                    {item.type}
                </Text>
            </View>
            <Text style={styles.commentText} numberOfLines={3}>{item.text}</Text>
            <View style={styles.commentFooter}>
                <Image style={styles.avatar} source={require('@assets/images/book/Avatar1.png')} />
                <Image style={styles.avatar} source={require('@assets/images/book/Avatar2.png')} />
                <Text style={styles.commentMetrics}>9999</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>马太福音 1:2-2</Text>
            <Text style={styles.verseText}>亚伯拉罕生以撒；以撒生雅各；雅各生犹大和他的弟兄；</Text>
            <FlatList
                data={COMMENTS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TextInput style={styles.input} placeholder="发布组长标注" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    verseText: { fontSize: 14, color: '#333', marginBottom: 16 },
    commentCard: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
    },
    commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    checkboxContainer: { marginRight: 8 },
    checkbox: { width: 16, height: 16, borderWidth: 2, borderColor: '#ccc' },
    checkboxChecked: { backgroundColor: '#ffa500' },
    commentTime: { fontSize: 12, color: '#999', flex: 1 },
    commentType: { fontSize: 12, paddingHorizontal: 4, borderRadius: 4 },
    public: { backgroundColor: '#3498db', color: '#fff' },
    leader: { backgroundColor: '#27ae60', color: '#fff' },
    commentText: { fontSize: 14, color: '#333' },
    commentFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    avatar: { width: 20, height: 20, borderRadius: 10, marginRight: 4 },
    commentMetrics: { fontSize: 12, color: '#666', marginLeft: 8 },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
});

export default Annote;
