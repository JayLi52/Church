import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {commonStyles, transformStyles} from '@utils/index';

export type QuoteOption = {
  id: string;
  title: string;
  description: string;
};

type QuoteModalProps = {
  modalRef: React.RefObject<CustomModalRef>;
  onClose: () => void;
  onSelect: (option: QuoteOption) => void;
  navigation: any;
};

const quoteOptions: QuoteOption[] = [
  {
    id: '1',
    title: '发布话题',
    description: '将经文作为话题发布到社区',
  },
  {
    id: '2',
    title: '发布习题',
    description: '将经文作为习题发布到社区',
  },
];

export const QuoteModal = ({
  modalRef,
  onClose,
  onSelect,
  navigation,
}: QuoteModalProps) => (
  <CustomModal
    ref={modalRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onClose();
            modalRef.current?.close();
          }}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
        <BaseText style={styles.title}>请选择引用用途</BaseText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.optionList}>
        {quoteOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={() => {
              onSelect(option);
              modalRef.current?.close();
              // navigation.navigate('BookManageNavigator', {
              //   screen: 'CommentList',
              // });
            }}>
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <FontAwesome
                  name={option.id === '1' ? 'hashtag' : 'book'}
                  size={16}
                  color="#FFB224"
                  iconStyle="solid"
                  style={[styles.optionIcon, commonStyles.icon]}
                />
                <BaseText style={styles.optionTitle}>{option.title}</BaseText>
              </View>
              {/* <BaseText style={styles.optionDescription}>
                {option.description}
              </BaseText> */}
            </View>
            <FontAwesome
              name="chevron-right"
              size={16}
              color="#999"
              iconStyle="solid"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </CustomModal>
);

const styles = transformStyles({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: 390,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 44, // 与关闭按钮等宽，用于标题居中
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  optionList: {
    maxHeight: 300,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFB224',
    borderRadius: 30,
    marginBottom: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionIcon: {
    marginRight: 8,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 12,
    color: '#999',
    marginLeft: 24, // 与图标对齐
  },
});
