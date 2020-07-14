import React from "react";
import Provider from "./context/Provider";
import Main from "./components/Main/Main";

const TicTacToe: React.FC = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export default TicTacToe;
