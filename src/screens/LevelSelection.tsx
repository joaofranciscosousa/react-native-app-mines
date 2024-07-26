import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function LevelSelection({
  isVisible,
  onLevelSelected,
  onCancel,
}: LevelSelection) {
  return (
    <Modal
      onRequestClose={onCancel}
      visible={isVisible}
      animationType="slide"
      transparent
    >
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>SELECIONE O NÍVEL</Text>
          <TouchableOpacity
            style={[styles.button, styles.bgEasy]}
            onPress={() => {
              onLevelSelected(0.1);
              onCancel();
            }}
          >
            <Text style={styles.buttonLabel}>Fácil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgNormal]}
            onPress={() => {
              onLevelSelected(0.2);
              onCancel();
            }}
          >
            <Text style={styles.buttonLabel}>Médio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgHard]}
            onPress={() => {
              onLevelSelected(0.3);
              onCancel();
            }}
          >
            <Text style={styles.buttonLabel}>Difícil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: "#EEE",
    fontWeight: "700",
  },
  bgEasy: {
    backgroundColor: "#49B65D",
  },
  bgNormal: {
    backgroundColor: "#2765F7",
  },
  bgHard: {
    backgroundColor: "#F26337",
  },
});
