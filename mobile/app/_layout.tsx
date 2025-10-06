import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import SafeScreen from "@/components/SafeScreen";
//import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </SafeAreaProvider>
      {/* <StatusBar style="dark" /> */}
    </ClerkProvider>
  );
}
