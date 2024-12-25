import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBoxProps {
  type?: 'orange' | 'blue' | 'green';
  style?: any;
  children?: React.ReactNode;
}

const gradientColors = {
  orange: ['rgba(255, 255, 255, 0)', 'rgba(255, 152, 0, 0.1)'],
  blue: ['rgba(255, 255, 255, 0)', 'rgba(33, 150, 243, 0.1)'],
  green: ['rgba(255, 255, 255, 0)', 'rgba(76, 175, 80, 0.1)'],
};

const GradientBox: React.FC<GradientBoxProps> = ({
  type = 'orange',
  style,
  children,
}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
      <LinearGradient
        colors={gradientColors[type]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default GradientBox;
