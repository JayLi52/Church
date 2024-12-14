import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const AnnotationManagement = () => {
    const annotations = [
        {
            id: '1',
            type: 'Public',
            content: '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息',
            likes: 9999,
            comments: 9999,
        },
        {
            id: '2',
            type: 'Group',
            content: '批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息批注文本内容信息',
            likes: 9999,
            comments: 1234,
        },
    ];

    const renderAnnotation = ({ item }) => (
        <View style={styles.annotationCard}>
            <View style={styles.header}>
                <Text style={[styles.type, item.type === 'Public' ? styles.public : styles.group]}>
                    {item.type}
                </Text>
                <Text>24-01-22 14:23</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.footer}>
                <View style={styles.iconText}>
                    <Image style={styles.icon} source={require('./like.png')} />
                    <Text>{item.likes}</Text>
                </View>
                <View style={styles.iconText}>
                    <Image style={styles.icon} source={require('./comment.png')} />
                    <Text>{item.comments}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Annotation Management</Text>
            <FlatList
                data={annotations}
                renderItem={renderAnnotation}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <TextInput style={styles.input} placeholder="Add a group tag" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        flex: 1,
    },
    annotationCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    type: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    public: {
        color: 'blue',
    },
    group: {
        color: 'green',
    },
    content: {
        fontSize: 16,
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 4,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
});

export default AnnotationManagement;
