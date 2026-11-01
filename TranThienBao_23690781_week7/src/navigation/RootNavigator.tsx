import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { TabNavigator } from "./TabNavigator";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0B1F5C",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: "Chi tiết sách" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Thanh toán" }}
      />
    </Stack.Navigator>
  );
}

