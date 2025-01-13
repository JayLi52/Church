import React, {useState} from 'react';
import {StyleSheet, Text, TextProps, TouchableOpacity} from 'react-native';

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  style?: any;
  isFirstLineIndent?: boolean;
  useExpanded?: boolean;
  lines?: number;
}

function BaseText(props: BaseTextProps): React.JSX.Element {
  const {
    style,
    children,
    isFirstLineIndent = false,
    useExpanded = false,
    lines = 3,
    // onCollapse,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(false);

  return useExpanded ? (
    <TouchableOpacity onPress={() => setExpanded(true)}>
      <Text
        style={[styles.text, style]}
        numberOfLines={expanded ? undefined : lines}
        {...rest}>
        {isFirstLineIndent && '    '}
        {children}
        {expanded && (
          <Text onPress={() => setExpanded(false)} style={styles.collapseText}>
            {' '}
            收起
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text style={[styles.text, style]} {...rest}>
      {isFirstLineIndent && '    '}
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PingFang SC',
    marginTop: -3,
  },
  collapseText: {
    color: '#FFB224',
  },
});

export default BaseText;
