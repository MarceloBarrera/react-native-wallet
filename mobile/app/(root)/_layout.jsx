import { Stack } from "expo-router/stack";
import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Layout = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    // not sure if should be /sign-in or /(auth)/sign-in
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
