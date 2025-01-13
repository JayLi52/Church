import {useRef, useState, useMemo, useCallback} from 'react';
import {Animated, PanResponder} from 'react-native';

interface UseSwipeToDeleteProps {
  deleteWidth?: number;
}

export const useSwipeToDelete = ({deleteWidth = 80}: UseSwipeToDeleteProps = {}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const closeSwipe = useCallback(() => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
  }, [pan]);

  const openSwipe = useCallback(() => {
    Animated.spring(pan, {
      toValue: -deleteWidth,
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
  }, [pan, deleteWidth]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const disableDrag =
          (isOpen && gestureState.dx < 0) || (!isOpen && gestureState.dx > 0);
        return !disableDrag && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        pan.setOffset(isOpen ? -deleteWidth : 0);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.dx;

        if (isOpen && x >= 0 && Math.abs(x) <= deleteWidth) {
          pan.setValue(x);
        }
        if (!isOpen && x <= 0 && Math.abs(x) <= deleteWidth) {
          pan.setValue(x);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();

        if (isOpen) {
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
  }, [isOpen, pan, deleteWidth, openSwipe, closeSwipe]);

  return {pan, isOpen, panResponder, closeSwipe};
};
