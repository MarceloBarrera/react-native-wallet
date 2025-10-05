import * as React from "react";
import { Image } from "expo-image";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { authStyles } from "@/assets/styles/auth.styles";
import { COLORS } from "../../constants/colors.js";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(null);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      if (err?.errors?.[0]?.code === "form_identifier_exists") {
        setError("Email address already in use. Please sign in.");
      } else {
        setError("Unable to sign up. Please try again.");
      }
      // See https://clerk.com/docs/custom-flows/error-handling
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={authStyles.verificationContainer}>
        <Text style={authStyles.verificationTitle}>Verify your email</Text>
        {error ? (
          <View style={authStyles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={authStyles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[authStyles.verificationInput, error && authStyles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor={COLORS.textLight}
          onChangeText={(code) => setCode(code)}
        />

        <TouchableOpacity onPress={onVerifyPress} style={authStyles.button}>
          <Text style={authStyles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={8}
    >
      <View style={authStyles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={authStyles.illustration}
        />
        <Text style={authStyles.title}>Create Account</Text>
        {error ? (
          <View style={authStyles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={authStyles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[authStyles.input, error && authStyles.errorInput]}
          placeholderTextColor={COLORS.textLight}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          style={[authStyles.input, error && authStyles.errorInput]}
          placeholderTextColor={COLORS.textLight}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={authStyles.button} onPress={onSignUpPress}>
          <Text style={authStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={authStyles.footerContainer}>
          <Text style={authStyles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={authStyles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
