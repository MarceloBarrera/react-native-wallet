import { View, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { styles } from "@/assets/styles/home.styles";

export default function PageLoader() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}
