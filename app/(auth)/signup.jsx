import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import emptyImg from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
import { auth } from "../../config/firebaseConfig";
import { signupSchema } from "../../utils/authSchema";

const Signup = () => {
  const router = useRouter();

  const handleSignup = async (values, { setSubmitting, setFieldError }) => {
    console.log("Starting signup process...", values.email);

    try {
      // Create user with email and password
      console.log("Creating user with Firebase Auth...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("User created successfully:", userCredential.user.uid);

      // Skip Firestore for now - just create the auth account
      console.log("User account created successfully, skipping Firestore for now");

      // Reset button state immediately
      setSubmitting(false);
      
      // Show modern toast notification
      Toast.show({
        type: 'success',
        text1: '🎉 Account Created!',
        text2: 'Welcome! Your account has been created successfully.',
        visibilityTime: 3000,
        position: 'top'
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
            type: 'error',
            text1: '❌ Email Already Exists',
            text2: 'This email is already registered. Please use a different email.',
            visibilityTime: 4000,
            position: 'top'
          });
          break;
        case "auth/weak-password":
          setFieldError("password", "Password is too weak");
          Toast.show({
            type: 'error',
            text1: '❌ Weak Password',
            text2: 'Password must be at least 6 characters long.',
            visibilityTime: 4000,
            position: 'top'
          });
          break;
        case "auth/invalid-email":
          setFieldError("email", "Invalid email address");
          Toast.show({
            type: 'error',
            text1: '❌ Invalid Email',
            text2: 'Please enter a valid email address.',
            visibilityTime: 4000,
            position: 'top'
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: '❌ Signup Failed',
            text2: error.message || 'Failed to create account. Please try again.',
            visibilityTime: 4000,
            position: 'top'
          });
      }
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className={"bg-[#0D1B2A]"}>
      <ScrollView contentContainerStyle={{ height: "100%" }} scrollEnabled>
        <View className={"m-2 flex justify-center items-center"}>
          <Image source={logo} style={{ width: 250, height: 150 }} />
          <Text
            className={"text-lg text-center text-[#ffa200] font-bold mb-10"}
          >
            Welcome Back
          </Text>

          <View className={"w-5/6"}>
            <Formik
              initialValues={{
                fname: "",
                lname: "",
                email: "",
                password: "",
                cpassword: ""
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
                <View className={"w-full"}>
                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("fname")}
                    onBlur={handleBlur("fname")}
                    value={values.fname}
                    placeholder="First Name"
                    placeholderTextColor={"#ffa200"}
                  />
                  {touched.fname && errors.fname && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.fname}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("lname")}
                    onBlur={handleBlur("lname")}
                    value={values.lname}
                    placeholder="Last Name"
                    placeholderTextColor={"#ffa200"}
                  />
                  {touched.lname && errors.lname && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.lname}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    placeholderTextColor={"#ffa200"}
                    keyboardType="email-address"
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
                    placeholderTextColor={"#ffa200"}
                    placeholder="Password"
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.password}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-2"
                    }
                    onChangeText={handleChange("cpassword")}
                    onBlur={handleBlur("cpassword")}
                    secureTextEntry
                    placeholderTextColor={"#ffa200"}
                    placeholder="Confirm Password"
                    value={values.cpassword}
                  />
                  {touched.cpassword && errors.cpassword && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.cpassword}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    className={`p-2 my-2 mt-10 ${isSubmitting ? "bg-gray-400" : "bg-[#2979FF]"
                      } text-black rounded-lg`}
                  >
                    <Text className={"text-lg font-semibold text-center"}>
                      {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className={"flex flex-row justify-center mt-5 p-2 items-center"}
                onPress={() => router.push("/signin")}
              >
                <Text className={"text-[#FAFAFA] font-semibold"}>
                  Already have an account?{" "}
                </Text>
                <Text
                  className={
                    "text-base underline font-semibold text-center text-[#ffa200]"
                  }
                >
                  Sign In
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
                onPress={() => router.replace("/(tabs)/home")}
              >
                <Text className={"text-[#FAFAFA] font-semibold"}>Be a</Text>
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
        <View className={"flex-1"}>
          <Image
            source={emptyImg}
            className={"w-full h-full"}
            resizeMode="contain"
          />
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#0D1B2A"} />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Signup;
