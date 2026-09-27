// Màn hình Tab "Tài khoản"
import React from "react";
import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";

export function AccountScreen() {
  const menuItems = [
    { icon: "📦", title: "Đơn mua của tôi", subtitle: "2 đơn hàng đang vận chuyển" },
    { icon: "❤️", title: "Sách yêu thích", subtitle: "12 cuốn sách đã lưu" },
    { icon: "📍", title: "Sổ địa chỉ nhận hàng", subtitle: "Mặc định: TP. Hồ Chí Minh" },
    { icon: "💳", title: "Phương thức thanh toán", subtitle: "Thẻ ATM / Visa / Ví điện tử" },
    { icon: "🔔", title: "Thông báo khuyến mãi", subtitle: "Bật thông báo ưu đãi" },
    { icon: "⚙️", title: "Cài đặt ứng dụng", subtitle: "Giao diện, ngôn ngữ, bảo mật" },
    { icon: "💬", title: "Trợ giúp & Hỗ trợ", subtitle: "Hotline: 1900 6868" },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>👤 Tài khoản</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TB</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Trần Thiên Bảo</Text>
            <Text style={styles.profileEmail}>bao.tranthien@example.com</Text>
            <View style={styles.badgeRow}>
              <View style={styles.vipBadge}>
                <Text style={styles.vipBadgeText}>★ Thành viên VIP</Text>
              </View>
              <Text style={styles.pointsText}>1.250 Điểm tích lũy</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuRow}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerBar: {
    backgroundColor: "#1E1B4B",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // chừa khoảng trống cho TabBar đáy (64px)
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4338CA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },
  profileEmail: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  vipBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipBadgeText: {
    color: "#B45309",
    fontSize: 11,
    fontWeight: "700",
  },
  pointsText: {
    fontSize: 11,
    color: "#64748B",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: "#94A3B8",
    fontWeight: "300",
  },
});
