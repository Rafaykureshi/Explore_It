import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Colors } from '../assets/Colors';

const { width, height } = Dimensions.get('window');

const AuthLoadingScreen = ({
  isVisible = false,
  message = "Please wait...",
  type = "login" // "login", "signup", "logout"
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const progressAnim = useSharedValue(0);
  const glowAnim = useSharedValue(1);

  React.useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 400 });
      scale.value = withSequence(
        withTiming(1.05, { duration: 300 }),
        withTiming(1, { duration: 200, easing: Easing.bezierFn(0.34, 1.56, 0.64, 1) })
      );
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear
        }),
        -1
      );
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
        ),
        -1
      );
      glowAnim.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          withTiming(1, { duration: 1200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
        ),
        -1
      );
      progressAnim.value = withTiming(1, { duration: 3000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.8, { duration: 300 });
    }
  }, [isVisible, opacity, scale, rotation, pulseAnim, glowAnim, progressAnim]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: pulseAnim.value }
    ]
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowAnim.value }]
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value * 100}%`,
  }));

  const getLoadingMessage = () => {
    switch (type) {
      case 'login':
        return 'Signing you in...';
      case 'signup':
        return 'Creating your account...';
      case 'logout':
        return 'Signing you out...';
      default:
        return message;
    }
  };

  const getLoadingColor = () => {
    switch (type) {
      case 'login':
        return Colors.PRIMARY; // Using app's primary color
      case 'signup':
        return '#10B981'; // Green
      case 'logout':
        return '#EF4444'; // Red
      default:
        return Colors.PRIMARY;
    }
  };

  const getSecondaryGradientColor = () => {
    switch (type) {
      case 'login':
        return '#1E40AF'; // Darker blue
      case 'signup':
        return '#047857'; // Darker green
      case 'logout':
        return '#B91C1C'; // Darker red
      default:
        return '#1E40AF';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'login':
        return 'Verifying your credentials...';
      case 'signup':
        return 'Setting up your new account...';
      case 'logout':
        return 'Clearing your session...';
      default:
        return 'This will only take a moment';
    }
  };

  if (!isVisible) return null;

  return (
    <View className="absolute inset-0 z-50" style={{ width, height }}>
      <BlurView
        intensity={90}
        tint="dark"
        className="flex-1 justify-center items-center"
      >
        <Animated.View
          style={animatedStyle}
          className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 mx-6 border border-white/10 shadow-2xl"
        >
          {/* Glowing Effect */}
          <View className="absolute inset-0 overflow-hidden rounded-3xl">
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: -100,
                  left: -100,
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  backgroundColor: getLoadingColor() + '30',
                  opacity: 0.6
                },
                glowStyle
              ]}
            />
          </View>

          {/* Custom Spinner */}
          <View className="items-center mb-6">
            <Animated.View style={spinnerStyle}>
              <LinearGradient
                colors={[getLoadingColor(), getSecondaryGradientColor()]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-20 h-20 rounded-full justify-center items-center"
              >
                <View className="w-16 h-16 rounded-full bg-black/50 justify-center items-center">
                  <View
                    className="w-12 h-12 rounded-full border-3 border-transparent"
                    style={{
                      borderTopColor: getLoadingColor(),
                      borderRightColor: getLoadingColor() + '80',
                      borderLeftColor: getLoadingColor() + '40',
                    }}
                  />
                </View>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Loading Text */}
          <Text className="text-white text-xl font-bold text-center mb-2">
            {getLoadingMessage()}
          </Text>

          {/* Subtitle */}
          <Text className="text-white/70 text-sm text-center">
            {getSubtitle()}
          </Text>

          {/* Progress Bar */}
          <View className="h-1 bg-white/10 rounded-full mt-6 mb-2 overflow-hidden">
            <Animated.View
              className="h-full rounded-full"
              style={[
                progressStyle,
                { backgroundColor: getLoadingColor() }
              ]}
            />
          </View>

          {/* Animated Dots */}
          <View className="flex-row justify-center mt-4 space-x-2">
            {[0, 1, 2].map((index) => (
              <AnimatedDot
                key={index}
                delay={index * 300}
                color={getLoadingColor()}
              />
            ))}
          </View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

const AnimatedDot = ({ delay, color }) => {
  const animation = useSharedValue(0);

  React.useEffect(() => {
    animation.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withSpring(1, { damping: 10, stiffness: 100 }),
          withSpring(0.3, { damping: 10, stiffness: 100 })
        ),
        -1
      )
    );
  }, [delay, animation]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [0.3, 1], [0.8, 1]);
    const opacity = interpolate(animation.value, [0.3, 1], [0.5, 1]);

    return {
      opacity,
      transform: [{ scale }]
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color || '#FFFFFF'
        }
      ]}
    />
  );
};

export default AuthLoadingScreen;