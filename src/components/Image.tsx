import React, {useState} from 'react';
import {
  Image as RNImage,
  ImageProps,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {theme} from '@/theme';

interface Props extends Omit<ImageProps, 'source'> {
  source: {uri: string} | number;
  fallback?: number;
  useFastImage?: boolean;
}

export const Image = React.memo(
  ({source, fallback, useFastImage = true, ...props}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleLoadEnd = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    if (hasError && fallback) {
      return <RNImage source={fallback} {...props} />;
    }

    const ImageComponent = useFastImage ? FastImage : RNImage;

    return (
      <View style={props.style}>
        <ImageComponent
          {...props}
          source={source}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
        {isLoading && (
          <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
