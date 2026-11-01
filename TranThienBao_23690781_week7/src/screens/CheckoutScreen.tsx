import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { RootScreenProps } from "../navigation/types";
import { formatPrice } from "../utils/format";
import { useCart, useAuth } from "../store/hooks";

export function CheckoutScreen({ route, navigation }: RootScreenProps<"Checkout">) {
  const { total } = route.params;
  const { clear } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank" | "momo">("cod");

  const handleConfirmOrder = () => {
    Alert.alert(
      "Đặt hàng thành công! 🎉",
      `Đơn hàng trị giá ${formatPrice(total)} của bạn đã được tiếp nhận. Chúng tôi sẽ liên hệ giao hàng sớm nhất.`,
      [
        {
          text: "Về trang chủ",
          onPress: () => {
            clear();
            navigation.navigate("Tabs", { screen: "Home" });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Thông tin giao hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Người nhận:</Text>
            <Text style={styles.infoValue}>{user ? user.name : "Học viên Demo"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{user?.phone ?? "0901234567"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>12 Nguyễn Văn Bảo, P.4, Q. Gò Vấp, TP.HCM</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💳 Phương thức thanh toán</Text>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === "cod" && styles.methodOptionActive,
            ]}
            onPress={() => setPaymentMethod("cod")}
            activeOpacity={0.7}
          >
            <Text style={styles.methodEmoji}>💵</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Thanh toán khi nhận hàng (COD)</Text>
              <Text style={styles.methodSub}>Trả tiền mặt khi người giao hàng đến</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                paymentMethod === "cod" && styles.radioCircleActive,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === "bank" && styles.methodOptionActive,
            ]}
            onPress={() => setPaymentMethod("bank")}
            activeOpacity={0.7}
          >
            <Text style={styles.methodEmoji}>🏦</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Chuyển khoản Ngân hàng (QR Pay)</Text>
              <Text style={styles.methodSub}>Quét mã VietQR nhanh chóng & bảo mật</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                paymentMethod === "bank" && styles.radioCircleActive,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === "momo" && styles.methodOptionActive,
            ]}
            onPress={() => setPaymentMethod("momo")}
            activeOpacity={0.7}
          >
            <Text style={styles.methodEmoji}>📱</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Ví điện tử MoMo</Text>
              <Text style={styles.methodSub}>Liên kết và thanh toán một chạm</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                paymentMethod === "momo" && styles.radioCircleActive,
              ]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🧾 Chi tiết thanh toán</Text>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Tạm tính:</Text>
            <Text style={styles.costValue}>{formatPrice(total)}</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Phí vận chuyển:</Text>
            <Text style={styles.freeShipping}>Miễn phí</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmText}>
            Xác nhận đặt hàng · {formatPrice(total)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 13,
    color: "#64748B",
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "600",
  },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
  },
  methodOptionActive: {
    borderColor: "#3B3FD8",
    backgroundColor: "#EEF2FF",
  },
  methodEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  methodSub: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  radioCircleActive: {
    borderColor: "#3B3FD8",
    backgroundColor: "#3B3FD8",
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  costValue: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "600",
  },
  freeShipping: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: "#3B3FD8",
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
  confirmButton: {
    backgroundColor: "#3B3FD8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

