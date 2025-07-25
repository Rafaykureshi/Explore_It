import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import {
<<<<<<< HEAD
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
=======
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Colors } from "../../assets/Colors";
import logo from "../../assets/images/logo.png";
import AuthLoadingScreen from "../../components/AuthLoadingScreen";
import { auth } from "../../config/firebaseConfig";
import { createShadow } from "../../utils/shadowHelper";
import { useAuthLoading } from "../../utils/useAuthLoading";

<<<<<<< HEAD
const { width } = Dimensions.get("window");
=======
const { width } = Dimensions.get('window');
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14

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
<<<<<<< HEAD

        // Add minimum loading time to ensure the loading screen is visible
        const [signOutResult] = await Promise.all([
          signOut(auth),
          new Promise((resolve) => setTimeout(resolve, 1500)), // Minimum 1.5 seconds
        ]);

        console.log("Sign out completed");
        return signOutResult;
      }, "logout");
=======
        
        // Add minimum loading time to ensure the loading screen is visible
        const [signOutResult] = await Promise.all([
          signOut(auth),
          new Promise(resolve => setTimeout(resolve, 1500)) // Minimum 1.5 seconds
        ]);
        
        console.log("Sign out completed");
        return signOutResult;
      }, 'logout');
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14

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
<<<<<<< HEAD
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            paddingTop: 80,
            paddingRight: 16,
          }}
        >
=======
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          paddingTop: 80,
          paddingRight: 16,
        }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
          <LinearGradient
            colors={Colors.gradients.card}
            style={{
              borderRadius: 16,
              minWidth: 200,
<<<<<<< HEAD
              ...createShadow(
                Colors.primary.main,
                { width: 0, height: 8 },
                0.25,
                16,
                12
              ),
=======
              ...createShadow(Colors.primary.main, { width: 0, height: 8 }, 0.25, 16, 12),
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
              borderWidth: 1,
              borderColor: Colors.border.primary,
            }}
          >
            {/* User Info */}
<<<<<<< HEAD
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.border.primary,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
=======
            <View style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: Colors.border.primary,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                <LinearGradient
                  colors={Colors.gradients.secondary}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
<<<<<<< HEAD
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
=======
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{
                    color: Colors.text.primary,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
<<<<<<< HEAD
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
=======
                  <Text style={{
                    color: Colors.text.primary,
                    fontWeight: '600',
                    fontSize: 14,
                  }}>
                    {user?.email || "Guest User"}
                  </Text>
                  <Text style={{
                    color: Colors.text.secondary,
                    fontSize: 12,
                  }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
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
<<<<<<< HEAD
                  flexDirection: "row",
                  alignItems: "center",
=======
                  flexDirection: 'row',
                  alignItems: 'center',
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/profile");
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>👤</Text>
<<<<<<< HEAD
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
=======
                <Text style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                  My Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
<<<<<<< HEAD
                  flexDirection: "row",
                  alignItems: "center",
=======
                  flexDirection: 'row',
                  alignItems: 'center',
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Navigate to settings when implemented
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>⚙️</Text>
<<<<<<< HEAD
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
=======
                <Text style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
<<<<<<< HEAD
                  flexDirection: "row",
                  alignItems: "center",
=======
                  flexDirection: 'row',
                  alignItems: 'center',
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                }}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Help/Support functionality
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>❓</Text>
<<<<<<< HEAD
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
=======
                <Text style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                  Help & Support
                </Text>
              </TouchableOpacity>

              {/* Divider */}
<<<<<<< HEAD
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.border.primary,
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}
              />
=======
              <View style={{
                height: 1,
                backgroundColor: Colors.border.primary,
                marginHorizontal: 16,
                marginVertical: 8,
              }} />
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14

              {/* Logout */}
              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
<<<<<<< HEAD
                  flexDirection: "row",
                  alignItems: "center",
=======
                  flexDirection: 'row',
                  alignItems: 'center',
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                }}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>🚪</Text>
<<<<<<< HEAD
                <Text
                  style={{
                    color: Colors.status.error,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
=======
                <Text style={{
                  color: Colors.status.error,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );

<<<<<<< HEAD
  return (
    <LinearGradient colors={Colors.gradients.background} style={{ flex: 1 }}>
=======


  return (
    <LinearGradient
      colors={Colors.gradients.background}
      style={{ flex: 1 }}
    >
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
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
<<<<<<< HEAD
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
=======
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  fontSize: 16,
                  color: Colors.text.secondary,
                  fontWeight: '600',
                  marginRight: 8,
                }}>
                  Welcome to
                </Text>
                <Image 
                  source={logo} 
                  style={{
                    width: Math.min(width * 0.2, 80),
                    height: Math.min(width * 0.12, 48)
                  }}
                  resizeMode="contain" 
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
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
<<<<<<< HEAD
=======

>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                }}
              >
                <LinearGradient
                  colors={Colors.gradients.secondary}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
<<<<<<< HEAD
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
=======
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    color: Colors.text.primary,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Enhanced Content */}
<<<<<<< HEAD
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
=======
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 20 : 55 }}
        >
          <View style={{ padding: 16 }}>
            <Text style={{
              fontSize: 24,
              color: Colors.text.primary,
              fontWeight: 'bold',
              marginBottom: 16,
              textAlign: 'center',
            }}>
              🎉 Events & Activities
            </Text>
            
            {/* Enhanced Content Cards */}
            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                ...createShadow(Colors.primary.main, { width: 0, height: 4 }, 0.1, 8, 6),
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Text style={{
                color: Colors.text.primary,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
                🎪 No events available
              </Text>
              <Text style={{
                color: Colors.text.secondary,
                fontSize: 14,
                lineHeight: 20,
              }}>
                Check back later for upcoming events and activities. We&apos;re working on bringing you exciting experiences!
              </Text>
            </LinearGradient>

>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
<<<<<<< HEAD
                ...createShadow(
                  Colors.primary.main,
                  { width: 0, height: 4 },
                  0.1,
                  8,
                  6
                ),
=======
                ...createShadow(Colors.secondary.main, { width: 0, height: 4 }, 0.1, 8, 6),
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
<<<<<<< HEAD
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
=======
              <Text style={{
                color: Colors.text.primary,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
                📍 Explore Nearby
              </Text>
              <Text style={{
                color: Colors.text.secondary,
                fontSize: 14,
                lineHeight: 20,
              }}>
                Discover interesting places and activities around you. Your next adventure is just around the corner!
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={Colors.gradients.card}
              style={{
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
<<<<<<< HEAD
                ...createShadow(
                  Colors.secondary.main,
                  { width: 0, height: 4 },
                  0.1,
                  8,
                  6
                ),
=======
                ...createShadow(Colors.status.warning, { width: 0, height: 4 }, 0.1, 8, 6),
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
<<<<<<< HEAD
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
=======
              <Text style={{
                color: Colors.text.primary,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
                ⭐ Featured
              </Text>
              <Text style={{
                color: Colors.text.secondary,
                fontSize: 14,
                lineHeight: 20,
              }}>
                Check out our featured recommendations just for you. Personalized experiences await!
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Profile Menu Modal */}
        <ProfileMenuModal />

        {/* Auth Loading Screen */}
<<<<<<< HEAD
        <AuthLoadingScreen isVisible={isLoading} type="logout" />
=======
        <AuthLoadingScreen 
          isVisible={isLoading} 
          type="logout"
        />
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14

        <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
