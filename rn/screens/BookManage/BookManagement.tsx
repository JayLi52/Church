import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/FontAwesome6';

interface BookItemProps {
    title: string;
    hours: number;
    people: number;
}

const BookItem: React.FC<BookItemProps> = ({ title, hours, people }) => {
    return (
        <View style={styles.item}>
            <View style={styles.content}>
                <BaseText style={styles.title}>{title}</BaseText>
                <BaseText style={styles.subText}>{hours} 小时  |  {people} 人</BaseText>
            </View>
            <Image source={{ uri: 'https://placekitten.com/40/40' }} style={styles.image} />
            <FontAwesome name="bars" iconStyle='solid' />
        </View>
    );
};

export default BookItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#333',
    },
    subText: {
        fontSize: 12,
        color: '#888',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});
