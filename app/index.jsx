import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../assets/Colors";
import logo from "../assets/images/logo.png";
import { createShadow } from "../utils/shadowHelper";

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  return (
    <LinearGradient
      colors={Colors.gradients.background}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background.primary} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height - (Platform.OS === 'ios' ? 100 : 80)
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
            {/* Logo Section */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <Image
                source={logo}
                style={{
                  width: Math.min(width * 0.7, 280),
                  height: Math.min(width * 0.7, 280),
                  maxWidth: 280,
                  maxHeight: 280
                }}
                resizeMode="contain"
              />
            </View>

            {/* Buttons Section */}
            <View className="w-full max-w-sm px-4">
              {/* Primary Sign Up Button with Logo-Matched Gradient */}
              <TouchableOpacity
                onPress={() => router.push("/signup")}
                activeOpacity={0.8}
                style={{
                  marginVertical: 8,
                  borderRadius: 12,
                  ...createShadow(Colors.secondary.main, { width: 0, height: 4 }, 0.3, 8, 8),
                }}
              >
                <LinearGradient
                  colors={['#F59E0B', '#EF4444']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    textAlign: 'center',
                    color: Colors.text.primary
                  }}>
                    🚀 Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Enhanced Guest Button with Benefits */}
              <TouchableOpacity
                onPress={handleGuest}
                activeOpacity={0.8}
                style={{
                  marginVertical: 8,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: Colors.secondary.main,
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  textAlign: 'center',
                  color: Colors.secondary.main,
                  marginBottom: 4,
                }}>
                  👤 Try as Guest
                </Text>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: Colors.secondary.main,
                  opacity: 0.8,
                }}>
                  No sign-up required • Full experience preview
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider and Sign In Link */}
            <View className="items-center mt-8">
              <View className="flex-row items-center mb-6">
                <LinearGradient
                  colors={[Colors.primary.main, 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, height: 1, marginHorizontal: 16 }}
                />
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.text.secondary,
                  paddingHorizontal: 8
                }}>
                  or
                </Text>
                <LinearGradient
                  colors={['transparent', Colors.primary.main]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, height: 1, marginHorizontal: 16 }}
                />
              </View>

              <TouchableOpacity
                onPress={() => router.push("/signin")}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{
                  color: Colors.text.secondary,
                  fontWeight: '600',
                  marginRight: 4
                }}>
                  Already a User?
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.secondary.main,
                  textDecoration: 'underline'
                }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
