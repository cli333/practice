import React from "react";
import "./Main.css";
import { ctx } from "../../context/Provider";

const Main: React.FC = () => {
  const Ctx = React.useContext(ctx);

  return (
    <div>
      {Ctx?.renderStatus()} <br />
      {Ctx?.renderBoard()}
      <button onClick={() => Ctx?.reset()}>Reset?</button>
    </div>
  );
};

export default Main;
