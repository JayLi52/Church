import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';

type CountDownProps = {
  initialTime: number; // 初始时间（秒）
  onFinish?: () => void;
  onComplete?: () => void;
};

const CountDown = ({initialTime, onFinish, onComplete}: CountDownProps) => {
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
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const navigation = useNavigation();

  const handleComplete = () => {
    // 跳到下一题
    // navigation.navigate('TeamQuestion');
    onComplete?.();
  };

  return (
    <TouchableOpacity
      style={styles.countdownContainer}
      onPress={handleComplete}>
      <View style={styles.checkContainer}>
        <FontAwesome name="check" size={16} color="#FF8800" iconStyle="solid" />
      </View>
      <Text style={styles.countdownText}>
        {`${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = transformStyles({
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    // padding: 8,
    backgroundColor: '#FFF7E8',
    borderRadius: 20,
    // marginHorizontal: 16,
    // marginBottom: 16,
    elevation: 2,
    // position: 'absolute',
    // bottom: 200,
    // left: 0,
    // flex: 1,
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
  checkContainer: {
    backgroundColor: '#fff',
    borderRadius: 21,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 2,
  },
});

export default CountDown;
