import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const parts = (phone.name || "").split(" - ");
  const line1 = parts[0] || phone.name || "";
  const line2 = parts[1] || "";

  const thumbKey: ColorKey = (picked && PHONE_COLORS[picked])
    ? picked
    : (PHONE_COLORS[phone.defaultColor] ? phone.defaultColor : "blue");

  return (
    <SafeAreaView style={styles.root}>
      {/* Nửa trên nền trắng: ảnh nhỏ + thông tin */}
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[thumbKey]?.image ?? PHONE_COLORS.blue.image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.nameLine}>{line1}</Text>
          {line2 ? <Text style={styles.nameLine}>{line2}</Text> : null}

          {/* TODO 3: Chỉ khi đã chọn màu (picked !== undefined), hiển thị thêm 3 dòng thông tin */}
          {picked !== undefined && (
            <>
              <Text style={styles.detailLine}>
                Màu:{" "}
                <Text style={styles.boldText}>
                  {PHONE_COLORS[picked]?.label ?? picked}
                </Text>
              </Text>
              <Text style={styles.detailLine}>
                Cung cấp bởi{" "}
                <Text style={styles.boldText}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceLine}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Nửa dưới nền xám (#C4C4C4): 4 ô màu và nút XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: Nút "XONG" nền xanh (colors.blue), bo góc 4, chữ trắng in đậm */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate({
              name: "Product",
              params: { color: picked },
              merge: true,
            })
          }
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  thumb: {
    width: 104,
    height: 125,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  nameLine: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  detailLine: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.text,
  },
  priceLine: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.red,
    marginTop: 4,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey, // #C4C4C4
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 17,
    color: colors.text,
    fontWeight: "500",
    marginBottom: 8,
  },
  swatches: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  swatch: {
    width: 85,
    height: 75,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#ffffff",
    transform: [{ scale: 1.05 }],
  },
  doneBtn: {
    backgroundColor: colors.blue, // #4F63C8
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  doneBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
