import React from "react";
import { IProvider, ICtx, EPlayer } from "../types/types";

export const ctx = React.createContext<null | ICtx>(null);

const Provider = ({ children }: IProvider) => {
  const [board, setBoard] = React.useState<EPlayer[]>(
    Array(9).fill(EPlayer.None)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<EPlayer>(
    EPlayer.One
  );
  const [isGameOngoing, setIsGameOngoing] = React.useState<boolean>(true);
  const [winner, setWinner] = React.useState<EPlayer>(EPlayer.None);

  const reset = () => {
    setBoard(Array(9).fill(EPlayer.None));
    setCurrentPlayer(EPlayer.One);
    setIsGameOngoing(true);
    setWinner(EPlayer.None);
  };

  const hasPlayerWon = (board: EPlayer[]) => {
    if (
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[2] !== EPlayer.None
    ) {
      return true;
    }

    if (
      board[3] === board[4] &&
      board[4] === board[5] &&
      board[5] !== EPlayer.None
    ) {
      return true;
    }

    if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[8] !== EPlayer.None
    ) {
      return true;
    }

    return false;
  };

  const handleCellClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index] !== EPlayer.None || !isGameOngoing) return;
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    currentPlayer === EPlayer.One
      ? setCurrentPlayer(EPlayer.Two)
      : setCurrentPlayer(EPlayer.One);
    if (hasPlayerWon(newBoard)) {
      setWinner(currentPlayer);
      setIsGameOngoing(false);
    }
  };

  const renderCell = (value: EPlayer, index: number) => {
    return (
      <div
        className="cell"
        key={index}
        onClick={() => handleCellClick(index)}
        data-player={board[index]}
      >
        {value === EPlayer.One ? "O" : value === EPlayer.Two ? "X" : ""}
      </div>
    );
  };

  const renderBoard = () => (
    <div className="board">
      {board.map((value, index) => renderCell(value, index))}
    </div>
  );

  const renderStatus = () => {
    return (
      <div>
        {"Player 1 is purple"} <br />
        {"Player 2 is orangered"} <br />
        {isGameOngoing
          ? `It's Player ${
              currentPlayer === EPlayer.One ? "One" : "Two"
            }'s turn`
          : `Player ${winner === EPlayer.One ? "One" : "Two"} is the winner!!!`}
      </div>
    );
  };

  return (
    <ctx.Provider
      value={{
        board,
        setBoard,
        renderBoard,
        currentPlayer,
        renderStatus,
        reset,
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default Provider;
