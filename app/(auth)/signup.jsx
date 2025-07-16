import { useRouter } from "expo-router";
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
import emptyImg from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
import validationSchema from "../../utils/authSchema";

const Signup = () => {
  const router = useRouter();
  const handleSignup = () => {};
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
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className={"w-full"}>
                  <TextInput
                    className={
                      "h-12 border border-white text-white rounded px-2 mt-2 mb-4"
                    }
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                    placeholderTextColor={"#ffa200"}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.email}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-white text-white rounded px-2"
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

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className={
                      "p-2 my-2 mt-10 bg-[#2979FF] text-black rounded-lg"
                    }
                  >
                    <Text className={"text-lg font-semibold text-center"}>
                      Sign Up
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
                <Text className={"text-white font-semibold"}>
                  Already a User?{" "}
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
                className={"text-lg font-semibold text-center mb-4 text-white"}
              >
                <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />{" "}
                or{" "}
                <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />
              </Text>
              <TouchableOpacity
                className={"flex flex-row justify-center mb-5 p-2 items-center"}
                onPress={() => router.push("/home")}
              >
                <Text className={"text-white font-semibold"}>Be a</Text>
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
    </SafeAreaView>
  );
};

export default Signup;
