import { transformStyles } from '@utils/index'
import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'

const ProfileHeader = () => {
    return (
        < View style={styles.header} >
            <Image
                style={styles.profileImage}
                source={require('@assets/images/common/Avatar1.png')}
            />
            <Text style={styles.title}>教会名称文本信息</Text>
            <Text style={styles.calendarIcon}>📅</Text>
        </View >
    )
}

const styles = transformStyles({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF' },
    profileImage: { width: 50, height: 50, borderRadius: 25 },
    title: { fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
    calendarIcon: { fontSize: 20 },
})

export default ProfileHeader
