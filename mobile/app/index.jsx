import { Link } from "expo-router";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/about">About</Link>
      {/* <Image
        source={{
          uri: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
        }}
        style={{ width: 100, height: 100 }}
      /> */}
      {/* <Image
        source={require("@/assets/images/react-logo.png")}
        style={{ width: 100, height: 100 }}
      /> */}
    </View>
  );
}
