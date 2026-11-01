import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Tìm kiếm theo tên sách, tác giả…",
  autoFocus = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "600",
  },
});

