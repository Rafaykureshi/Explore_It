import React, { useRef } from 'react';
import { Animated, TextInput } from 'react-native';
import { Colors } from '../assets/Colors';

const AnimatedInput = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder,
  style,
  ...props
}) => {
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = (e) => {
    // Animate border color to accent color
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Subtle scale animation
    Animated.timing(scaleAnim, {
      toValue: 1.02,
      duration: 150,
      useNativeDriver: true,
    }).start();

    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    // Animate border color back to normal
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Scale back to normal
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    if (onBlur) onBlur(e);
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border.primary, Colors.secondary.main],
  });

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      <Animated.View
        style={[
          style,
          {
            borderColor: animatedBorderColor,
          }
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.tertiary}
          style={{
            height: '100%',
            paddingHorizontal: 16,
            color: Colors.text.primary,
            fontSize: 16,
          }}
          {...props}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default AnimatedInput;