import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook: (book: Book) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function BookGrid({
  data,
  onPressBook,
  ListHeaderComponent,
  ListEmptyComponent,
  onRefresh,
  refreshing,
}: Props) {
  return (
    <FlatList<Book>
      data={data}
      keyExtractor={(item: Book) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }: { item: Book }) => (
        <BookCard book={item} onPress={() => onPressBook(item)} />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      onRefresh={onRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
