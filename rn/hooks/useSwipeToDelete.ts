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
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        // pan.stopAnimation();
        // pan.setOffset(pan.getValue());
        // pan.setValue(0);
      },
      onPanResponderMove: (_, { dx }) => {
        const baseValue = isOpen ? -deleteWidth : 0;
        const newValue = Math.max(-deleteWidth, Math.min(0, baseValue + dx));
        pan.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        // pan.flattenOffset();

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
