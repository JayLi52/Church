import React from 'react';
import RadialGradient from 'react-native-radial-gradient';
import {transformStyles} from '@utils/index';

interface RadialGradientBoxProps {
  startColor: string;
  endColor?: string;
  style?: any;
}

export const RadialGradientBox: React.FC<RadialGradientBoxProps> = ({
  startColor,
  endColor = '#FFFFFF',
  style,
}) => {
  const defaultStyle = transformStyles({
    gradient: {
      position: 'absolute',
      top: 0,
      right: -105,
      width: 210,
      height: 210,
    },
  });

  return (
    <RadialGradient
      style={[defaultStyle.gradient, style]}
      colors={[startColor, endColor]}
      center={[defaultStyle.gradient.width / 2, 0]}
      radius={defaultStyle.gradient.width / 2}
    />
  );
};
