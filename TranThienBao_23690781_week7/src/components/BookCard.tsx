import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Book } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  book: Book;
  onPress: () => void;
}

export function BookCard({ book, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(book.price)}</Text>
          <Text style={styles.stock}>Kho: {book.stock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cover: {
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 48,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
    minHeight: 36,
  },
  author: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3B3FD8",
  },
  stock: {
    fontSize: 11,
    color: "#94A3B8",
  },
});

