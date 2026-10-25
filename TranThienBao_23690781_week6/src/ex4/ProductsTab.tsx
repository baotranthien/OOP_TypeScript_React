import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { TabProps } from "./types";
import { Phone } from "../types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  const renderItem = ({ item }: { item: Phone }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
    >
      <Image
        source={PHONE_COLORS[item.defaultColor].image}
        style={styles.thumb}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Stars value={item.rating} size={14} />
          <Text style={styles.review}>({item.reviewCount})</Text>
        </View>
        <Text style={styles.supplier}>Cung cấp bởi: {item.supplier}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(item.oldPrice)}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PHONES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: {
    width: 72,
    height: 84,
    marginRight: 14,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  review: {
    fontSize: 12,
    color: colors.muted,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 13,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
});
