import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// 1. Màn hình Trang chủ
function HomeScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <View style={styles.welcomeCard}>
        <Ionicons name="sparkles" size={40} color={colors.red} />
        <Text style={styles.bigTitle}>Xin chào 👋</Text>
        <Text style={styles.subTitle}>Chào mừng bạn đến với ứng dụng Lab 06 Navigation!</Text>
        <Text style={styles.tipText}>Vuốt từ mép trái màn hình hoặc bấm nút ☰ để mở menu điều hướng.</Text>
      </View>
    </SafeAreaView>
  );
}

// 2. Màn hình Hồ sơ
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>NA</Text>
      </View>
      <Text style={styles.profileName}>Nguyễn Văn A</Text>
      <Text style={styles.profileMuted}>user@student.iuh.edu.vn</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Lớp học phần:</Text>
          <Text style={styles.infoValue}>Lập trình React Native - Tuần 6</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chuyên đề:</Text>
          <Text style={styles.infoValue}>Navigation (Stack, Tab, Drawer)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// 3. Màn hình Cài đặt (TODO 1)
function SettingsScreen() {
  // Quản lý 2 state: notify (mặc định true) và dark (mặc định false)
  const [notify, setNotify] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);

  return (
    <SafeAreaView style={[styles.settingsContainer, dark && styles.darkContainer]}>
      <View style={styles.settingsContent}>
        {/* Dòng 1: "Nhận thông báo" - Gạt Switch để thay đổi notify */}
        <View style={[styles.settingRow, dark && styles.darkSettingRow]}>
          <View style={styles.rowLabelGroup}>
            <Ionicons
              name={notify ? "notifications" : "notifications-off"}
              size={22}
              color={notify ? colors.red : colors.muted}
            />
            <Text style={[styles.settingLabel, dark && styles.darkText]}>
              Nhận thông báo
            </Text>
          </View>
          <Switch
            value={notify}
            onValueChange={setNotify}
            trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
            thumbColor={notify ? colors.red : "#F3F4F6"}
          />
        </View>

        {/* Dòng 2: "Giao diện tối" - Gạt Switch để thay đổi dark */}
        <View style={[styles.settingRow, dark && styles.darkSettingRow]}>
          <View style={styles.rowLabelGroup}>
            <Ionicons
              name={dark ? "moon" : "sunny"}
              size={22}
              color={dark ? "#FBBF24" : colors.muted}
            />
            <Text style={[styles.settingLabel, dark && styles.darkText]}>
              Giao diện tối
            </Text>
          </View>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={dark ? colors.blue : "#F3F4F6"}
          />
        </View>

        {/* Dòng chữ tổng hợp trạng thái hiện tại */}
        <View style={[styles.statusBox, dark && styles.darkStatusBox]}>
          <Text style={[styles.statusText, dark && styles.darkStatusText]}>
            Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "Tối" : "Sáng"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// 4. Component DrawerApp chính (TODO 2)
export function DrawerApp() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: colors.text,
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: "600",
            marginLeft: -8,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Hồ sơ",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Cài đặt",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 360,
  },
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  subTitle: {
    fontSize: 15,
    color: colors.text,
    textAlign: "center",
  },
  tipText: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.navy,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  profileMuted: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 24,
  },
  infoCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  darkContainer: {
    backgroundColor: "#18181B",
  },
  settingsContent: {
    padding: 16,
    gap: 14,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  darkSettingRow: {
    backgroundColor: "#27272A",
  },
  rowLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  darkText: {
    color: "#F4F4F5",
  },
  statusBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
  },
  darkStatusBox: {
    backgroundColor: "#27272A",
    borderColor: "#3F3F46",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  darkStatusText: {
    color: "#F4F4F5",
  },
});
