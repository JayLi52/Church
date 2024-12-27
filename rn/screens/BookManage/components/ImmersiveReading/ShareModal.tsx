import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {commonStyles, transformStyles} from '@utils/index';

type ShareModalProps = {
  modalRef: React.RefObject<CustomModalRef>;
  onClose: () => void;
  onShare: () => void;
};

export const ShareModal = ({modalRef, onClose, onShare}: ShareModalProps) => {
  const [comment, setComment] = useState('');
  const [shareEnabled, setShareEnabled] = useState(false);

  return (
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
            <FontAwesome
              name="xmark"
              size={20}
              color="#333"
              iconStyle="solid"
            />
          </TouchableOpacity>
          <BaseText style={styles.title}>评论</BaseText>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.textarea}
            placeholder="写下你的评论..."
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.shareOption}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setShareEnabled(!shareEnabled)}>
              <FontAwesome
                style={commonStyles.icon}
                name={shareEnabled ? 'square-check' : 'square'}
                size={20}
                color={shareEnabled ? '#FFB224' : '#999'}
                iconStyle="regular"
              />
              <BaseText style={styles.checkboxText}>同时分享</BaseText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.publishButton}
            onPress={() => {
              if (shareEnabled) {
                onShare();
              }
              modalRef.current?.close();
            }}>
            <BaseText style={styles.publishText}>发布</BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = transformStyles({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: 390,
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
    width: 44,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  textarea: {
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  shareOption: {
    flex: 1,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  publishButton: {
    backgroundColor: '#FFB224',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
