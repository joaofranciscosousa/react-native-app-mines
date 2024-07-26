import { StyleSheet, View } from "react-native";
import React from "react";
import Field from "./Field";

export default function MineField({
  board,
  onOpenField,
  onSelectField,
}: MineField) {
  const rows = board.map((row, r) => {
    const column = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => onOpenField(r, c)}
          onSelect={() => onSelectField(r, c)}
        />
      );
    });

    return (
      <View style={{ flexDirection: "row" }} key={r}>
        {column}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
  },
});
