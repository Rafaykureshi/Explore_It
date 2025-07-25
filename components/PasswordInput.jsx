import React, { useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/Colors';

const PasswordInput = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder = "Password",
  placeholderTextColor = Colors.text.tertiary,
  style,
  editable = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    
    // Animate icon rotation
    Animated.timing(iconRotateAnim, {
      toValue: showPassword ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border.primary, Colors.secondary.main],
  });

  const iconRotation = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      style={[
        {
          position: 'relative',
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
          style={{
            height: '100%',
            paddingHorizontal: 16,
            paddingRight: 48, // Add right padding for the eye icon
            color: Colors.text.primary,
            fontSize: 16,
          }}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!showPassword}
          editable={editable}
          autoCorrect={false}
          autoCapitalize="none"
          {...props}
        />
      </Animated.View>

      {/* Animated Eye Icon Button */}
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: 12,
          top: 0,
          bottom: 0,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        disabled={!editable}
        activeOpacity={0.7}
      >
        <Animated.View
          style={{
            transform: [{ rotate: iconRotation }],
          }}
        >
          <Text style={{
            color: Colors.secondary.main,
            fontSize: 18,
          }}>
            {showPassword ? '👁️' : '🙈'}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PasswordInput;