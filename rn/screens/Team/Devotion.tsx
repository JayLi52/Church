import { transformStyles } from '@utils/index';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const Devotion = () => {
    const plans = [
        { id: 1, title: '90天阅读旧约', progress: 0.65, date: '2024-08-11 至 2024-08-21' },
        { id: 2, title: '90天阅读旧约', progress: 1, date: '2024-08-11 至 2024-08-21' },
        { id: 3, title: '90天阅读旧约', progress: 0, date: '2024-08-11 至 2024-08-21' },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={require('@assets/images/book/Avatar1.png')}
                />
                <Text style={styles.title}>教会名称文本信息</Text>
                <Text style={styles.calendarIcon}>📅</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <StatBox number="2 年 100 天" label="累计灵修时长" />
                <StatBox number="0003" label="累计灵修人次" />
            </View>

            {/* Study Plan */}
            <Text style={styles.sectionTitle}>学经计划</Text>
            {plans.map((plan) => (
                <View key={plan.id} style={styles.planCard}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <ProgressBar progress={plan.progress} color="#3498db" />
                    <Text style={styles.date}>{plan.date}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const StatBox = ({ number, label }) => (
    <View style={styles.statBox}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = transformStyles({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF' },
    profileImage: { width: 50, height: 50, borderRadius: 25 },
    title: { fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
    calendarIcon: { fontSize: 20 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    statBox: { alignItems: 'center' },
    statNumber: { fontSize: 18, fontWeight: 'bold' },
    statLabel: { color: '#666' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 16 },
    planCard: { backgroundColor: '#FFFFFF', margin: 16, padding: 16, borderRadius: 8 },
    planTitle: { fontWeight: 'bold', marginBottom: 8 },
    date: { fontSize: 12, color: '#888', marginTop: 4 },
});

export default Devotion;
