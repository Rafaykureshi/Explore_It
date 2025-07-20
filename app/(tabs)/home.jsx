import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import {
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
import logo from "../../assets/images/logo.png";
import { auth } from "../../config/firebaseConfig";

const home = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = auth.currentUser;

  const handleLogout = async () => {
    setShowProfileMenu(false);

    try {
      await signOut(auth);

      Toast.show({
        type: 'success',
        text1: '👋 Logged Out',
        text2: 'You have been successfully logged out.',
        visibilityTime: 2000,
        position: 'top'
      });

      setTimeout(() => {
        router.replace("/signin");
      }, 1000);

    } catch (error) {
      console.error("Logout error:", error);
      Toast.show({
        type: 'error',
        text1: '❌ Logout Failed',
        text2: 'Failed to log out. Please try again.',
        visibilityTime: 3000,
        position: 'top'
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
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={() => setShowProfileMenu(false)}
      >
        <View className="flex-1 justify-start items-end pt-20 pr-4">
          <View className="bg-[#5f5f5f] rounded-lg shadow-lg min-w-48">
            {/* User Info */}
            <View className="p-4 border-b border-[#404040]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#ffa200] rounded-full flex items-center justify-center mr-3">
                  <Text className="text-white font-bold text-lg">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[#FAFAFA] font-semibold text-sm">
                    {user?.email || "user@example.com"}
                  </Text>
                  <Text className="text-[#FAFAFA] opacity-70 text-xs">
                    Signed in
                  </Text>
                </View>
              </View>
            </View>

            {/* Menu Options */}
            <View className="py-2">
              <TouchableOpacity
                className="px-4 py-3 flex-row items-center"
                onPress={() => {
                  setShowProfileMenu(false);
                  router.push("/profile");
                }}
              >
                <Text className="text-2xl mr-3">👤</Text>
                <Text className="text-[#FAFAFA] text-base">My Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-3 flex-row items-center"
                onPress={() => {
                  setShowProfileMenu(false);
                  // Navigate to settings when implemented
                }}
              >
                <Text className="text-2xl mr-3">⚙️</Text>
                <Text className="text-[#FAFAFA] text-base">Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-3 flex-row items-center"
                onPress={() => {
                  setShowProfileMenu(false);
                  // Help/Support functionality
                }}
              >
                <Text className="text-2xl mr-3">❓</Text>
                <Text className="text-[#FAFAFA] text-base">Help & Support</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="h-px bg-[#404040] mx-4 my-2" />

              {/* Logout */}
              <TouchableOpacity
                className="px-4 py-3 flex-row items-center"
                onPress={handleLogout}
              >
                <Text className="text-2xl mr-3">🚪</Text>
                <Text className="text-[#ff4444] text-base font-semibold">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md">
      {/* <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg "
      /> */}
      <Text className="text-[#FAFAFA] text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-[#fafafa] text-base mb-2">{item.address}</Text>
      <Text className="text-[#fafafa] text-base mb-2">
        Open: {item.opening} Close: {item.closing}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#0D1B2A" },
        Platform.OS == "android" && { paddingBottom: 55 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View className="flex items-center justify-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-center items-center flex flex-row p-2">
          <View className="flex flex-row items-center justify-center flex-1">
            <Text
              className={`text-base h-10 pt-[${Platform.OS == "ios" ? 8 : 6.5
                }] align-middle text-[#FAFAFA]`}
            >
              Welcome to{" "}
            </Text>
            <Image source={logo} resizeMode="cover" className="w-20 h-12" />
          </View>

          {/* Profile Avatar/Menu Button */}
          <TouchableOpacity
            onPress={() => setShowProfileMenu(true)}
            className="w-10 h-10 bg-[#ffa200] rounded-full flex items-center justify-center ml-3"
          >
            <Text className="text-white font-bold text-lg">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="p-4 bg-[#0D1B2A] flex-row items-center">
          <Text className="text-3xl text-[#FAFAFA] mr-2 font-semibold">
            Events here
          </Text>
        </View>
      </ScrollView>

      {/* Profile Menu Modal */}
      <ProfileMenuModal />

      <Toast />
    </SafeAreaView>
  );
};

export default home;
