import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Tên icon: [khi chọn (focused = true), khi không chọn (focused = false)]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// 1. Tab Trang chủ
function HomeTab() {
  return (
    <SafeAreaView style={styles.tabContainer}>
      <FlatList
        data={PHONES}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={PHONE_COLORS[item.defaultColor].image}
              style={styles.cardThumb}
              resizeMode="contain"
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name.split(" - ")[0]}
              </Text>
              <View style={styles.cardRating}>
                <Stars value={item.rating} size={14} />
                <Text style={styles.cardReview}>({item.reviewCount})</Text>
              </View>
              <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 2. Tab Tìm kiếm (TODO 1)
function SearchTab() {
  const [keyword, setKeyword] = useState<string>("");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return PHONES;
    return PHONES.filter((p) => p.name.toLowerCase().includes(q));
  }, [keyword]);

  return (
    <SafeAreaView style={styles.tabContainer}>
      <View style={styles.searchHeader}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color={colors.muted} style={styles.searchIcon} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Nhập từ khóa tìm kiếm..."
            placeholderTextColor={colors.muted}
            style={styles.input}
            clearButtonMode="while-editing"
            autoCapitalize="none"
          />
          {keyword.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.muted}
              onPress={() => setKeyword("")}
            />
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.muted} />
            <Text style={styles.emptyText}>
              Không tìm thấy kết quả cho “{keyword}”
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={PHONE_COLORS[item.defaultColor].image}
              style={styles.cardThumb}
              resizeMode="contain"
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSupplier}>Cung cấp bởi: {item.supplier}</Text>
              <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 3. Tab Cá nhân (TODO 2)
function ProfileTab() {
  return (
    <SafeAreaView style={styles.tabContainer}>
      <View style={styles.profileCenter}>
        {/* Avatar tròn: width=96, height=96, borderRadius=48, màu nền xám nhạt */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        {/* Tên người dùng (chữ in đậm, cỡ lớn) */}
        <Text style={styles.profileName}>Nguyễn Văn A</Text>
        {/* Email bên dưới */}
        <Text style={styles.profileEmail}>user@student.iuh.edu.vn</Text>

        <View style={styles.profileDivider} />

        <View style={styles.profileBadge}>
          <Ionicons name="shield-checkmark" size={18} color="#10B981" />
          <Text style={styles.badgeText}>Sinh viên khoa CNTT - React Native</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// 4. Component chính BottomTabApp (TODO 3)
export function BottomTabApp() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = ICONS[route.name][focused ? 0 : 1];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    padding: 16,
    gap: 12,
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
  cardThumb: {
    width: 64,
    height: 72,
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardReview: {
    fontSize: 12,
    color: colors.muted,
  },
  cardSupplier: {
    fontSize: 12,
    color: colors.muted,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: colors.bg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    height: "100%",
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  profileCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.navy,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 18,
  },
  profileEmail: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 6,
  },
  profileDivider: {
    width: 60,
    height: 2,
    backgroundColor: colors.line,
    marginVertical: 20,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    color: "#065F46",
    fontWeight: "500",
  },
});
