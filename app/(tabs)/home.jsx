import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Colors } from "../../assets/Colors";
import logo from "../../assets/images/logo.png";
import AuthLoadingScreen from "../../components/AuthLoadingScreen";
import { auth } from "../../config/firebaseConfig";
import { createShadow } from "../../utils/shadowHelper";
import { useAuthLoading } from "../../utils/useAuthLoading";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoading, withLoading } = useAuthLoading();
  const user = auth.currentUser;

  const handleLogout = async () => {
    setShowProfileMenu(false);
    console.log("Starting logout process...");
    console.log("isLoading before:", isLoading);

    try {
      await withLoading(async () => {
        console.log("Inside withLoading, signing out...");

        // Add minimum loading time to ensure the loading screen is visible
        const [signOutResult] = await Promise.all([
          signOut(auth),
          new Promise((resolve) => setTimeout(resolve, 1500)), // Minimum 1.5 seconds
        ]);

        console.log("Sign out completed");
        return signOutResult;
      }, "logout");

      console.log("isLoading after:", isLoading);

      Toast.show({
        type: "success",
        text1: "👋 Logged Out",
        text2: "You have been successfully logged out.",
        visibilityTime: 2000,
        position: "top",
      });

      setTimeout(() => {
        router.replace("/signin");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      Toast.show({
        type: "error",
        text1: "❌ Logout Failed",
        text2: "Failed to log out. Please try again.",
        visibilityTime: 3000,
        position: "top",
      });
    }
  };

  const ProfileMenuModal = () => (
    <Modal
      visible={showProfileMenu}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowProfileMenu(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: Colors.background.overlay,
        }}
        activeOpacity={1}
        onPress={() => setShowProfileMenu(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            paddingTop: 80,
            paddingRight: 16,
          }}
        >
          <LinearGradient
            colors={Colors.gradients.card}
            style={{
              borderRadius: 16,
              minWidth: 200,
              ...createShadow(
                Colors.primary.main,
                { width: 0, height: 8 },
                0.25,
                16,
                12
              ),
              borderWidth: 1,
              borderColor: Colors.border.primary,
            }}
          >
            {/* User Info */}
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.border.primary,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  colors={Colors.gradients.secondary}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.text.primary,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: Colors.text.primary,
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {user?.email || "Guest User"}
                  </Text>
                  <Text
                    style={{
                      color: Colors.text.secondary,
                      fontSize: 12,
                    }}
                  >
                    Signed in
                  </Text>
                </View>
              </View>
            </View>

            {/* Menu Options */}
            <View style={{ paddingVertical: 8 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/profile");
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>👤</Text>
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  My Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Navigate to settings when implemented
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>⚙️</Text>
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Help/Support functionality
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>❓</Text>
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Help & Support
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.border.primary,
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}
              />

              {/* Logout */}
              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>🚪</Text>
                <Text
                  style={{
                    color: Colors.status.error,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <LinearGradient colors={Colors.gradients.background} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Enhanced Header */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <LinearGradient
            colors={Colors.gradients.card}
            style={{
              borderRadius: 16,
              padding: 16,
              shadowColor: Colors.primary.main,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,

              borderWidth: 1,
              borderColor: Colors.border.primary,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.text.secondary,
                    fontWeight: "600",
                    marginRight: 8,
                  }}
                >
                  Welcome to
                </Text>
                <Image
                  source={logo}
                  style={{
                    width: Math.min(width * 0.2, 80),
                    height: Math.min(width * 0.12, 48),
                  }}
                  resizeMode="contain"
                />
              </View>

              {/* Enhanced Profile Avatar */}
              <TouchableOpacity
                onPress={() => setShowProfileMenu(true)}
                activeOpacity={0.8}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  shadowColor: Colors.secondary.main,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}
              >
                <LinearGradient
                  colors={Colors.gradients.secondary}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.text.primary,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Enhanced Content */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 20 : 55,
          }}
        >
          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontSize: 24,
                color: Colors.text.primary,
                fontWeight: "bold",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              🎉 Events & Activities
            </Text>

            {/* Enhanced Content Cards */}
            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                ...createShadow(
                  Colors.primary.main,
                  { width: 0, height: 4 },
                  0.1,
                  8,
                  6
                ),
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                🎪 No events available
              </Text>
              <Text
                style={{
                  color: Colors.text.secondary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Check back later for upcoming events and activities. We&apos;re
                working on bringing you exciting experiences!
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                ...createShadow(
                  Colors.secondary.main,
                  { width: 0, height: 4 },
                  0.1,
                  8,
                  6
                ),
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                📍 Explore Nearby
              </Text>
              <Text
                style={{
                  color: Colors.text.secondary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Discover interesting places and activities around you. Your next
                adventure is just around the corner!
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                ...createShadow(
                  Colors.status.warning,
                  { width: 0, height: 4 },
                  0.1,
                  8,
                  6
                ),
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                ⭐ Featured
              </Text>
              <Text
                style={{
                  color: Colors.text.secondary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Check out our featured recommendations just for you.
                Personalized experiences await!
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Profile Menu Modal */}
        <ProfileMenuModal />

        {/* Auth Loading Screen */}
        <AuthLoadingScreen isVisible={isLoading} type="logout" />

        <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
