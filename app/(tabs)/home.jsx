import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

const home = () => {
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
          <View className="flex flex-row items-center justify-center">
            <Text
              className={`text-base h-10 pt-[${
                Platform.OS == "ios" ? 8 : 6.5
              }] align-middle text-[#FAFAFA]`}
            >
              Welcome to{" "}
            </Text>
            <Image source={logo} resizeMode="cover" className="w-20 h-12" />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="p-4 bg-[#0D1B2A] flex-row items-center">
          <Text className="text-3xl text-[#FAFAFA] mr-2 font-semibold">
            Events here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
