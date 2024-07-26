import { Image, StyleSheet, View } from "react-native";
import React from "react";
import params from "../constants/Params";

export default function Mine() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/mine.png")}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: params.blockSize,
    height: params.blockSize,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: params.blockSize * 0.7,
    height: params.blockSize * 0.7,
  },
});
