import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';

type FixedContentProps = {
  onMorningPrayerPress: () => void;
  memberAvatars: string[];
};

export const FixedContent = ({
  onMorningPrayerPress,
  memberAvatars,
}: FixedContentProps) => (
  <View style={styles.fixedContent}>
    <View style={styles.cardContainer}>
      <View style={styles.morningCard}>
        <TouchableOpacity
          style={styles.morningCardContent}
          onPress={onMorningPrayerPress}>
          <BaseText style={styles.cardLabel}>晨祷</BaseText>
          <BaseText style={styles.timeText}>06:14</BaseText>
          <BaseText style={styles.subText}>后日出</BaseText>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContent}>
        <View style={styles.memberRow}>
          {memberAvatars.map((avatar, index) => (
            <Image
              key={index}
              source={{uri: avatar}}
              style={[
                styles.memberAvatar,
                index > 0 && styles.overlappingAvatar,
              ]}
            />
          ))}
          <View style={styles.memberCount}>
            <BaseText style={styles.countText}>15</BaseText>
          </View>
        </View>

        <TouchableOpacity style={styles.prayButton}>
          <FontAwesome
            name="hands-praying"
            size={20}
            color="#fff"
            iconStyle="solid"
          />
          <BaseText style={styles.prayButtonText}>新的祷告</BaseText>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = transformStyles({
  fixedContent: {
    backgroundColor: '#fff',
  },
  cardContainer: {
    margin: 16,
    flexDirection: 'row',
    gap: 12,
  },
  morningCard: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    borderRadius: 8,
  },
  morningCardContent: {
    padding: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#999',
  },
  rightContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  overlappingAvatar: {
    marginLeft: -12,
  },
  memberCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  countText: {
    fontSize: 14,
    color: '#FFB224',
    fontWeight: 'bold',
  },
  prayButton: {
    backgroundColor: '#FFB224',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  prayButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
