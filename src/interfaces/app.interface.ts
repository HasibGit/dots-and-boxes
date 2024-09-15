export interface ICourtProps {
  rows: number;
  cols: number;
  player1: string;
  player2: string;
  setGameStarted: (state: boolean) => void;
}

export interface IStartProps {
  player1: string;
  player2: string;
  rows: number;
  cols: number;
  setPlayer1: (name: string) => void;
  setPlayer2: (name: string) => void;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  setGameStarted: (condition: boolean) => void;
}

export interface InputProps {
  placeholder: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (value: any) => void;
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
