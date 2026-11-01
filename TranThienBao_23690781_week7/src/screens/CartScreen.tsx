import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TabScreenProps } from "../navigation/types";
import { useCart } from "../store/hooks";
import { formatPrice } from "../utils/format";
import { Header } from "../components/Header";
import { EmptyState } from "../components/EmptyState";
import { CartItem } from "../types";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove, clear } = useCart();

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.cartCard}>
        <View style={[styles.itemCover, { backgroundColor: item.color }]}>
          <Text style={styles.itemEmoji}>{item.emoji}</Text>
        </View>

        <View style={styles.itemInfo}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => remove(item.bookId)}
              style={styles.deleteBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>

          <View style={styles.itemFooter}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => {
                  if (item.quantity <= 1) {
                    remove(item.bookId);
                  } else {
                    setQty(item.bookId, item.quantity - 1);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.quantity}</Text>

              <TouchableOpacity
                style={[
                  styles.qtyBtn,
                  item.quantity >= item.stock && styles.qtyBtnDisabled,
                ]}
                onPress={() => setQty(item.bookId, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.stockNotice}>
              Kho: {item.stock}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Giỏ hàng"
        subtitle={items.length > 0 ? `${items.length} mặt hàng` : undefined}
        rightAction={
          items.length > 0 ? (
            <TouchableOpacity onPress={clear} activeOpacity={0.7}>
              <Text style={styles.clearAllText}>Xóa hết</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <View style={styles.content}>
        <FlatList<CartItem>
          data={items}
          keyExtractor={(item: CartItem) => item.bookId.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              emoji="🛒"
              title="Giỏ hàng đang trống"
              message="Chưa có cuốn sách nào trong giỏ hàng. Hãy dạo quanh cửa hàng và chọn những cuốn sách yêu thích nhé!"
              actionLabel="Tiếp tục mua sắm"
              onAction={() => navigation.navigate("Home")}
            />
          }
        />

        {items.length > 0 && (
          <View style={styles.bottomBar}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
              <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate("Checkout", { total: totalPrice })
              }
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1F5C",
  },
  content: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  clearAllText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemCover: {
    width: 68,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "700",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B3FD8",
    marginVertical: 4,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnDisabled: {
    opacity: 0.3,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  qtyText: {
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  stockNotice: {
    fontSize: 11,
    color: "#94A3B8",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#3B3FD8",
  },
  checkoutButton: {
    backgroundColor: "#3B3FD8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
