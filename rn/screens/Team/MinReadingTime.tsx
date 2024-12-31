import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

type MinReadingTimeProps = {
  onConfirm: (time: number) => void;
  onSkip: () => void;
};

const MinReadingTime = ({onConfirm, onSkip}: MinReadingTimeProps) => {
  const [selectedTime, setSelectedTime] = useState(30); // 默认30分钟
  const [customTime, setCustomTime] = useState<string | null>(null);

  const timeOptions = [5, 10, 15, 30];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>设置最小阅读时间</Text>
      <View style={styles.optionsContainer}>
        {timeOptions.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeOption,
              selectedTime === time && styles.timeOptionActive,
            ]}
            onPress={() => setSelectedTime(time)}>
            <Text
              style={[
                styles.timeOptionText,
                selectedTime === time && styles.timeOptionTextActive,
              ]}>
              {time}分钟
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.timeInput}
        placeholder="请输入分钟数"
        value={customTime?.toString() || ''}
        onChangeText={text => setCustomTime(text)}
        selectionColor="#FFB224"
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>跳过</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onConfirm(selectedTime)}>
          <Text style={styles.confirmText}>确定</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = transformStyles({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  timeOptionActive: {
    backgroundColor: '#FFF7E8',
    borderColor: '#FFB224',
    borderWidth: 1,
  },
  timeOptionText: {
    color: '#2E2E2E',
    fontSize: 14,
  },
  timeOptionTextActive: {
    color: '#FF8800',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#999',
  },
  confirmButton: {
    backgroundColor: '#FFB224',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    fontSize: 14,
    color: '#2E2E2E',
  },
});

export default MinReadingTime;
