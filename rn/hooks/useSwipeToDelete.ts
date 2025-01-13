import {useRef, useState, useMemo} from 'react';
import {Animated, PanResponder} from 'react-native';

interface UseSwipeToDeleteProps {
  deleteWidth?: number;
}

export const useSwipeToDelete = ({deleteWidth = 80}: UseSwipeToDeleteProps = {}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const disableDrag =
          (isOpen && gestureState.dx < 0) || (!isOpen && gestureState.dx > 0);
        return !disableDrag && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        const currentIsOpen = isOpen;
        pan.setOffset(currentIsOpen ? -deleteWidth : 0);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.dx;
        if (x >= -deleteWidth && x <= deleteWidth) {
          pan.setValue(x);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentIsOpen = isOpen;
        pan.flattenOffset();

        if (currentIsOpen) {
          if (gestureState.dx > 40) {
            closeSwipe();
          } else {
            openSwipe();
          }
        } else {
          if (gestureState.dx < -40) {
            openSwipe();
          } else {
            closeSwipe();
          }
        }
      },
    });
  }, [isOpen, pan, deleteWidth]);

  const openSwipe = () => {
    Animated.spring(pan, {
      toValue: -deleteWidth,
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
  };

  const closeSwipe = () => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
  };

  return {
    pan,
    isOpen,
    panResponder,
    closeSwipe,
  };
}; 