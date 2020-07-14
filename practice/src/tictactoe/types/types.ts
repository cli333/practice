import React from "react";

export interface IProvider {
  children?: React.ReactNode;
}

export interface ICtx {
  board: EPlayer[];
  setBoard: React.Dispatch<React.SetStateAction<EPlayer[]>>;
  renderBoard: () => JSX.Element;
  currentPlayer: EPlayer;
  renderStatus: () => JSX.Element;
  reset: () => void;
}

export enum EPlayer {
  None = 0,
  One = 1,
  Two = 2,
}
