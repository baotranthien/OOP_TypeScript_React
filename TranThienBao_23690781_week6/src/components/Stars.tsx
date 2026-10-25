import React from "react";
import { Text } from "react-native";
import { colors } from "../theme";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  // Đảm bảo clamped luôn nằm trong khoảng 0..5 để tránh RangeError khi repeat()
  const normalized = value > 5 ? Math.round(value / 20) : Math.round(value);
  const clamped = Math.min(5, Math.max(0, isNaN(normalized) ? 5 : normalized));

  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {"★".repeat(clamped)}
      <Text style={{ color: colors.line }}>{"★".repeat(5 - clamped)}</Text>
    </Text>
  );
}
