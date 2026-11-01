import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, rightAction }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightAction ? <View style={styles.actionContainer}>{rightAction}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B1F5C",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  actionContainer: {
    marginLeft: 12,
  },
});

