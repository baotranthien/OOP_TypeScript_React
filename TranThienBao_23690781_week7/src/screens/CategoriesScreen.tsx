import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TabScreenProps } from "../navigation/types";
import { Category } from "../types";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { Header } from "../components/Header";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

export function CategoriesScreen({ navigation }: TabScreenProps<"Categories">) {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = await getCategories();
      setData(categories);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Home", { categoryId: item.id })}
        activeOpacity={0.7}
      >
        <View style={styles.iconBox}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtext}>Xem các sách thuộc thể loại này</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Danh mục sách"
        subtitle="Khám phá các chủ đề sách phong phú"
      />

      <View style={styles.content}>
        {loading ? (
          <LoadingView label="Đang tải danh mục…" />
        ) : error ? (
          <ErrorView message={error} onRetry={load} />
        ) : (
          <FlatList<Category>
            data={data}
            keyExtractor={(item: Category) => item.id.toString()}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onRefresh={load}
            refreshing={loading}
          />
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
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  emoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 12,
    color: "#64748B",
  },
  arrow: {
    fontSize: 24,
    color: "#94A3B8",
    fontWeight: "300",
  },
});
