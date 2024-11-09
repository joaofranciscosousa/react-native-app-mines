import params from "./src/constants/Params";
import { Alert, StyleSheet, View } from "react-native";
import {
  cloneBord,
  createMinedBoard,
  flagsUsed,
  hadExplosion,
  invertFlag,
  openField,
  showMines,
  wonGame,
} from "./src/helpers/board";
import { useEffect, useState } from "react";
import MineField from "./src/components/MineField";
import Header from "./src/components/Header";
import LevelSelection from "./src/screens/LevelSelection";
import { Board } from "./types/mines";

export default function App() {
  const [board, setBoard] = useState<Board>([]);
  const [won, setWon] = useState<boolean>(false);
  const [lost, setLost] = useState<boolean>(false);
  const [showModalLevel, setShowModalLevel] = useState<boolean>(false);

  useEffect(() => {
    createState();
  }, []);

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    setBoard(createMinedBoard(rows, cols, minesAmount()));
  };

  const onOpenField = (row: number, column: number) => {
    const b: Board = cloneBord(board);
    openField(b, row, column);

    if (hadExplosion(b)) {
      showMines(b);
      Alert.alert("Perdeu");
    }

    if (wonGame(b)) {
      Alert.alert("Venceu");
    }

    setBoard(b);
    setWon(wonGame(b));
    setLost(hadExplosion(b));
  };

  const onSelectField = (row: number, column: number) => {
    const b: Board = cloneBord(board);
    invertFlag(b, row, column);

    if (wonGame(board)) {
      Alert.alert("Venceuuuu");
    }
    setWon(wonGame(board));
    setBoard(b);
  };

  const onLevelSelect = (level: number) => {
    params.difficultLevel = level;

    createState();
  };

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={showModalLevel}
        onLevelSelected={onLevelSelect}
        onCancel={() => setShowModalLevel(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => createState()}
        onFlagPress={() => setShowModalLevel(true)}
      />
      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
});
