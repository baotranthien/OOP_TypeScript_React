import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // Lấy id từ route.params
  const { id } = route.params;

  // Tìm sản phẩm tương ứng trong PHONES
  const phone = PHONES.find((p) => p.id === id);

  // Lấy has và toggle từ hook useFavorites()
  const { has, toggle } = useFavorites();

  // Không tìm thấy sản phẩm
  if (!phone) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm #{id}</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = has(phone.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Render ảnh màu mặc định */}
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[phone.defaultColor].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Thông tin sản phẩm: tên, sao, giá, nhà cung cấp */}
        <View style={styles.details}>
          <Text style={styles.name}>{phone.name}</Text>

          <View style={styles.row}>
            <Stars value={phone.rating} size={18} />
            <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          </View>

          <View style={styles.supplierBox}>
            <Text style={styles.supplierLabel}>Cung cấp bởi: </Text>
            <Text style={styles.supplierValue}>{phone.supplier}</Text>
          </View>

          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>{phone.badge}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.favBtn, isFavorite && styles.favBtnActive]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
            {isFavorite ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  notFoundText: {
    fontSize: 16,
    color: colors.muted,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  imageWrap: {
    width: "100%",
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    lineHeight: 26,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  supplierBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg,
    padding: 12,
    borderRadius: 8,
  },
  supplierLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  supplierValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  badgeBox: {
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#ffffff",
  },
  favBtn: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.red,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  favBtnActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
  },
  favBtnTextActive: {
    color: "#ffffff",
  },
});
