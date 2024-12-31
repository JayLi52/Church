import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import BaseText from '@components/BaseText';
import {transformStyles} from '@utils/index';
import {getImageUrl} from '@utils/imgs';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

type UserMode = 'personal' | 'team' | 'teamAnswer';

interface UserStats {
  completedReadings: number;
  cumulativeReadingDays: number;
  totalReadingTime: number;
  totalPoints: number;
  teamAnswerRate?: number;
  teamAnswerCount?: number;
  answerCount?: number;
}

const UserProfile = ({mode = 'personal'}: {mode?: UserMode}) => {
  const userStats: UserStats = {
    completedReadings: 9999,
    cumulativeReadingDays: 9999,
    totalReadingTime: 9999,
    totalPoints: 9999,
    teamAnswerRate: 99.99,
    teamAnswerCount: 9999,
    answerCount: 9999,
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={{uri: getImageUrl()}} style={styles.avatar} />
      <BaseText style={styles.userName}>用户标称文本信息</BaseText>
      <BaseText style={styles.time}>9999小时</BaseText>
      <View style={styles.locationInfo}>
        <BaseText style={styles.location}>四川成都</BaseText>
        <BaseText style={styles.separator}>|</BaseText>
        <BaseText style={styles.time}>22:49</BaseText>
        <BaseText style={styles.separator}>|</BaseText>
        <BaseText style={styles.distance}>21.9KM</BaseText>
      </View>
    </View>
  );

  const renderRoles = () => (
    <View style={styles.roles}>
      <View style={styles.roleItem}>
        <FontAwesome name="user" size={16} color="#666" />
        <BaseText style={styles.roleText}>牧师</BaseText>
      </View>
      <View style={[styles.roleItem, styles.roleItemWide]}>
        <FontAwesome name="church" size={16} color="#666" iconStyle="solid" />
        <BaseText style={styles.roleText}>芝加哥西华人教会</BaseText>
      </View>
      <View style={styles.roleItem}>
        <FontAwesome name="users" size={16} color="#666" iconStyle="solid" />
        <BaseText style={styles.roleText}>慕爱组</BaseText>
      </View>
    </View>
  );

  const renderPersonalStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经完成阅读次数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.completedReadings}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经累计阅读时长</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.totalReadingTime}
          </BaseText>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经最长连续阅读天数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.cumulativeReadingDays}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经分享次数</BaseText>
          <BaseText style={styles.statsValue}>{userStats.totalPoints}</BaseText>
        </View>
      </View>
      <View style={styles.progressBar}>
        <BaseText style={styles.progressLabel}>个人学经执行率</BaseText>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: '87.34%'}]} />
        </View>
        <BaseText style={styles.progressValue}>87.34%</BaseText>
      </View>
    </View>
  );

  const renderTeamStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经完成阅读次数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.completedReadings}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经累计阅读时长</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.totalReadingTime}
          </BaseText>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经最长连续阅读天数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.cumulativeReadingDays}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经分享次数</BaseText>
          <BaseText style={styles.statsValue}>{userStats.totalPoints}</BaseText>
        </View>
      </View>
      <View style={styles.progressBar}>
        <BaseText style={styles.progressLabel}>小组学经完成率</BaseText>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: '87.34%'}]} />
        </View>
        <BaseText style={styles.progressValue}>87.34%</BaseText>
      </View>
    </View>
  );

  const renderTeamAnswerStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经完成阅读次数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.completedReadings}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>至经累计阅读时长</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.totalReadingTime}
          </BaseText>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>小组答题次数</BaseText>
          <BaseText style={styles.statsValue}>
            {userStats.teamAnswerCount}
          </BaseText>
        </View>
        <View style={styles.statsItem}>
          <BaseText style={styles.statsLabel}>答题分享次数</BaseText>
          <BaseText style={styles.statsValue}>{userStats.answerCount}</BaseText>
        </View>
      </View>
      <View style={styles.progressBar}>
        <BaseText style={styles.progressLabel}>小组答题完成率</BaseText>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {width: `${userStats.teamAnswerRate}%`},
            ]}
          />
        </View>
        <BaseText style={styles.progressValue}>
          {userStats.teamAnswerRate}%
        </BaseText>
      </View>
    </View>
  );

  const renderStats = () => {
    switch (mode) {
      case 'team':
        return renderTeamStats();
      case 'teamAnswer':
        return renderTeamAnswerStats();
      default:
        return renderPersonalStats();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {renderRoles()}
      {renderStats()}
    </ScrollView>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#F6F6F6',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    fontSize: 12,
    color: '#999',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  distance: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    fontSize: 12,
    color: '#EEEEEE',
  },
  roles: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
  },
  roleItemWide: {
    flex: 1,
  },
  roleText: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  statsItem: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 8,
  },
  statsLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#52C41A',
    borderRadius: 2,
  },
  progressValue: {
    fontSize: 12,
    color: '#52C41A',
    textAlign: 'right',
  },
});

export default UserProfile;
