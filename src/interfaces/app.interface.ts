export interface ICourtProps {
  rows: number;
  cols: number;
}

export interface ILineProps {
  horizontal: boolean;
  isConnected: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLineClick?: () => void;
}

export interface IDotProps {
  shouldBlink: boolean;
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