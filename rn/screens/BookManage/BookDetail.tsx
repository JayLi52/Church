import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/FontAwesome6';

const BookDetail: React.FC = () => (
    <View style={styles.container}>
        <ImageBackground
            source={{ uri: 'https://placekitten.com/400/300' }}
            style={styles.imageBackground}
        >
            <BaseText style={styles.title}>马太福音</BaseText>
        </ImageBackground>
        <BaseText style={styles.description}>
            尽管四福音书均记录了耶稣在世的事迹，马太福音...
        </BaseText>
        <View style={styles.footer}>
            <FontAwesome name="clock" iconStyle='solid' />
            <BaseText style={styles.footerText}>9999</BaseText>
        </View>
    </View>
);

export default BookDetail;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    imageBackground: {
        height: 200,
        justifyContent: 'flex-end',
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 10,
        color: '#555',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        marginLeft: 5,
        color: '#999',
    },
});
