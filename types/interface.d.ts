interface Field {
  mined: boolean;
  nearMines: number;
  opened: boolean;
  exploded: boolean;
  flagged: boolean;
  onOpen: () => {};
  onSelect: () => {};
}

interface Flag {
  bigger?: boolean;
}

interface Header {
  flagsLeft: number;
  onFlagPress: () => void;
  onNewGame: () => void;
}

interface MineField {
  board: any[][];
  onOpenField: (r: number, c: number) => void;
  onSelectField: any;
}

interface LevelSelection {
  isVisible: boolean;
  onLevelSelected: (n: number) => void;
  onCancel: () => void;
}
