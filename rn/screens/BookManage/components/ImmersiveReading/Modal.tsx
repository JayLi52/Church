import BaseText from '@components/BaseText';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import Slider from '@react-native-community/slider';
import {transformStyles} from '@utils/index';
import React, {Dispatch, RefObject, SetStateAction, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import type {TabType} from '../../ImmersiveReading';
import {VersionModal} from './VersionModal';

export const renderFontMenu = (
  modalFontRef: RefObject<CustomModalRef>,
  setFontSize: Dispatch<SetStateAction<number>>,
  fontSize: number,
) => (
  <CustomModal
    ref={modalFontRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <BaseText style={styles.menuTitle}>字体设置</BaseText>
        <TouchableOpacity onPress={() => modalFontRef.current?.close()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View style={styles.fontSizeControl}>
        <TouchableOpacity
          onPress={() => setFontSize(prev => Math.max(12, prev - 2))}>
          <BaseText style={styles.fontSizeText}>A-</BaseText>
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={24}
          value={fontSize}
          onValueChange={setFontSize}
          minimumTrackTintColor="#FFB224"
          maximumTrackTintColor="#EEEEEE"
          thumbTintColor="#FFB224"
        />
        <TouchableOpacity
          onPress={() => setFontSize(prev => Math.min(24, prev + 2))}>
          <BaseText style={styles.fontSizeText}>A+</BaseText>
        </TouchableOpacity>
      </View>
    </View>
  </CustomModal>
);

export const renderBrightnessControl = (
  modalBrightRef: RefObject<CustomModalRef>,
  brightness: number,
  setBrightness: Dispatch<SetStateAction<number>>,
) => (
  <CustomModal
    ref={modalBrightRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <BaseText style={styles.menuTitle}>亮度调节</BaseText>
        <TouchableOpacity onPress={() => modalBrightRef.current?.close()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View style={styles.brightnessControl}>
        <FontAwesome name="sun" size={20} color="#666" iconStyle="solid" />
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1}
          value={brightness}
          onValueChange={setBrightness}
          minimumTrackTintColor="#FFB224"
          maximumTrackTintColor="#EEEEEE"
          thumbTintColor="#FFB224"
        />
      </View>
    </View>
  </CustomModal>
);

export const renderBookmarkMenu = (
  modalBookmarkRef: RefObject<CustomModalRef>,
) => (
  <CustomModal
    ref={modalBookmarkRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <BaseText style={styles.menuTitle}>书签列表</BaseText>
        <TouchableOpacity onPress={() => modalBookmarkRef.current?.close()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.bookmarkList}>
        {[1, 2, 3].map(index => (
          <TouchableOpacity key={index} style={styles.bookmarkItem}>
            <BaseText style={styles.bookmarkTitle}>马太福音 第一章</BaseText>
            <BaseText style={styles.bookmarkVerse}>第 {index} 节</BaseText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </CustomModal>
);

export const renderSearchResults = (
  modalSearchRef: RefObject<CustomModalRef>,
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  genealogyData: any[],
) => (
  <CustomModal
    ref={modalSearchRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.searchContainer}>
      <View style={styles.menuHeader}>
        <BaseText style={styles.menuTitle}>搜索</BaseText>
        <TouchableOpacity onPress={() => modalSearchRef.current?.close()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.modalSearchInput}
          placeholder="搜索内容"
          value={searchText}
          onChangeText={setSearchText}
          selectionColor={'#FFB224'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesome
            name="search"
            size={20}
            color="#fff"
            // iconStyle="solid"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.searchResults}>
        {genealogyData
          .filter(item => item.text.includes(searchText))
          .map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.searchResultItem}>
              <BaseText style={styles.searchResultVerse}>
                第 {index + 1} 节
              </BaseText>
              <BaseText style={styles.searchResultText}>{item.text}</BaseText>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  </CustomModal>
);

export const renderBgColorMenu = (
  modalBgColorRef: RefObject<CustomModalRef>,
  setBackgroundColor: Dispatch<SetStateAction<string>>,
  backgroundColor: string,
) => (
  <CustomModal
    ref={modalBgColorRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <BaseText style={styles.menuTitle}>背景颜色</BaseText>
        <TouchableOpacity onPress={() => modalBgColorRef.current?.close()}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <View style={styles.colorOptions}>
        {['#fff', '#F4ECD8', '#E5E5E5', '#1A1A1A'].map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, {backgroundColor: color}]}
            onPress={() => setBackgroundColor(color)}>
            {backgroundColor === color && (
              <FontAwesome
                name="check"
                size={16}
                color="#FFB224"
                iconStyle="solid"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </CustomModal>
);

export const renderVersionModal = (
  modalVersionRef: RefObject<CustomModalRef>,
  versions: {
    zh: BibleVersion[];
    en: BibleVersion[];
    ko: BibleVersion[];
  },
  currentVersion: string,
  currentLanguage: 'zh' | 'en' | 'ko',
  setCurrentVersion: (version: BibleVersion) => void,
  setCurrentLanguage: (language: 'zh' | 'en' | 'ko') => void,
) => (
  <VersionModal
    modalRef={modalVersionRef}
    versions={versions}
    currentVersion={currentVersion}
    currentLanguage={currentLanguage}
    setCurrentVersion={setCurrentVersion}
    setCurrentLanguage={setCurrentLanguage}
  />
);

export const renderChapterModal = (
  modalChapterRef: RefObject<CustomModalRef>,
  currentTab: string,
  setCurrentTab: Dispatch<SetStateAction<TabType>>,
  chapters: any[],
  sections: any[],
  currentChapter: any,
  setCurrentChapter: Dispatch<SetStateAction<any>>,
  currentSection: any,
  setCurrentSection: Dispatch<SetStateAction<any>>,
) => {
  return (
    <CustomModal
      ref={modalChapterRef}
      modalContentWrapStyle={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <View style={styles.chapterContainer}>
        <View style={styles.chapterTabContainer}>
          <TouchableOpacity
            style={[
              styles.chapterTab,
              currentTab === 'chapter' && styles.chapterTabActive,
            ]}
            onPress={() => setCurrentTab('chapter')}>
            <BaseText
              style={[
                styles.chapterTabText,
                currentTab === 'chapter' && styles.chapterTabTextActive,
              ]}>
              章
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chapterTab,
              currentTab === 'section' && styles.chapterTabActive,
            ]}
            onPress={() => setCurrentTab('section')}>
            <BaseText
              style={[
                styles.chapterTabText,
                currentTab === 'section' && styles.chapterTabTextActive,
              ]}>
              节
            </BaseText>
          </TouchableOpacity>
        </View>

        <View style={styles.chapterContent}>
          <ScrollView style={styles.chapterList}>
            <View style={styles.chapterListContent}>
              {chapters.map(chapter => (
                <TouchableOpacity
                  key={chapter}
                  style={[
                    styles.chapterItem,
                    currentChapter === chapter && styles.chapterItemActive,
                  ]}
                  onPress={() => setCurrentChapter(chapter)}>
                  <BaseText
                    style={[
                      styles.chapterItemText,
                      currentChapter === chapter &&
                        styles.chapterItemTextActive,
                    ]}>
                    {String(chapter).padStart(2, '0')}
                  </BaseText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView style={styles.sectionList}>
            <View style={styles.sectionListContent}>
              {sections.map(section => (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.sectionItem,
                    currentSection === section && styles.sectionItemActive,
                  ]}
                  onPress={() => setCurrentSection(section)}>
                  <BaseText
                    style={[
                      styles.sectionItemText,
                      currentSection === section &&
                        styles.sectionItemTextActive,
                    ]}>
                    {String(section).padStart(2, '0')}
                  </BaseText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.chapterFooter}>
          <TouchableOpacity
            style={styles.chapterFooterButton}
            onPress={() => modalChapterRef.current?.close()}>
            <FontAwesome
              name="xmark"
              size={20}
              color="#666"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chapterFooterButton,
              styles.chapterFooterButtonPrimary,
            ]}
            onPress={() => {
              // 处理启用逻辑
              modalChapterRef.current?.close();
            }}>
            <FontAwesome
              name="check"
              size={20}
              color="#666"
              iconStyle="solid"
            />
            <BaseText style={styles.chapterFooterButtonText}>启用</BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = transformStyles({
  menuContainer: {
    padding: 16,
    // flex: 1,
    width: 390,
    // height: 200,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fontSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  fontSizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  slider: {
    flex: 1,
    marginHorizontal: 16,
  },
  brightnessControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB224',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResults: {
    flex: 1,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchResultVerse: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  searchResultText: {
    fontSize: 14,
    color: '#333',
  },
  bookmarkList: {
    flex: 1,
  },
  bookmarkItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  bookmarkTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bookmarkVerse: {
    fontSize: 12,
    color: '#666',
  },

  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  versionTag: {
    backgroundColor: '#FFB224',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  versionText: {
    color: '#fff',
    fontSize: 12,
  },

  searchContainer: {
    padding: 16,
    width: 390,
    height: 400, // 搜索结果框较高
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  chapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    // paddingTop: 12,
  },
  chapterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
    // paddingTop: 4,
    marginTop: -4,
  },
  versionContainer: {
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
  chapterContainer: {
    backgroundColor: '#fff',
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    width: 390,
  },
  chapterTabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    justifyContent: 'space-around',
  },
  chapterTab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  chapterTabActive: {
    backgroundColor: '#FFB224',
  },
  chapterTabText: {
    fontSize: 14,
    color: '#666',
  },
  chapterTabTextActive: {
    color: '#fff',
  },
  chapterContent: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    overflow: 'hidden',
  },
  chapterList: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  chapterListContent: {
    padding: 12,
  },
  sectionList: {
    flex: 1,
  },
  sectionListContent: {
    padding: 12,
  },
  chapterItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  chapterItemActive: {
    backgroundColor: '#FFB224',
  },
  chapterItemText: {
    fontSize: 16,
    color: '#333',
  },
  chapterItemTextActive: {
    color: '#fff',
  },
  sectionItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  sectionItemActive: {
    backgroundColor: '#FFB224',
  },
  sectionItemText: {
    fontSize: 16,
    color: '#333',
  },
  sectionItemTextActive: {
    color: '#fff',
  },
  chapterFooter: {
    flexDirection: 'row',
    height: 44, // 固定高度
    // borderTopWidth: 1,
    // borderTopColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  chapterFooterButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chapterFooterButtonPrimary: {
    // borderLeftWidth: 1,
    // borderLeftColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterFooterButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    marginTop: -4,
  },
  languageTabs: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 12,
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
  versionFooter: {
    flexDirection: 'row',
    height: 44,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 16,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  footerButtonPrimary: {
    borderLeftWidth: 1,
    borderLeftColor: '#EEEEEE',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
