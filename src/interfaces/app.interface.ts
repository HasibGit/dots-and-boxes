export interface ICourtProps {
  rows: number;
  cols: number;
  player1: string;
  player2: string;
}

export interface IStartProps {
  setPlayer1: (name: string) => void;
  setPlayer2: (name: string) => void;
  setGameStarted: (condition: boolean) => void;
}

export interface InputProps {
  placeholder: string;
  setValue: (value: string) => void;
}

export interface ILineProps {
  horizontal: boolean;
  isConnected: boolean;
  isPartOfConnectedBox: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLineClick?: () => void;
  players: string[];
  label?: string;
}

export interface IDotProps {
  shouldBlink: boolean;
  isPartOfConnectedBox: boolean;
}

export interface IBoxLabelProps {
  label: string;
  players: string[];
}

export interface IDotCoordinate {
  i: number;
  j: number;
}

export interface ILine {
  start: IDotCoordinate;
  end: IDotCoordinate;
  connected: boolean;
}

export interface IBox {
  firstLine: ILine;
  secondLine: ILine;
  thirdLine: ILine;
  forthLine: ILine;
  connected: boolean;
  connectedBy: string;
}
