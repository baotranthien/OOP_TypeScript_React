import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PriceRange } from "../types";

export const PRICE_RANGES: { key: NonNullable<PriceRange>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

interface Props {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
}

export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <TouchableOpacity
            key={r.key}
            onPress={() => onChange(active ? null : r.key)}
            style={[styles.btn, active && styles.btnActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {r.label}
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
    gap: 8,
    marginVertical: 4,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  btnActive: {
    backgroundColor: "#3B3FD8",
    borderColor: "#3B3FD8",
  },
  text: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  textActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

