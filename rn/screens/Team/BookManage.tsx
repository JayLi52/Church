import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const DATA = [
    { id: '1', title: '和合本2010（上帝版）', hours: '9999小时', people: '9999人', checked: true },
    { id: '2', title: '新标点和合本', hours: '9999小时', people: '9999人', checked: false },
    { id: '3', title: '新标点和合本', hours: '9999小时', people: '9999人', checked: false },
    { id: '4', title: '新标点和合本', hours: '9999小时', people: '9999人', checked: false },
];

const BookManage = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.hours} {item.people}</Text>
            </View>
            {item.checked && (
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={require('@assets/images/book/Avatar1.png')} />
                    <Image style={styles.avatar} source={require('@assets/images/book/Avatar2.png')} />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>教会名称文本信息</Text>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 20 },
    header: { padding: 16, backgroundColor: '#fff' },
    headerText: { fontSize: 18, fontWeight: 'bold' },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 4,
        alignItems: 'center',
        borderRadius: 8,
        elevation: 2,
    },
    checkboxContainer: { marginRight: 10 },
    checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#ccc' },
    checkboxChecked: { backgroundColor: '#ffa500' },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold' },
    details: { fontSize: 12, color: '#888' },
    avatarContainer: { flexDirection: 'row' },
    avatar: { width: 20, height: 20, borderRadius: 10, marginLeft: 4 },
});

export default BookManage;
