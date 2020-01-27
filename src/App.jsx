import React from "react";
import _ from "lodash";
import "./App.css";
import Board from "./components/board";

function App() {
  return (
    <div className="container">
      <Board></Board>
    </div>

    // <div className="container">
    //   {_.times(10, () => (
    //     <div className="row">
    //       <div className="col-sm-2 box"></div>
    //       <div className="col-sm-2 box"></div>
    //       <div className="col-sm-2 box"></div>
    //       <div className="col-sm-2 box"></div>
    //       <div className="col-sm-2 box"></div>
    //       <div className="col-sm-2 box"></div>
    //     </div>
    //   ))}
    // </div>
  );
}

/* <div className="grid">
        {_.times(12 * 8, () => (
          <div className="grid-item">&nbsp;</div>
        ))}
      </div> */

export default App;
