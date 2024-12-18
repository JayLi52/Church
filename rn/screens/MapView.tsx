import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapViewContainer = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825, // 初始纬度
                    longitude: -122.4324, // 初始经度
                    latitudeDelta: 0.0922, // 纬度范围（缩放级别）
                    longitudeDelta: 0.0421, // 经度范围（缩放级别）
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapViewContainer;