import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface Props {
  label?: string;
}

export function LoadingView({ label = "Đang tải…" }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3B3FD8" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
});

