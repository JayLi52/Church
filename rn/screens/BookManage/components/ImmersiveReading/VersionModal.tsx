import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {transformStyles} from '@utils/index';
import type {BibleVersion} from '@store/slices/bibleSlice';

type VersionModalProps = {
  modalRef: React.RefObject<CustomModalRef>;
  versions: {
    zh: BibleVersion[];
    en: BibleVersion[];
    ko: BibleVersion[];
  };
  currentVersion: string;
  currentLanguage: 'zh' | 'en' | 'ko';
  setCurrentVersion: (version: BibleVersion) => void;
  setCurrentLanguage: (language: 'zh' | 'en' | 'ko') => void;
};

export const VersionModal = ({
  modalRef,
  versions,
  currentVersion,
  currentLanguage,
  setCurrentVersion,
  setCurrentLanguage,
}: VersionModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion | null>(
    null,
  );

  return (
    <CustomModal
      ref={modalRef}
      modalContentWrapStyle={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <View style={styles.versionContainer}>
        <View style={styles.menuHeader}>
          <BaseText style={styles.menuTitle}>{currentVersion}</BaseText>
        </View>

        <View style={styles.languageTabs}>
          <TouchableOpacity
            style={[
              styles.languageTab,
              currentLanguage === 'zh' && styles.languageTabActive,
            ]}
            onPress={() => setCurrentLanguage('zh')}>
            <BaseText
              style={[
                styles.languageTabText,
                currentLanguage === 'zh' && styles.languageTabTextActive,
              ]}>
              中文
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageTab,
              currentLanguage === 'en' && styles.languageTabActive,
            ]}
            onPress={() => setCurrentLanguage('en')}>
            <BaseText
              style={[
                styles.languageTabText,
                currentLanguage === 'en' && styles.languageTabTextActive,
              ]}>
              ENG
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageTab,
              currentLanguage === 'ko' && styles.languageTabActive,
            ]}
            onPress={() => setCurrentLanguage('ko')}>
            <BaseText
              style={[
                styles.languageTabText,
                currentLanguage === 'ko' && styles.languageTabTextActive,
              ]}>
              KOR
            </BaseText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.versionList}>
          {versions[currentLanguage].map(version => (
            <TouchableOpacity
              key={version.id}
              style={[
                styles.versionItem,
                selectedVersion?.id === version.id && styles.versionItemActive,
              ]}
              onPress={() => setSelectedVersion(version)}>
              <BaseText
                style={[
                  styles.versionItemText,
                  selectedVersion?.id === version.id &&
                    styles.versionItemTextActive,
                ]}>
                {version.name}
              </BaseText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.versionFooter}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => modalRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerButton, styles.footerButtonPrimary]}
            onPress={() => {
              if (selectedVersion) {
                setCurrentVersion(selectedVersion);
                modalRef.current?.close();
              }
            }}
            disabled={!selectedVersion}>
            <FontAwesome
              name="check"
              size={20}
              color="#333"
              iconStyle="solid"
            />
            <BaseText style={styles.footerButtonText}>启用</BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = transformStyles({
  versionContainer: {
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: '100%',
    textAlign: 'center',
  },
  languageTabs: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    padding: 4,
    marginBottom: 16,
  },
  languageTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  languageTabActive: {
    backgroundColor: '#fff',
  },
  languageTabText: {
    fontSize: 14,
    color: '#666',
  },
  languageTabTextActive: {
    color: '#333',
    fontWeight: 'bold',
  },
  versionList: {
    maxHeight: 400,
  },
  versionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  versionItemActive: {
    backgroundColor: '#FFF5E6',
  },
  versionItemText: {
    fontSize: 16,
    color: '#333',
  },
  versionItemTextActive: {
    color: '#FFB224',
  },
  versionFooter: {
    flexDirection: 'row',
    height: 44,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  footerButton: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  footerButtonPrimary: {
    // borderLeftWidth: 1,
    // borderLeftColor: '#EEEEEE',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
