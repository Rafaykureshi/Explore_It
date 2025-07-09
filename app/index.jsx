import { Text, View, ScrollView } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
        <View className={"m-2 flex justify-center items-center bg-red-600"}>
          <Text>This is our App</Text>
          </View>
  );
}
