import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Category } from "../types";

interface Props {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

export function CategoryChip({ category, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[styles.name, selected && styles.nameSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#3B3FD8",
    borderColor: "#3B3FD8",
  },
  emoji: {
    fontSize: 14,
    marginRight: 6,
  },
  name: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
  },
  nameSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

