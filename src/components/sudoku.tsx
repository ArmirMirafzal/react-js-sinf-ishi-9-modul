import { Tboard } from "App";
import React, { Component } from "react";
import Board from "./board";

interface SudokuProps {
	sudoku: Tboard[];
}

export default class Sudoku extends Component<SudokuProps> {
	render() {
  console.log(this.props.sudoku);
		return (
			<div className="sudoku">
				{this.props.sudoku.map((board) => {
					return <Board board={board} />;
				})}
			</div>
		);
	}
}
