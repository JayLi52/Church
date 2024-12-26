import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {transformStyles} from '@utils/index';

export type QuoteOption = {
  id: string;
  title: string;
  description: string;
};

type QuoteModalProps = {
  modalRef: React.RefObject<CustomModalRef>;
  onClose: () => void;
  onSelect: (option: QuoteOption) => void;
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

export const QuoteModal = ({modalRef, onClose, onSelect}: QuoteModalProps) => (
  <CustomModal
    ref={modalRef}
    modalContentWrapStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
    }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <BaseText style={styles.title}>请选择引用用途</BaseText>
        <TouchableOpacity
          onPress={() => {
            onClose();
            modalRef.current?.close();
          }}>
          <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.optionList}>
        {quoteOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={() => {
              onSelect(option);
              modalRef.current?.close();
            }}>
            <View style={styles.optionContent}>
              <BaseText style={styles.optionTitle}>{option.title}</BaseText>
              <BaseText style={styles.optionDescription}>
                {option.description}
              </BaseText>
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
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#999',
  },
});
