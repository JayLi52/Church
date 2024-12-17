import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
                        <Image source={require('@assets/images/schedule/close.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    {[
                        {
                            label: '时间',
                            value: time,
                            icon: require('@assets/images/schedule/time.png')
                        },
                        {
                            label: '地点',
                            value: location,
                            icon: require('@assets/images/schedule/location.png')
                        },
                        {
                            label: '介绍',
                            value: description,
                            icon: require('@assets/images/schedule/Introduction.png')
                        }
                    ].map((item, idx) =>
                        <View key={idx} style={styles.row}>
                            <View style={styles.section}>
                                <Image style={styles.sectionIcon} source={item.icon} />
                                <Text style={styles.label}>{item.label}</Text>
                            </View>
                            <Text style={styles.value}>{item.value}</Text>
                        </View>
                    )}
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
        borderRadius: 20,
        paddingTop: 20,
        alignItems: 'center'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 14,
        zIndex: 1,
        width: 44,
        height: 44
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    row: {
        marginBottom: 13,
        width: 390,
        paddingHorizontal: 16,
    },
    section: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        height: 32,
        width: 32,
    },
    label: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    value: {
        fontSize: 14,
        color: '#363636',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 22,
        marginTop: 71,
        marginBottom: 30,
        width: 300,
        height: 44
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        alignItems: 'center'
    },
});

export default SchduleInfo;
