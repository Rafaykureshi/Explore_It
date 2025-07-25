import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Colors } from "../../assets/Colors";
import logo from "../../assets/images/logo.png";
import AuthLoadingScreen from "../../components/AuthLoadingScreen";
import PasswordInput from "../../components/PasswordInput";
import { auth } from "../../config/firebaseConfig";
import { signupSchema } from "../../utils/authSchema";
import { createShadow } from "../../utils/shadowHelper";
import { useAuthLoading } from "../../utils/useAuthLoading";

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const router = useRouter();
  const { isLoading, withLoading } = useAuthLoading();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  const handleSignup = async (values, { setSubmitting, setFieldError }) => {
    console.log("Starting signup process...", values.email);

    try {
      await withLoading(async () => {
        // Create user with email and password
        console.log("Creating user with Firebase Auth...");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log("User created successfully:", userCredential.user.uid);

        // Skip Firestore for now - just create the auth account
        console.log(
          "User account created successfully, skipping Firestore for now"
        );
      }, 'signup');

      // Reset button state immediately
      setSubmitting(false);

      // Show modern toast notification
      Toast.show({
        type: "success",
        text1: "🎉 Account Created!",
        text2: "Welcome! Your account has been created successfully.",
        visibilityTime: 3000,
        position: "top",
      });

      // Navigate after a short delay to show the toast
      setTimeout(() => {
        console.log("Redirecting to signin...");
        router.replace("/signin");
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Handle specific Firebase Auth errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setFieldError("email", "This email is already registered");
          Toast.show({
            type: "error",
            text1: "❌ Email Already Exists",
            text2:
              "This email is already registered. Please use a different email.",
            visibilityTime: 4000,
            position: "top",
          });
          break;
        case "auth/weak-password":
          setFieldError("password", "Password is too weak");
          Toast.show({
            type: "error",
            text1: "❌ Weak Password",
            text2: "Password must be at least 6 characters long.",
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
        default:
          Toast.show({
            type: "error",
            text1: "❌ Signup Failed",
            text2:
              error.message || "Failed to create account. Please try again.",
            visibilityTime: 4000,
            position: "top",
          });
      }
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={Colors.gradients.background}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background.primary} />
        <AuthLoadingScreen
          isVisible={isLoading}
          type="signup"
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height - (Platform.OS === 'ios' ? 100 : 80)
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 24 }}>
            {/* Logo Section */}
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
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
                🚀 Create Account
              </Text>
            </View>

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
                initialValues={{
                  fname: "",
                  lname: "",
                  email: "",
                  password: "",
                  cpassword: "",
                }}
                validationSchema={signupSchema}
                onSubmit={handleSignup}
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
                    {/* Name Fields Row */}
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          color: Colors.secondary.main,
                          fontSize: 14,
                          fontWeight: '600',
                          marginBottom: 8,
                        }}>
                          👤 First Name
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
                          onChangeText={handleChange("fname")}
                          onBlur={handleBlur("fname")}
                          value={values.fname}
                          placeholder="First name"
                          placeholderTextColor={Colors.text.tertiary}
                          autoCorrect={false}
                        />
                        {touched.fname && errors.fname && (
                          <Text style={{
                            color: Colors.status.error,
                            fontSize: 12,
                            marginBottom: 12,
                            marginLeft: 4,
                          }}>
                            {errors.fname}
                          </Text>
                        )}
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={{
                          color: Colors.secondary.main,
                          fontSize: 14,
                          fontWeight: '600',
                          marginBottom: 8,
                        }}>
                          👤 Last Name
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
                          onChangeText={handleChange("lname")}
                          onBlur={handleBlur("lname")}
                          value={values.lname}
                          placeholder="Last name"
                          placeholderTextColor={Colors.text.tertiary}
                          autoCorrect={false}
                        />
                        {touched.lname && errors.lname && (
                          <Text style={{
                            color: Colors.status.error,
                            fontSize: 12,
                            marginBottom: 12,
                            marginLeft: 4,
                          }}>
                            {errors.lname}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Text style={{
                      color: Colors.secondary.main,
                      fontSize: 14,
                      fontWeight: '600',
                      marginBottom: 8,
                      marginTop: 16,
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
                      placeholder="Enter your email address"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="email-address"
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
                      placeholder="Create a strong password"
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

                    <Text style={{
                      color: Colors.secondary.main,
                      fontSize: 14,
                      fontWeight: '600',
                      marginBottom: 8,
                      marginTop: 16,
                    }}>
                      🔒 Confirm Password
                    </Text>
                    <PasswordInput
                      value={values.cpassword}
                      onChangeText={handleChange("cpassword")}
                      onBlur={handleBlur("cpassword")}
                      placeholder="Confirm your password"
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
                    {touched.cpassword && errors.cpassword && (
                      <Text style={{
                        color: Colors.status.error,
                        fontSize: 12,
                        marginBottom: 12,
                        marginLeft: 4,
                      }}>
                        {errors.cpassword}
                      </Text>
                    )}

                    {/* Sign Up Button with Gradient */}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                      style={{
                        marginVertical: 24,
                        borderRadius: 12,
                        ...createShadow(Colors.status.success, { width: 0, height: 4 }, 0.3, 8, 8),
                      }}
                    >
                      <LinearGradient
                        colors={isSubmitting ? [Colors.interactive.disabled, Colors.interactive.disabled] : Colors.gradients.success}
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
                          {isSubmitting ? "🔄 Creating Account..." : "🚀 Sign Up"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>

              {/* Navigation Links */}
              <View style={{ alignItems: 'center', marginTop: 24 }}>
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
                    marginRight: 4,
                  }}>
                    Already have an account?
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: Colors.secondary.main,
                    textDecoration: 'underline',
                  }}>
                    Sign In
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
                    Skip registration • Explore features instantly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;
