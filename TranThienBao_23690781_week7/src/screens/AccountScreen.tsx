import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TabScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { Header } from "../components/Header";

export function AccountScreen({}: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Tài khoản"
        subtitle={isLoggedIn ? `Xin chào, ${user?.name}` : "Đăng nhập hệ thống"}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!isLoggedIn ? (
          <View style={styles.card}>
            <View style={styles.lockBox}>
              <Text style={styles.lockEmoji}>🔒</Text>
            </View>
            <Text style={styles.title}>Chưa đăng nhập</Text>
            <Text style={styles.desc}>
              Đăng nhập để quản lý đơn hàng, lưu danh sách yêu thích và nhận các ưu đãi hấp dẫn từ BookStore.
            </Text>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={() =>
                signIn(
                  {
                    id: 1,
                    name: "Học viên Demo",
                    email: "demo@bookstore.vn",
                    phone: "0901234567",
                  },
                  "fake-token"
                )
              }
              activeOpacity={0.85}
            >
              <Text style={styles.signInButtonText}>
                Đăng nhập thử (dữ liệu giả)
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mã thành viên:</Text>
              <Text style={styles.detailValue}>#BK-{user?.id ?? 1}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Số điện thoại:</Text>
              <Text style={styles.detailValue}>{user?.phone ?? "0901234567"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hạng thành viên:</Text>
              <Text style={styles.badgeGold}>Vàng (Gold Member)</Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={signOut}
              activeOpacity={0.85}
            >
              <Text style={styles.signOutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1F5C",
  },
  content: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: "#F4F6FB",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  lockBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  lockEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  desc: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  signInButton: {
    backgroundColor: "#3B3FD8",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  detailValue: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "600",
  },
  badgeGold: {
    fontSize: 13,
    color: "#D97706",
    fontWeight: "700",
  },
  signOutButton: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  signOutButtonText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "700",
  },
});

