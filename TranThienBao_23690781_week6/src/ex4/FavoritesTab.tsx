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
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";
import { Phone } from "../types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // Lấy danh sách ids từ useFavorites()
  const { ids, toggle } = useFavorites();

  // Lọc các sản phẩm trong PHONES có id thuộc ids
  const favoritePhones = PHONES.filter((phone) => ids.includes(phone.id));

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
        <Text style={styles.supplier}>Cung cấp bởi: {item.supplier}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <Pressable
        style={styles.heartBtn}
        onPress={() => toggle(item.id)}
        hitSlop={8}
      >
        <Ionicons name="heart" size={24} color={colors.red} />
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoritePhones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          // Nếu chưa có sản phẩm nào, hiện dòng chữ: "Chưa có sản phẩm nào được lưu."
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={56} color={colors.muted} />
            <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
            <Text style={styles.emptySubText}>
              Hãy nhấn vào biểu tượng trái tim để lưu sản phẩm yêu thích của bạn.
            </Text>
          </View>
        }
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
    flexGrow: 1,
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
    width: 68,
    height: 80,
    marginRight: 12,
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
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  heartBtn: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
