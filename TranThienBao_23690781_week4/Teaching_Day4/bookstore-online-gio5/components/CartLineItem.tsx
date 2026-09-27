// GIỜ 5 — Bài tập 2 (1 dòng trong màn Giỏ hàng)
// Kỹ thuật: row với 3 vùng tỉ lệ khác nhau — ảnh cố định, tên flex:1 (co giãn),
// số lượng+giá width cố định. Khác BookRowCard (Giờ 1): ở đây giá KHÔNG neo đáy
// cột, mà nằm ngang hàng với tên, bên phải cùng.
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { CartItem } from "../data";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity?: (bookId: number, delta: number) => void;
}

export function CartLineItem({ item, onUpdateQuantity }: CartLineItemProps) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.book.cover }} style={styles.thumb} />

      {/* flex:1 -> chiếm hết phần rộng còn lại sau ảnh, đẩy khối số lượng/giá
          sang tận bên phải dù tên sách ngắn hay dài. */}
      <Text style={styles.title} numberOfLines={2}>
        {item.book.title}
      </Text>

      <View style={styles.meta}>
        <View style={styles.qtyControl}>
          {onUpdateQuantity && (
            <Pressable
              style={styles.qtyBtn}
              onPress={() => onUpdateQuantity(item.book.id, -1)}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </Pressable>
          )}
          <Text style={styles.qty}>x{item.quantity}</Text>
          {onUpdateQuantity && (
            <Pressable
              style={styles.qtyBtn}
              onPress={() => onUpdateQuantity(item.book.id, 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.price}>
          {(item.book.price * item.quantity).toLocaleString()} đ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // ảnh - tên - số lượng/giá nằm cùng 1 hàng ngang
    alignItems: "center", // căn giữa theo trục dọc
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  thumb: {
    width: 44,
    height: 60, // ảnh cố định, không co giãn theo flex
    borderRadius: 6,
    backgroundColor: "#EEF2F7",
  },
  title: {
    flex: 1, // co giãn ăn hết phần dư -> khối bên phải luôn dính sát mép phải
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    paddingRight: 6,
  },
  meta: {
    width: 105, // width cố định, KHÔNG dùng flex -> luôn giữ đúng bề rộng dù list dài
    alignItems: "flex-end",
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  qtyBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4338CA",
    lineHeight: 16,
  },
  qty: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5B6B7F",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
