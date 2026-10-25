import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "./src/data/phones";
import { colors } from "./src/theme";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

type ExerciseKey = "menu" | "ex1" | "ex2" | "ex3" | "ex4" | "ex5";

export default function App() {
  const [currentEx, setCurrentEx] = useState<ExerciseKey>("menu");

  const exercises = [
    {
      key: "ex1" as const,
      title: "Bài 1: Select Phone (Local)",
      subtitle: "Native Stack, chọn 4 màu và truyền nhận params",
      icon: "phone-portrait" as const,
      color: "#3B82F6",
    },
    {
      key: "ex2" as const,
      title: "Bài 2: Gắn RESTful API",
      subtitle: "Fetch data, xử lý Loading & ErrorBox từ API",
      icon: "cloud-download" as const,
      color: "#10B981",
    },
    {
      key: "ex3" as const,
      title: "Bài 3: Bottom Tab Navigation",
      subtitle: "3 Tab: Trang chủ, Tìm kiếm (lọc dữ liệu), Cá nhân",
      icon: "browsers" as const,
      color: "#8B5CF6",
    },
    {
      key: "ex4" as const,
      title: "Bài 4: Stack + Tab + State Context",
      subtitle: "Điều hướng lồng nhau & quản lý danh sách yêu thích",
      icon: "heart" as const,
      color: "#EF4444",
    },
    {
      key: "ex5" as const,
      title: "Bài 5: Drawer Navigation & Settings",
      subtitle: "Kéo vuốt menu lề trái, Switch cài đặt thông báo/giao diện",
      icon: "menu" as const,
      color: "#F59E0B",
    },
  ];

  if (currentEx === "menu") {
    return (
      <SafeAreaView style={styles.menuContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.menuHeader}>
          <Text style={styles.menuHeaderTag}>THỰC HÀNH REACT NATIVE</Text>
          <Text style={styles.menuHeaderTitle}>Lab 06 · Navigation</Text>
        </View>

        <ScrollView contentContainerStyle={styles.menuList}>
          {exercises.map((item) => (
            <Pressable
              key={item.key}
              style={({ pressed }) => [
                styles.menuCard,
                pressed && styles.menuCardPressed,
              ]}
              onPress={() => setCurrentEx(item.key)}
            >
              <View style={[styles.cardIconBox, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />
      {/* Thanh điều hướng nhanh quay về Menu chính */}
      <SafeAreaView style={styles.navBar}>
        <Pressable
          style={styles.navBackButton}
          onPress={() => setCurrentEx("menu")}
        >
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.navBackText}>Menu chọn bài</Text>
        </Pressable>
        <Text style={styles.navCurrentTitle} numberOfLines={1}>
          {exercises.find((e) => e.key === currentEx)?.title.split(":")[0]}
        </Text>
      </SafeAreaView>

      <View style={styles.screenContent}>
        {currentEx === "ex1" && <SelectPhoneApp phone={PHONES[0]} />}
        {currentEx === "ex2" && <SelectPhoneApi />}
        {currentEx === "ex3" && <BottomTabApp />}
        {currentEx === "ex4" && <StackTabApp />}
        {currentEx === "ex5" && <DrawerApp />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  menuHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  menuHeaderTag: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.red,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  menuHeaderTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  menuHeaderStudent: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  menuList: {
    padding: 20,
    gap: 14,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuCardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#F1F5F9",
  },
  cardIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  appContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navBar: {
    backgroundColor: "#1E293B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 999,
  },
  navBackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  navBackText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
  },
  navCurrentTitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  screenContent: {
    flex: 1,
  },
});
