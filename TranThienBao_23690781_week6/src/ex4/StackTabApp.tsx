import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, TabParamList } from "./types";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// 1. Tạo HomeTabs dạng Bottom Tab với 2 màn hình: Products và Favorites
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Products") {
            iconName = focused ? "grid" : "grid-outline";
          } else {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{ title: "Sản phẩm" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{ title: "Yêu thích" }}
      />
    </Tab.Navigator>
  );
}

// 2. Export StackTabApp: Bao bọc ứng dụng trong FavoritesProvider, chứa NavigationContainer và Stack.Navigator
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: colors.text,
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: "Cửa hàng" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
