import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface TabItem {
  key: string;
  label: string;
  emoji: string;
  badge?: number;
}

interface Props {
  items: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
}

export function TabBar({ items, activeKey, onPress }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tabButton}
            onPress={() => onPress(item.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              {typeof item.badge === "number" && item.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {item.badge > 99 ? "99+" : item.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: "space-around",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    position: "relative",
    width: 32,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 20,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 2,
  },
  labelActive: {
    color: "#3B3FD8",
    fontWeight: "700",
  },
});

