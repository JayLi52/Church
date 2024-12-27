import React from 'react';
import {View, Image} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import {TYPE_ICON_MAP, CardType} from '../constants';

type CardItemProps = {
  title: string;
  image?: string;
  progress: number;
  type: CardType;
  members: string[];
  completedCount: number;
  date?: string;
  location?: string;
  duration?: string;
};

export const CardItem = ({
  title,
  image,
  progress,
  type,
  members,
  completedCount,
  date,
  location,
  duration,
}: CardItemProps) => (
  <View style={styles.cardItem}>
    <View style={styles.cardImageContainer}>
      <Image source={{uri: image}} style={styles.cardImage} />
      <View style={styles.progressOverlay}>
        <BaseText style={styles.progressText}>{progress}%</BaseText>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, {width: `${progress}%`}]} />
      </View>
    </View>
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <BaseText style={styles.cardTitle}>{title}</BaseText>
          {type === 'question' && (
            <View style={styles.questionTag}>
              <BaseText style={styles.questionTagText}>+5</BaseText>
            </View>
          )}
        </View>
        <View
          style={[
            styles.typeIcon,
            {backgroundColor: TYPE_ICON_MAP[type].background},
          ]}>
          <FontAwesome
            name={TYPE_ICON_MAP[type].name}
            size={16}
            color={TYPE_ICON_MAP[type].color}
            iconStyle="solid"
          />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.memberList}>
          {members.map((avatar, index) => (
            <Image
              key={index}
              source={{uri: avatar}}
              style={[styles.memberThumb, index > 0 && styles.overlappingThumb]}
            />
          ))}
          <BaseText style={styles.completedCount}>
            {completedCount}人已完成
          </BaseText>
        </View>
        {(date || location || duration) && (
          <View style={styles.cardMeta}>
            {date && <BaseText style={styles.metaText}>{date}</BaseText>}
            {location && (
              <BaseText style={styles.metaText}>{location}</BaseText>
            )}
            {duration && (
              <BaseText style={styles.metaText}>{duration}</BaseText>
            )}
          </View>
        )}
      </View>
    </View>
  </View>
);

const styles = transformStyles({
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardImageContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  progressOverlay: {
    position: 'absolute',
    left: 12,
    bottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progress: {
    height: '100%',
    backgroundColor: '#52C41A',
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  typeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionTag: {
    backgroundColor: '#F6FFED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  questionTagText: {
    fontSize: 12,
    color: '#52C41A',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  overlappingThumb: {
    marginLeft: -8,
  },
  completedCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
});
