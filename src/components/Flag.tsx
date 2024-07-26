import { Image, StyleSheet, View } from "react-native";
import React from "react";
import params from "../constants/Params";

export default function Flag({ bigger }: Flag) {
  return (
    <View style={styles.container}>
      <Image
        style={bigger ? styles.flagBigger : styles.tinyLogo}
        source={require("../../assets/flag.png")}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: params.blockSize,
    height: params.blockSize,
  },
  tinyLogo: {
    width: params.blockSize * 0.6,
    height: params.blockSize * 0.6,
  },
  flagBigger: {
    width: params.blockSize,
    height: params.blockSize,
  },
});
