import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/FontAwesome6';
import { transformStyles } from '@utils/index';

interface ChapterItemProps {
    number: number;
    content: string;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ number, content }) => (
    <View style={styles.item}>
        <BaseText style={styles.number}>{number}</BaseText>
        <BaseText style={styles.content}>{content}</BaseText>
        <FontAwesome name="comment" iconStyle='solid' />
    </View>
);

export default ChapterItem;

const styles = transformStyles({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    number: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 10,
    },
    content: {
        flex: 1,
        color: '#555',
    },
});
