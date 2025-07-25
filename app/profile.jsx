import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { auth } from "../config/firebaseConfig";

const { width } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const user = auth.currentUser;
  
  // Profile States
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  
  // Security States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  
  // Preferences States
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Loading States
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserPreferences();
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setProfileImage(profile.profileImage || null);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadUserPreferences = async () => {
    try {
      const preferences = await AsyncStorage.getItem('userPreferences');
      if (preferences) {
        const prefs = JSON.parse(preferences);
        setLanguage(prefs.language || "English");
        setTimezone(prefs.timezone || "UTC");
        setPushNotifications(prefs.pushNotifications ?? true);
        setEmailNotifications(prefs.emailNotifications ?? true);
        setDarkMode(prefs.darkMode ?? true);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  const saveUserProfile = async () => {
    try {
      const profile = {
        firstName,
        lastName,
        profileImage,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const saveUserPreferences = async () => {
    try {
      const preferences = {
        language,
        timezone,
        pushNotifications,
        emailNotifications,
        darkMode,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: '❌ Permission Required',
          text2: 'Please grant camera roll permissions to upload photos.',
          position: 'top'
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        
        setProfileImage(manipulatedImage.uri);
        Toast.show({
          type: 'success',
          text1: '📸 Photo Updated',
          text2: 'Profile picture has been updated successfully.',
          position: 'top'
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.show({
        type: 'error',
        text1: '❌ Upload Failed',
        text2: 'Failed to upload image. Please try again.',
        position: 'top'
      });
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: '❌ Permission Required',
          text2: 'Please grant camera permissions to take photos.',
          position: 'top'
        });
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        
        setProfileImage(manipulatedImage.uri);
        Toast.show({
          type: 'success',
          text1: '📸 Photo Captured',
          text2: 'Profile picture has been updated successfully.',
          position: 'top'
        });
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Toast.show({
        type: 'error',
        text1: '❌ Camera Failed',
        text2: 'Failed to take photo. Please try again.',
        position: 'top'
      });
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Update Profile Picture",
      "Choose an option",
      [
        { text: "📷 Take Photo", onPress: takePhoto },
        { text: "🖼️ Choose from Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({
        type: 'error',
        text1: '❌ Missing Information',
        text2: 'Please fill in both first and last name.',
        position: 'top'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Update Firebase display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Save to local storage
      await saveUserProfile();
      
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: '✅ Profile Updated',
        text2: 'Your profile has been saved successfully.',
        position: 'top'
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: 'error',
        text1: '❌ Update Failed',
        text2: 'Failed to update profile. Please try again.',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: '❌ Missing Fields',
        text2: 'Please fill in all password fields.',
        position: 'top'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: '❌ Password Mismatch',
        text2: 'New passwords do not match.',
        position: 'top'
      });
      return;
    }

    if (newPassword.length < 6) {
      Toast.show({
        type: 'error',
        text1: '❌ Weak Password',
        text2: 'Password must be at least 6 characters long.',
        position: 'top'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
      
      Toast.show({
        type: 'success',
        text1: '🔒 Password Updated',
        text2: 'Your password has been changed successfully.',
        position: 'top'
      });
    } catch (error) {
      console.error("Error changing password:", error);
      let errorMessage = 'Failed to change password. Please try again.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak.';
      }
      
      Toast.show({
        type: 'error',
        text1: '❌ Password Change Failed',
        text2: errorMessage,
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await saveUserPreferences();
      Toast.show({
        type: 'success',
        text1: '⚙️ Preferences Saved',
        text2: 'Your preferences have been updated.',
        position: 'top'
      });
    } catch (_error) {
      Toast.show({
        type: 'error',
        text1: '❌ Save Failed',
        text2: 'Failed to save preferences. Please try again.',
        position: 'top'
      });
    }
  };

  return (
    <SafeAreaView className="bg-[#0D1B2A] flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-[#404040]">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2"
          activeOpacity={0.8}
        >
          <Text className="text-[#ffa200] text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-xl text-[#FAFAFA] font-bold flex-1 text-center">
          Profile Settings
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingBottom: Platform.OS === 'ios' ? 20 : 55 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View className="items-center py-6">
          <TouchableOpacity 
            onPress={showImageOptions} 
            className="relative"
            activeOpacity={0.8}
          >
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={{
                  width: Math.min(width * 0.25, 100),
                  height: Math.min(width * 0.25, 100),
                  borderRadius: Math.min(width * 0.125, 50)
                }}
              />
            ) : (
              <View 
                style={{
                  width: Math.min(width * 0.25, 100),
                  height: Math.min(width * 0.25, 100),
                  borderRadius: Math.min(width * 0.125, 50)
                }}
                className="bg-[#ffa200] flex items-center justify-center"
              >
                <Text className="text-3xl text-white font-bold">
                  {firstName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>
            )}
            <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2979FF] rounded-full flex items-center justify-center">
              <Text className="text-white text-sm">📷</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-[#FAFAFA] text-sm mt-2 opacity-70">Tap to change photo</Text>
        </View>

        {/* Edit Profile Section */}
        <View className="bg-[#5f5f5f] rounded-lg p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[#FAFAFA] text-lg font-semibold">Personal Information</Text>
            <TouchableOpacity 
              onPress={() => setIsEditing(!isEditing)}
              activeOpacity={0.8}
            >
              <Text className="text-[#ffa200] text-sm">
                {isEditing ? "Cancel" : "✏️ Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-[#FAFAFA] text-sm mb-2">First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                editable={isEditing}
                className={`h-12 px-4 rounded-lg text-[#FAFAFA] ${
                  isEditing ? "bg-[#404040] border border-[#ffa200]" : "bg-[#404040]"
                }`}
                placeholder="Enter first name"
                placeholderTextColor="#999"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text className="text-[#FAFAFA] text-sm mb-2">Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                editable={isEditing}
                className={`h-12 px-4 rounded-lg text-[#FAFAFA] ${
                  isEditing ? "bg-[#404040] border border-[#ffa200]" : "bg-[#404040]"
                }`}
                placeholder="Enter last name"
                placeholderTextColor="#999"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text className="text-[#FAFAFA] text-sm mb-2">Email</Text>
              <TextInput
                value={email}
                editable={false}
                className="h-12 px-4 rounded-lg text-[#FAFAFA] bg-[#404040] opacity-60"
                placeholder="Email address"
                placeholderTextColor="#999"
              />
              <Text className="text-[#999] text-xs mt-1">Email cannot be changed</Text>
            </View>

            {isEditing && (
              <TouchableOpacity
                onPress={handleSaveProfile}
                disabled={isLoading}
                className={`h-12 rounded-lg flex items-center justify-center mt-2 ${
                  isLoading ? "bg-gray-400" : "bg-[#2979FF]"
                }`}
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold">
                  {isLoading ? "Saving..." : "💾 Save Changes"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Account Security Section */}
        <View className="bg-[#5f5f5f] rounded-lg p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[#FAFAFA] text-lg font-semibold">Account Security</Text>
            <TouchableOpacity 
              onPress={() => setShowPasswordSection(!showPasswordSection)}
              activeOpacity={0.8}
            >
              <Text className="text-[#ffa200] text-sm">
                {showPasswordSection ? "Cancel" : "🔒 Change Password"}
              </Text>
            </TouchableOpacity>
          </View>

          {showPasswordSection && (
            <View className="space-y-4">
              <View>
                <Text className="text-[#FAFAFA] text-sm mb-2">Current Password</Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  className="h-12 px-4 rounded-lg text-[#FAFAFA] bg-[#404040] border border-[#ffa200]"
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-[#FAFAFA] text-sm mb-2">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  className="h-12 px-4 rounded-lg text-[#FAFAFA] bg-[#404040] border border-[#ffa200]"
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-[#FAFAFA] text-sm mb-2">Confirm New Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="h-12 px-4 rounded-lg text-[#FAFAFA] bg-[#404040] border border-[#ffa200]"
                  placeholder="Confirm new password"
                  placeholderTextColor="#999"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                onPress={handleChangePassword}
                disabled={isLoading}
                className={`h-12 rounded-lg flex items-center justify-center mt-2 ${
                  isLoading ? "bg-gray-400" : "bg-[#ff4444]"
                }`}
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold">
                  {isLoading ? "Updating..." : "🔒 Update Password"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="mt-4 p-4 bg-[#404040] rounded-lg">
            <Text className="text-[#FAFAFA] text-sm font-semibold mb-3">Login History</Text>
            <View className="space-y-1">
              <Text className="text-[#999] text-xs">Last login: {new Date().toLocaleDateString()}</Text>
              <Text className="text-[#999] text-xs">Device: {Platform.OS === 'ios' ? 'iPhone' : 'Android'}</Text>
              <Text className="text-[#999] text-xs">Location: Current Device</Text>
            </View>
          </View>
        </View>

        {/* User Preferences Section */}
        <View className="bg-[#5f5f5f] rounded-lg p-4 mb-6">
          <Text className="text-[#FAFAFA] text-lg font-semibold mb-4">Preferences</Text>

          <View className="space-y-5">
            {/* Language */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-1 mr-4">
                <Text className="text-[#FAFAFA] text-base font-medium">Language</Text>
                <Text className="text-[#999] text-sm mt-1">App display language</Text>
              </View>
              <TouchableOpacity 
                className="bg-[#404040] px-4 py-2 rounded-lg"
                activeOpacity={0.8}
              >
                <Text className="text-[#ffa200] text-sm font-medium">{language}</Text>
              </TouchableOpacity>
            </View>

            {/* Timezone */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-1 mr-4">
                <Text className="text-[#FAFAFA] text-base font-medium">Timezone</Text>
                <Text className="text-[#999] text-sm mt-1">Your local timezone</Text>
              </View>
              <TouchableOpacity 
                className="bg-[#404040] px-4 py-2 rounded-lg"
                activeOpacity={0.8}
              >
                <Text className="text-[#ffa200] text-sm font-medium">{timezone}</Text>
              </TouchableOpacity>
            </View>

            {/* Push Notifications */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-1 mr-4">
                <Text className="text-[#FAFAFA] text-base font-medium">Push Notifications</Text>
                <Text className="text-[#999] text-sm mt-1">Receive push notifications</Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: "#404040", true: "#ffa200" }}
                thumbColor={pushNotifications ? "#fff" : "#999"}
                ios_backgroundColor="#404040"
              />
            </View>

            {/* Email Notifications */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-1 mr-4">
                <Text className="text-[#FAFAFA] text-base font-medium">Email Notifications</Text>
                <Text className="text-[#999] text-sm mt-1">Receive email updates</Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: "#404040", true: "#ffa200" }}
                thumbColor={emailNotifications ? "#fff" : "#999"}
                ios_backgroundColor="#404040"
              />
            </View>

            {/* Dark Mode */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-1 mr-4">
                <Text className="text-[#FAFAFA] text-base font-medium">Dark Mode</Text>
                <Text className="text-[#999] text-sm mt-1">Use dark theme</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#404040", true: "#ffa200" }}
                thumbColor={darkMode ? "#fff" : "#999"}
                ios_backgroundColor="#404040"
              />
            </View>

            <TouchableOpacity
              onPress={handleSavePreferences}
              className="h-12 bg-[#2979FF] rounded-lg flex items-center justify-center mt-6"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">💾 Save Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

export default Profile;