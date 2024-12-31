import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import Toast from 'react-native-root-toast';

type CountDownProps = {
  initialTime: number; // 初始时间（秒）
  onFinish?: () => void;
  onTick?: (remainingTime: number) => void;
};

const CountDown = ({initialTime, onFinish, onTick}: CountDownProps) => {
  const [countdown, setCountdown] = useState<number>(initialTime);
  const [stayTime, setStayTime] = useState<number>(0);
  const [canComplete, setCanComplete] = useState(false);

  // 页面停留时间计时
  useEffect(() => {
    const timer = setInterval(() => {
      setStayTime(prev => {
        const newTime = prev + 1;
        // 当停留时间达到最小阅读时长时，允许完成学习
        if (newTime >= initialTime) {
          setCanComplete(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime]);

  // 倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          onFinish?.();
          return 0;
        }
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish, onTick]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const handleComplete = () => {
    if (!canComplete) {
      Toast.show(`请至少阅读 ${Math.ceil(initialTime / 60)} 分钟`, {
        duration: Toast.durations.SHORT,
      });
      return;
    }
    // 处理完成学习
    onFinish?.();
  };

  return (
    <View style={styles.countdownContainer}>
      <FontAwesome name="clock" size={16} color="#FFB224" iconStyle="solid" />
      <Text style={styles.countdownText}>
        {`${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}
      </Text>
      <TouchableOpacity
        style={[
          styles.completeButton,
          !canComplete && styles.completeButtonDisabled,
        ]}
        onPress={handleComplete}>
        <Text
          style={[
            styles.completeText,
            !canComplete && styles.completeTextDisabled,
          ]}>
          完成学习
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF7E8',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    position: 'absolute',
    bottom: 200,
    left: 0,
  },
  countdownText: {
    color: '#FFB224',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  completeButton: {
    backgroundColor: '#FFB224',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  completeButtonDisabled: {
    backgroundColor: '#FFE7BA',
  },
  completeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  completeTextDisabled: {
    color: '#FFB224',
  },
});

export default CountDown;
