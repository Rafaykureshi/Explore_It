import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik } from "formik";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import logo from "../../assets/images/logo.png";
import { auth } from "../../config/firebaseConfig";
import { signinSchema } from "../../utils/authSchema";

const Signin = () => {
  const router = useRouter();

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
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: "📧 Reset Email Sent!",
        text2: "Check your email for password reset instructions.",
        visibilityTime: 4000,
        position: "top",
      });
    } catch (error) {
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
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };
  const handleSignin = async (values, { setSubmitting, setFieldError }) => {
    console.log("Attempting signin with:", values.email);

    try {
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
        console.log("Navigating to home...");
        router.replace("/(tabs)/home");
      }, 1000);
    } catch (error) {
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
    <SafeAreaView className={"bg-[#0D1B2A]"}>
      <ScrollView contentContainerStyle={{ height: "100%" }} scrollEnabled>
        <View className={"m-2 flex justify-center items-center"}>
          <Image
            source={logo}
            style={{ width: 250, height: 150, marginTop: "10px" }}
          />
          <Text
            className={"text-lg text-center text-[#ffa200] font-bold mb-10"}
          >
            Welcome Back
          </Text>

          <View className={"w-5/6"}>
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
                <View className={"w-full"}>
                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor={"#ffa200"}
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.email}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor={"#ffa200"}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    className={`p-2 my-2 mt-10 ${
                      isSubmitting ? "bg-gray-400" : "bg-[#2979FF]"
                    } text-black rounded-lg`}
                  >
                    <Text className={"text-lg font-semibold text-center"}>
                      {isSubmitting ? "Signing In..." : "Sign In"}
                    </Text>
                  </TouchableOpacity>

                  {/* Forgot Password Button */}
                  <TouchableOpacity
                    onPress={() => handlePasswordReset(values.email)}
                    className={"mt-4 p-2"}
                  >
                    <Text
                      className={
                        "text-[#ffa200] text-center font-semibold text-sm underline"
                      }
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className={"flex flex-row justify-center mt-5 p-2 items-center"}
                onPress={() => router.push("/signup")}
              >
                <Text className={"text-[#FAFAFA] font-semibold"}>
                  New user?{" "}
                </Text>
                <Text
                  className={
                    "text-base underline font-semibold text-center text-[#ffa200]"
                  }
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <Text
                className={
                  "text-lg font-semibold text-center mb-4 text-[#FAFAFA]"
                }
              >
                <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />{" "}
                or{" "}
                <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />
              </Text>
              <TouchableOpacity
                className={"flex flex-row justify-center mb-5 p-2 items-center"}
                onPress={handleGuest}
              >
                <Text className={"text-[#FAFAFA] font-semibold "}>Be a</Text>
                <Text
                  className={
                    "text-base underline font-semibold text-center text-[#ffa200]"
                  }
                >
                  {" "}
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className={"flex-1 flex"}>
          {/* <Image
            source={emptyImg}
            className={"w-full h-full"}
            resizeMode="contain"
          /> */}
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Signin;
