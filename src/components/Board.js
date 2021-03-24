import React, { Component } from "react";
import Button from "./Button";
class Board extends Component {
  componentDidMount() {
    const { aiMove } = this.props;
    if (aiMove) {
      setTimeout(() => aiMove(), 1500);
    }
  }

  componentDidUpdate() {
    const { aiMove, determineWinner } = this.props;
    if (aiMove) {
      setTimeout(() => aiMove(), 1500);
    }
    determineWinner();
  }

  render() {
    const { boardInfo, onClick, pattern } = this.props;
    return (
      <div className="App-main-box">
        {boardInfo.map((e, i) => (
          <Button
            key={i}
            className={pattern.includes(i) ? "red" : ""}
            onClick={() => (e === null ? onClick(i) : null)}
            label={boardInfo[i]}
          />
        ))}
      </div>
    );
  }
}
export default Board;
