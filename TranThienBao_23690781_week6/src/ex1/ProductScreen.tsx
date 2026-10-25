import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked: ColorKey | undefined = route.params?.color;
  const shown: ColorKey = (picked && PHONE_COLORS[picked]) ? picked : (PHONE_COLORS[phone.defaultColor] ? phone.defaultColor : "blue");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown]?.image ?? PHONE_COLORS.blue.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.helpIcon}>
            <Text style={styles.helpIconText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút viền xám (#D8DCE3), bo góc 6, chữ "4 MÀU-CHỌN MÀU" / "4 MÀU-CHỌN LOẠI", dấu ">" sát phải */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút "CHỌN MUA": nền colors.red, bo góc 6, chữ trắng đậm, canh giữa, nằm ở dưới cùng của màn hình */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.buyBtn}
          onPress={() =>
            Alert.alert(
              "Đặt hàng thành công",
              `Bạn đã chọn mua: ${phone.name}\nMàu: ${PHONE_COLORS[shown].label}\nGiá: ${formatPrice(phone.price)}`
            )
          }
        >
          <Text style={styles.buyBtnText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 250,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 340,
  },
  info: {
    paddingTop: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  review: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.muted,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginRight: 24,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  helpIcon: {
    marginLeft: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  helpIconText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.text,
  },
  chooseBtn: {
    position: "relative",
    borderWidth: 1,
    borderColor: colors.line, // #D8DCE3
    borderRadius: 6,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chooseBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    letterSpacing: 0.5,
  },
  chevron: {
    position: "absolute",
    right: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  bottomBar: {
    paddingTop: 8,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buyBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
});
