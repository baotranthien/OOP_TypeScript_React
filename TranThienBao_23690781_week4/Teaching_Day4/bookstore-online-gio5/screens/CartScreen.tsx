// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng
// Đủ 3 vùng theo yêu cầu: nội dung cuộn (danh sách) + thanh tổng tiền cố định
// (không cuộn) + TabBar cố định (vẽ ở App.tsx), không vùng nào chồng lấp vùng nào.
import React, { useState } from "react";
import { View, ScrollView, Text, Pressable, StyleSheet, Modal } from "react-native";
import { CartLineItem } from "../components/CartLineItem";
import { CartItem } from "../data";

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity?: (bookId: number, delta: number) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function CartScreen({
  items,
  onUpdateQuantity,
  onCheckout,
  onContinueShopping,
}: CartScreenProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  const handlePressCheckout = () => {
    if (items.length === 0) return;
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (onCheckout) {
      onCheckout();
    }
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Giỏ hàng ({items.length})</Text>
      </View>

      {/* VÙNG 1: Danh sách sản phẩm: CUỘN được (flex:1), nằm GIỮA header và thanh tổng tiền */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptySubtitle}>Hãy khám phá thêm sách hay và thêm vào giỏ nhé!</Text>
          {onContinueShopping && (
            <Pressable style={styles.continueButton} onPress={onContinueShopping}>
              <Text style={styles.continueButtonText}>Khám phá sách ngay</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {items.map((item) => (
            <CartLineItem
              key={item.book.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </ScrollView>
      )}

      {/* VÙNG 2: Thanh tổng tiền + nút thanh toán: KHÔNG cuộn, đứng cố định ngay trên
          TabBar (TabBar vẽ riêng ở App.tsx, cả 2 cùng "cố định" nhưng độc lập). */}
      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
        </View>
        <Pressable
          style={[styles.checkoutButton, items.length === 0 && styles.checkoutDisabled]}
          onPress={handlePressCheckout}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutText}>Thanh toán ngay</Text>
        </Pressable>
      </View>

      {/* Modal xác nhận thanh toán thành công */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>🎉</Text>
            <Text style={styles.modalTitle}>Đặt hàng thành công!</Text>
            <Text style={styles.modalMessage}>
              Cảm ơn bạn đã mua sắm tại BookStore Online. Đơn hàng của bạn đang được xử lý và giao sớm nhất!
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.modalButtonText}>Tiếp tục mua sách</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  scroll: {
    flex: 1, // chiếm toàn bộ không gian còn lại ở giữa
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  totalBar: {
    flexDirection: "row", // tổng tiền bên trái, nút thanh toán bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    // marginBottom = chiều cao TabBar (64) -> thanh này luôn nổi NGAY TRÊN TabBar,
    // không bị TabBar (position absolute ở tầng App.tsx) đè lên.
    marginBottom: 64,
  },
  totalLabel: {
    fontSize: 12,
    color: "#5B6B7F",
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutDisabled: {
    backgroundColor: "#9CA3AF",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
