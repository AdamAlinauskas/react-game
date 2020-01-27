import React, { Component } from "react";
import _ from "lodash";
import heroFront from "../images/hero-front.png";

class Board extends Component {
  state = { activeTile: {}, tiles: [], rows: 5, columns: 6 };

  componentDidMount() {
    const tiles = [];
    _.times(this.state.rows * this.state.columns, position => {
      tiles.push(new Tile(position));
    });

    const activeTile = tiles[5];
    activeTile.isActive = true;

    this.setState({ tiles, activeTile });

    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    console.log(event);
    //right 39 left 37
    if (event.keyCode === 39) {
      event.preventDefault();
      this.moveRight("hero-right.png");
    } else if (event.keyCode === 37) {
      event.preventDefault();
      this.moveLeft("hero-left.png");
    } else if (event.keyCode === 38) {
      event.preventDefault();
      this.moveUp("hero-front.png");
    } else if (event.keyCode === 40) {
      event.preventDefault();
      this.moveDown("hero-front.png");
    }
  };

  moveUp(image) {
    this.moveTile(-this.state.columns, image);
  }

  moveDown(image) {
    this.moveTile(+this.state.columns, image);
  }

  moveRight(image) {
    if (this.checkRowBoundry(1)) return;

    this.moveTile(1, image);
  }

  moveLeft(image) {
    if (this.checkRowBoundry(-1)) return;
    this.moveTile(-1, image);
  }

  checkRowBoundry(moveBy) {
    //are we on the most right side of the area
    let activeTile = { ...this.state.activeTile };

    const currentRow = Math.floor(activeTile.position / this.state.columns);
    const newPositionRow = Math.floor(
      (activeTile.position + moveBy) / this.state.columns
    );

    return currentRow !== newPositionRow;
  }

  moveTile(move, image) {
    const tiles = [...this.state.tiles];

    let activeTile = { ...this.state.activeTile };
    activeTile.isActive = false;
    activeTile.image = "";
    tiles[activeTile.position] = activeTile;

    const newActiveTilePosition = activeTile.position + move;

    if (newActiveTilePosition < 0 || newActiveTilePosition > tiles.length - 1)
      return;

    const newActiveTile = { ...tiles[newActiveTilePosition] };
    newActiveTile.isActive = true;
    newActiveTile.image = image;
    tiles[newActiveTile.position] = newActiveTile;
    this.setState({ activeTile: newActiveTile, tiles });
  }

  //left  / by grid row length to get row
  //copare current row to new row.. if different cant move.

  render() {
    const { tiles, columns } = this.state;
    const gridStyle = {
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    };

    const activeStyle = {
      //backgroundColor: "yellow",
      backgroundImage: `url(../hero-front.png)`,
      backgroundSize: "auto 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };

    console.log(tiles);
    return (
      <React.Fragment>
        <div className="grid" style={gridStyle}>
          {tiles.map(tile => {
            const style = tile.isActive ? activeStyle : {};
            style.backgroundImage = `url(../${tile.image})`;
            return (
              <div style={style} key={tile.position} className="grid-item">
                {/* This is tile {tile.position}
              &nbsp;<p>this is some math {tile.position / 6}</p> */}
              </div>
            );
          })}
          {/* {_.times(12 * 8, () => (
            <div className="grid-item">&nbsp;</div>
          ))} */}
        </div>
      </React.Fragment>
    );
  }
}

class Tile {
  isActive = false; // something like render()
  Color = "White";
  position = 0;
  image = "";
  constructor(position) {
    this.position = position;
  }
}

class HeroTitle extends Tile {
  colideWith(tile) {}
}

class CoinTile {
  //  colideReaction = ()=> increase score...
}

class BadGuyTile {
  // colideReaction = ()=> game over.... or lose health
}

export default Board;
