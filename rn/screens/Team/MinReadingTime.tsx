import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {transformStyles} from '@utils/index';
import React, {useRef, useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

const MinReadingTime = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<any>(); // 默认时间

  const modalRef = useRef<CustomModalRef>(null);

  const handleSetTime = () => {
    // 设置时间的逻辑
    modalRef.current?.close();
  };

  return (
    <View>
      <Text>最小阅读时间</Text>
      <Button
        title="设置时间"
        onPress={() => {
          modalRef.current?.open();
        }}
      />

      <CustomModal
        ref={modalRef}
        modalContentWrapStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => modalRef.current?.close()}
              style={styles.closeButton}>
              <FontAwesome
                color={'#000'}
                name="xmark"
                size={24}
                iconStyle="solid"
              />
            </TouchableOpacity>
            <Text style={styles.title}>跳过</Text>
          </View>
          <View style={styles.timeOptions}>
            {['5', '10', '15', '30'].map(time => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(Number(time))}
                style={[styles.optionButton, selectedTime === Number(time) && styles.optionButtonActive]}>
                <Text style={styles.optionText}>{time}分钟</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputWrap}>

          <TextInput
            value={selectedTime}
            placeholder='输入阅读时间'
            onChangeText={text => setSelectedTime(Number(text))}
            style={styles.input}
            selectionColor={'#FF8800'}
          />
          <Text style={styles.inputUnit}>分钟</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSetTime}>
            <Text style={styles.buttonText}>确认</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = transformStyles({
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 390,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    // position: 'absolute',
    // top: 10,
    // right: 10,
  },
  title: {
    fontSize: 16,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    // padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    width: 66,
    height: 44,
    color: '#2E2E2E',
    elevation: 1,
  },
  optionButtonActive: {
    backgroundColor: '#FFF7E8',
    borderColor: '#FFB224',
    borderWidth: 1,
  },
  optionText: {
    color: '#2E2E2E',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 44,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    // marginBottom: 20,
    // flex: 1,
    width: 270,
    fontSize: 16,
    backgroundColor: '#F6F6F6',
  },
  inputUnit: {
    fontSize: 16,
    marginLeft: 21,
    color: '#000000',
  },
  button: {
    backgroundColor: '#FF8800',
    paddingVertical: 12,
    borderRadius: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MinReadingTime;
