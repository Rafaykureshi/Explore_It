import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import emptyImg from "../assets/images/banner.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../assets/images/logo.png";

// const logo = require("../assets/images/dinetimelogo.png")

export default function Index() {
  const router = useRouter();
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  return (
    <SafeAreaView className={"bg-[#0D1B2A]"}>
      <ScrollView contentContainerStyle={{ height: "100%" }} scrollEnabled>
        <View className={"m-2 flex justify-center items-center mb-[50px]"}>
          <Image
            source={logo}
            style={{ width: 300, height: 300, marginTop: "10px" }}
          />
          <View className={"w-3/4"}>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className={"p-2 my-2 bg-[#2979FF] text-black rounded-lg"}
            >
              <Text className={"text-lg font-semibold text-center"}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGuest}
              className={
                "p-2 my-2 bg-[#0D1B2A] border border-[#2979FF] rounded-lg "
              }
            >
              <Text
                className={"text-lg font-semibold text-center text-[#2979FF]"}
              >
                Guest User
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              className={
                "text-lg font-semibold text-center my-4 text-[#FAFAFA]"
              }
            >
              <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />{" "}
              or{" "}
              <View className={"border-b-2 border-[#2979FF] p-2 mb-1 w-24"} />
            </Text>
            <TouchableOpacity
              className={"flex flex-row justify-center items-center"}
              onPress={() => router.push("/signin")}
            >
              <Text className={"text-[#FAFAFA] font-semibold"}>
                Already a User?{" "}
              </Text>
              <Text
                className={
                  "text-base underline font-semibold text-center text-[#FFa200]"
                }
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#0D1B2A"} />
      </ScrollView>
    </SafeAreaView>
  );
}
