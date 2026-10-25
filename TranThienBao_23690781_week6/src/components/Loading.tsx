import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: colors.muted,
  },
});
