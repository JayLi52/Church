import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from '@components/CustomModal';
import { transformStyles } from '@utils/index';

type SchduleInfoProps = {
    title: string;
    time: string;
    location: string;
    description: string;
    callback?: () => void;
};

export interface SchduleInfoRef {
    open: () => void;
    close: () => void;
}

const SchduleInfo = forwardRef<SchduleInfoRef, SchduleInfoProps>(
    ({ title, time, location, description, callback }, ref) => {
        const modalRef = useRef<any>();

        const openModal = () => {
            modalRef.current.open();
        };

        const closeModal = () => {
            modalRef.current.close();
        };

        // 暴露方法给父组件
        useImperativeHandle(ref, () => ({
            open: openModal,
            close: closeModal,
        }));

        return (
            <CustomModal
                ref={modalRef}
                modalContentWrapStyle={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}
            >
                <View style={styles.popup}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.section}>
                        <Text style={styles.label}>时间</Text>
                        <Text style={styles.value}>{time}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>地点</Text>
                        <Text style={styles.value}>{location}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>介绍</Text>
                        <Text style={styles.value}>{description}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            callback && callback();
                        }}
                    >
                        <Text style={styles.buttonText}>调整计划</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        );
    }
);

SchduleInfo.displayName = 'SchduleInfo'

const styles = transformStyles({
    popup: {
        width: 390,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SchduleInfo;
