import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import BaseText from '@components/BaseText';
import {transformStyles} from '@utils/index';

type ShareCardProps = {
  verse: string;
  reference: string;
  loading?: boolean;
  shareInfo?: {
    qrCode: string;
    backgroundImage: string;
    slogan: string;
    appName: string;
  };
};

const ShareCard = React.forwardRef<View, ShareCardProps>((props, ref) => {
  const {verse, reference, loading, shareInfo} = props;

  if (loading) {
    return (
      <View ref={ref} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFB224" />
          <BaseText style={styles.loadingText}>正在生成分享卡片...</BaseText>
        </View>
      </View>
    );
  }

  return (
    <View ref={ref} style={styles.container}>
      <Image
        source={{uri: shareInfo?.backgroundImage}}
        style={styles.backgroundImage}
      />
      <BaseText style={styles.verseText}>{verse}</BaseText>
      <View style={styles.footer}>
        <BaseText style={styles.reference}>— {reference}</BaseText>
        <View style={styles.footerContent}>
          <View style={styles.appInfo}>
            <BaseText style={styles.appName}>{shareInfo?.appName}</BaseText>
            <BaseText style={styles.slogan}>{shareInfo?.slogan}</BaseText>
          </View>
          <Image source={{uri: shareInfo?.qrCode}} style={styles.qrCode} />
        </View>
      </View>
    </View>
  );
});

const styles = transformStyles({
  container: {
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  verseText: {
    fontSize: 16,
    color: '#333',
    padding: 20,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  reference: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  slogan: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  appInfo: {
    flex: 1,
  },
  qrCode: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
});

export default ShareCard;
