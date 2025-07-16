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
import logo from "../../assets/images/logo.png";
import validationSchema from "../../utils/authSchema";

const Signin = () => {
  const router = useRouter();
  const handleSignin = () => {};
  return (
    <SafeAreaView className={"bg-[#0D1B2A]"}>
      <ScrollView contentContainerStyle={{ height: "100%" }} scrollEnabled>
        <View className={"m-2 flex justify-center items-center"}>
          <Image
            source={logo}
            style={{ width: 250, height: 150, marginTop: "10px" }}
          />
          <Text
            className={"text-lg text-center text-[#FFa200] font-bold mb-10"}
          >
            Let's get you started
          </Text>

          <View className={"w-5/6"}>
            <Formik
              initialValues={{ email: "", password: "", cpassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignin}
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
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-4 "
                    }
                    onChangeText={handleChange("fname")}
                    onBlur={handleBlur("fname")}
                    value={values.fname}
                    placeholder="First Name"
                    placeholderTextColor={"#FFa200"}
                    keyboardType="name-phone-pad"
                  />
                  {touched.fname && errors.fname && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.fname}
                    </Text>
                  )}
                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-4"
                    }
                    onChangeText={handleChange("lname")}
                    onBlur={handleBlur("lname")}
                    value={values.lname}
                    placeholder="Last Name"
                    placeholderTextColor={"#FFa200"}
                    keyboardType="name-phone-pad"
                  />
                  {touched.lname && errors.lname && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.lname}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-4"
                    }
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor={"#FFa200"}
                  />
                  {touched.email && errors.email && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.email}
                    </Text>
                  )}

                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-4"
                    }
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor={"#FFa200"}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.password}
                    </Text>
                  )}
                  <TextInput
                    className={
                      "h-12 border border-[#FAFAFA] text-[#FAFAFA] rounded px-2 mt-2 mb-4"
                    }
                    onChangeText={handleChange("cpassword")}
                    onBlur={handleBlur("cpassword")}
                    secureTextEntry
                    value={values.cpassword}
                    placeholderTextColor={"#FFa200"}
                    placeholder="Confirm Password"
                  />
                  {touched.cpassword && errors.cpassword && (
                    <Text className={"text-red-500 text-xs mb-2"}>
                      {errors.cpassword}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className={
                      "p-2 my-2 mt-10 bg-[#2979FF] text-black rounded-lg"
                    }
                  >
                    <Text className={"text-lg font-semibold text-center"}>
                      Sign In
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
                  New User{" "}
                </Text>
                <Text
                  className={
                    "text-base underline font-semibold text-center text-[#FFa200]"
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
                onPress={() => router.push("/home")}
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
    </SafeAreaView>
  );
};

export default Signin;
