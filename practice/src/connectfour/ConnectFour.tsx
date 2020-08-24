import React from "react";
import "./styles.css";

// types

enum EPlayer {
  None = 0,
  One = 1,
  Two = 2,
}

type TBoard = EPlayer[];

interface IState {
  board: TBoard;
  playerTurn: EPlayer;
  hasWon: EPlayer;
}

// utils

const initializeBoard = () => {
  const board: EPlayer[] = [];
  for (let i = 0; i < 42; i++) {
    board.push(EPlayer.None);
  }
  return board;
};

const findLowestEmptyIndex = (board: TBoard, column: number) => {
  for (let i = 35 + column; i >= 0; i -= 7) {
    if (board[i] === EPlayer.None) return i;
  }
  return -1;
};

const togglePlayerTurn = (player: EPlayer) => {
  return player === EPlayer.One ? EPlayer.Two : EPlayer.One;
};

const getPrettyPlayer = (player: EPlayer) => {
  switch (player) {
    case EPlayer.None:
      return "noPlayer";
    case EPlayer.One:
      return "playerOne";
    case EPlayer.Two:
      return "playerTwo";
  }
};

const getGameState = (board: TBoard) => {
  // check horizontal
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col <= 4; col++) {
      const index = row * 7 + col;
      const boardSlice = board.slice(index, index + 4);
      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) {
        return winningResult;
      }
    }
  }
  // check diagonal
  // check vertical
  return EPlayer.None;
};

const checkWinningSlice = (miniBoard: EPlayer[]) => {
  //
  if (miniBoard.some((cell) => cell === EPlayer.None)) return false;
  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] &&
    miniBoard[3]
  ) {
    return miniBoard[1];
  }
  return false;
};

// app

class App extends React.Component<{} | IState> {
  state: IState = {
    board: initializeBoard(),
    playerTurn: EPlayer.One,
    hasWon: EPlayer.None,
  };

  public renderCells = () => {
    const { board } = this.state;
    return board.map((player, index) => this.renderCell(player, index));
  };

  public makeMove = (column: number) => {
    const { board, playerTurn, hasWon } = this.state;
    if (hasWon !== EPlayer.None) return;
    const newBoard = board.slice();
    const index = findLowestEmptyIndex(board, column);
    if (index === -1) return;
    newBoard[index] = playerTurn;
    const gameState = getGameState(newBoard);
    this.setState({
      board: newBoard,
      playerTurn: togglePlayerTurn(playerTurn),
      hasWon: gameState,
    });
  };

  public handleClick = (index: number) => () => {
    const column: number = index % 7;
    this.makeMove(column);
  };

  public renderCell = (player: EPlayer, index: number) => {
    return (
      <div
        className="cell"
        key={index}
        onClick={this.handleClick(index % 7)}
        data-player={getPrettyPlayer(player)}
      ></div>
    );
  };

  render() {
    return <div className="board">{this.renderCells()}</div>;
  }
}

export default App;
