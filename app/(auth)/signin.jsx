import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik } from "formik";
import {
<<<<<<< HEAD
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
=======
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Colors } from "../../assets/Colors";
import logo from "../../assets/images/logo.png";
import AuthLoadingScreen from "../../components/AuthLoadingScreen";
import PasswordInput from "../../components/PasswordInput";
import { auth } from "../../config/firebaseConfig";
import { signinSchema } from "../../utils/authSchema";
import { createShadow } from "../../utils/shadowHelper";
import { useAuthLoading } from "../../utils/useAuthLoading";

<<<<<<< HEAD
const { width, height } = Dimensions.get("window");

const Signin = () => {
  const router = useRouter();
  const { isLoading, loadingType, startLoading, stopLoading } =
    useAuthLoading();
=======
const { width, height } = Dimensions.get('window');

const Signin = () => {
  const router = useRouter();
  const { isLoading, loadingType, startLoading, stopLoading } = useAuthLoading();
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14

  const handlePasswordReset = async (email) => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "❌ Email Required",
        text2: "Please enter your email address first.",
        visibilityTime: 3000,
        position: "top",
      });
      return;
    }

    try {
<<<<<<< HEAD
      startLoading("login", "Sending password reset email...");
=======
      startLoading('login', 'Sending password reset email...');
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
      await sendPasswordResetEmail(auth, email);
      stopLoading();
      Toast.show({
        type: "success",
        text1: "📧 Reset Email Sent!",
        text2: "Check your email for password reset instructions.",
        visibilityTime: 4000,
        position: "top",
      });
    } catch (error) {
      stopLoading();
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send reset email. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      Toast.show({
        type: "error",
        text1: "❌ Reset Failed",
        text2: errorMessage,
        visibilityTime: 4000,
        position: "top",
      });
    }
  };
  const handleGuest = async () => {
    try {
<<<<<<< HEAD
      startLoading("login", "Setting up guest session...");
      await AsyncStorage.setItem("isGuest", "true");

      // Short delay to show the loading animation
      await new Promise((resolve) => setTimeout(resolve, 800));

=======
      startLoading('login', 'Setting up guest session...');
      await AsyncStorage.setItem("isGuest", "true");
      
      // Short delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
      stopLoading();
      router.push("/home");
    } catch (error) {
      stopLoading();
      console.error("Guest login error:", error);
      Toast.show({
        type: "error",
        text1: "❌ Error",
        text2: "Failed to continue as guest. Please try again.",
        visibilityTime: 3000,
        position: "top",
      });
    }
  };
  const handleSignin = async (values, { setSubmitting, setFieldError }) => {
    console.log("Attempting signin with:", values.email);
    
    try {
<<<<<<< HEAD
      startLoading("login");
=======
      startLoading('login');
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log("Signin successful:", userCredential.user.uid);

      // Reset button state immediately
      setSubmitting(false);

      // Show modern toast notification
      Toast.show({
        type: "success",
        text1: "🎉 Welcome Back!",
        text2: "You have successfully signed in to your account.",
        visibilityTime: 3000,
        position: "top",
      });

      // Navigate after a short delay to show the toast
      setTimeout(() => {
        stopLoading();
        console.log("Navigating to home...");
        router.replace("/(tabs)/home");
      }, 1000);
    } catch (error) {
      stopLoading();
      console.error("Signin error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/user-not-found":
          setFieldError("email", "No account found with this email");
          Toast.show({
            type: "error",
            text1: "❌ Account Not Found",
            text2: "No account found with this email. Please check or sign up.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setFieldError("password", "Incorrect password");
          Toast.show({
            type: "error",
            text1: "❌ Invalid Credentials",
            text2: "Incorrect email or password. Please try again.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        case "auth/invalid-email":
          setFieldError("email", "Invalid email address");
          Toast.show({
            type: "error",
            text1: "❌ Invalid Email",
            text2: "Please enter a valid email address.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        case "auth/user-disabled":
          Toast.show({
            type: "error",
            text1: "❌ Account Disabled",
            text2: "This account has been disabled. Please contact support.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        case "auth/too-many-requests":
          Toast.show({
            type: "error",
            text1: "❌ Too Many Attempts",
            text2: "Too many failed attempts. Please try again later.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "❌ Sign In Failed",
            text2: error.message || "Failed to sign in. Please try again.",
            visibilityTime: 4000,
            position: "top",
          });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <LinearGradient colors={Colors.gradients.background} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.background.primary}
        />
        <AuthLoadingScreen isVisible={isLoading} type={loadingType} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height - (Platform.OS === "ios" ? 100 : 80),
=======
    <LinearGradient
      colors={Colors.gradients.background}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background.primary} />
        <AuthLoadingScreen 
          isVisible={isLoading} 
          type={loadingType} 
        />
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1,
            minHeight: height - (Platform.OS === 'ios' ? 100 : 80)
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
<<<<<<< HEAD
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 32,
            }}
          >
            {/* Logo Section */}
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <Image
                source={logo}
                style={{
                  width: Math.min(width * 0.6, 240),
                  height: Math.min(width * 0.36, 144),
                  maxWidth: 240,
                  maxHeight: 144,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: Colors.secondary.main,
                  marginTop: 16,
                }}
              >
=======
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
            {/* Logo Section */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Image
                source={logo}
                style={{ 
                  width: Math.min(width * 0.6, 240), 
                  height: Math.min(width * 0.36, 144),
                  maxWidth: 240,
                  maxHeight: 144
                }}
                resizeMode="contain"
              />
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Colors.secondary.main,
                marginTop: 16,
              }}>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
                ✨ Welcome Back
              </Text>
            </View>

<<<<<<< HEAD
            {/* Form Section with Card Background */}
            <View
              style={{
                width: "100%",
                maxWidth: 400,
                backgroundColor: Colors.background.secondary,
                borderRadius: 20,
                padding: 24,
                ...createShadow(
                  Colors.primary.main,
                  { width: 0, height: 8 },
                  0.15,
                  16,
                  12
                ),
                borderWidth: 1,
                borderColor: Colors.border.primary,
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signinSchema}
                onSubmit={handleSignin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <View className="w-full">
                    <Text
                      style={{
                        color: Colors.secondary.main,
                        fontSize: 14,
                        fontWeight: "600",
                        marginBottom: 8,
                      }}
                    >
                      📧 Email
                    </Text>
                    <TextInput
                      style={{
                        height: 48,
                        backgroundColor: Colors.background.tertiary,
                        borderColor: Colors.border.primary,
                        borderWidth: 1,
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        color: Colors.text.primary,
                        fontSize: 16,
                        marginBottom: 4,
                      }}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      placeholder="Enter your email address"
                      placeholderTextColor={Colors.text.tertiary}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {touched.email && errors.email && (
                      <Text
                        style={{
                          color: Colors.status.error,
                          fontSize: 12,
                          marginBottom: 12,
                          marginLeft: 4,
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}

                    <Text
                      style={{
                        color: Colors.secondary.main,
                        fontSize: 14,
                        fontWeight: "600",
                        marginBottom: 8,
                        marginTop: 16,
                      }}
                    >
                      🔒 Password
                    </Text>
                    <PasswordInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder="Enter your password"
                      placeholderTextColor={Colors.text.tertiary}
                      style={{
                        height: 48,
                        backgroundColor: Colors.background.tertiary,
                        borderColor: Colors.border.primary,
                        borderWidth: 1,
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        color: Colors.text.primary,
                        fontSize: 16,
                        marginBottom: 4,
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text
                        style={{
                          color: Colors.status.error,
                          fontSize: 12,
                          marginBottom: 12,
                          marginLeft: 4,
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}

                    {/* Sign In Button with Logo-Matched Gradient */}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                      style={{
                        marginVertical: 24,
                        borderRadius: 12,
                        ...createShadow(
                          Colors.secondary.main,
                          { width: 0, height: 4 },
                          0.3,
                          8,
                          8
                        ),
                      }}
                    >
                      <LinearGradient
                        colors={
                          isSubmitting
                            ? [
                                Colors.interactive.disabled,
                                Colors.interactive.disabled,
                              ]
                            : ["#F59E0B", "#EF4444"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          paddingVertical: 16,
                          paddingHorizontal: 24,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            textAlign: "center",
                            color: Colors.text.primary,
                          }}
                        >
                          {isSubmitting ? "🔄 Signing In..." : "🚀 Sign In"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Forgot Password Button */}
                    <TouchableOpacity
                      onPress={() => handlePasswordReset(values.email)}
                      activeOpacity={0.8}
                      style={{ paddingVertical: 8 }}
                    >
                      <Text
                        style={{
                          color: Colors.secondary.main,
                          textAlign: "center",
                          fontWeight: "600",
                          fontSize: 14,
                          textDecoration: "underline",
                        }}
                      >
                        🔑 Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>

              {/* Navigation Links */}
              <View style={{ alignItems: "center", marginTop: 24 }}>
                <TouchableOpacity
                  onPress={() => router.push("/signup")}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.text.secondary,
                      fontWeight: "600",
                      marginRight: 4,
                    }}
                  >
                    New user?
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: Colors.secondary.main,
                      textDecoration: "underline",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 16,
                  }}
                >
                  <LinearGradient
                    colors={[Colors.primary.main, "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, height: 1, marginHorizontal: 16 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: Colors.text.secondary,
                      paddingHorizontal: 8,
                    }}
                  >
                    or
                  </Text>
                  <LinearGradient
                    colors={["transparent", Colors.primary.main]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, height: 1, marginHorizontal: 16 }}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleGuest}
                  activeOpacity={0.8}
                  style={{
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: "rgba(245, 158, 11, 0.05)",
                    borderWidth: 1,
                    borderColor: "rgba(245, 158, 11, 0.2)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: Colors.secondary.main,
                      textDecoration: "underline",
                      marginBottom: 2,
                    }}
                  >
                    👤 Try as Guest
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      color: Colors.secondary.main,
                      opacity: 0.7,
                      textAlign: "center",
                    }}
                  >
                    No sign-up required • Limited access but full preview
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Toast />
      </SafeAreaView>
=======
          {/* Form Section with Card Background */}
          <View 
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: Colors.background.secondary,
              borderRadius: 20,
              padding: 24,
              ...createShadow(Colors.primary.main, { width: 0, height: 8 }, 0.15, 16, 12),
              borderWidth: 1,
              borderColor: Colors.border.primary,
            }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={signinSchema}
              onSubmit={handleSignin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View className="w-full">
                  <Text style={{
                    color: Colors.secondary.main,
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 8,
                  }}>
                    📧 Email
                  </Text>
                  <TextInput
                    style={{
                      height: 48,
                      backgroundColor: Colors.background.tertiary,
                      borderColor: Colors.border.primary,
                      borderWidth: 1,
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      color: Colors.text.primary,
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    placeholder="Enter your email address"
                    placeholderTextColor={Colors.text.tertiary}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {touched.email && errors.email && (
                    <Text style={{
                      color: Colors.status.error,
                      fontSize: 12,
                      marginBottom: 12,
                      marginLeft: 4,
                    }}>
                      {errors.email}
                    </Text>
                  )}

                  <Text style={{
                    color: Colors.secondary.main,
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 8,
                    marginTop: 16,
                  }}>
                    🔒 Password
                  </Text>
                  <PasswordInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.text.tertiary}
                    style={{
                      height: 48,
                      backgroundColor: Colors.background.tertiary,
                      borderColor: Colors.border.primary,
                      borderWidth: 1,
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      color: Colors.text.primary,
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                  />
                  {touched.password && errors.password && (
                    <Text style={{
                      color: Colors.status.error,
                      fontSize: 12,
                      marginBottom: 12,
                      marginLeft: 4,
                    }}>
                      {errors.password}
                    </Text>
                  )}

                  {/* Sign In Button with Logo-Matched Gradient */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    activeOpacity={0.8}
                    style={{
                      marginVertical: 24,
                      borderRadius: 12,
                      ...createShadow(Colors.secondary.main, { width: 0, height: 4 }, 0.3, 8, 8),
                    }}
                  >
                    <LinearGradient
                      colors={isSubmitting ? [Colors.interactive.disabled, Colors.interactive.disabled] : ['#F59E0B', '#EF4444']}
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
                        color: Colors.text.primary,
                      }}>
                        {isSubmitting ? "🔄 Signing In..." : "🚀 Sign In"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Forgot Password Button */}
                  <TouchableOpacity
                    onPress={() => handlePasswordReset(values.email)}
                    activeOpacity={0.8}
                    style={{ paddingVertical: 8 }}
                  >
                    <Text style={{
                      color: Colors.secondary.main,
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 14,
                      textDecoration: 'underline',
                    }}>
                      🔑 Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Navigation Links */}
            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <TouchableOpacity
                onPress={() => router.push("/signup")}
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
                  marginRight: 4,
                }}>
                  New user?
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.secondary.main,
                  textDecoration: 'underline',
                }}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 16,
              }}>
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
                  paddingHorizontal: 8,
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
                onPress={handleGuest}
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(245, 158, 11, 0.2)',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.secondary.main,
                  textDecoration: 'underline',
                  marginBottom: 2,
                }}>
                  👤 Try as Guest
                </Text>
                <Text style={{
                  fontSize: 11,
                  fontWeight: '500',
                  color: Colors.secondary.main,
                  opacity: 0.7,
                  textAlign: 'center',
                }}>
                  No sign-up required • Limited access but full preview
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
>>>>>>> f55101bd3974cfa2e622b543cb1b8431ddf6ab14
    </LinearGradient>
  );
};

export default Signin;
