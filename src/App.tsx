import React, { Component } from "react";
import Sudoku from "./components/sudoku";

export type Tboard = number[];

interface SudokuState {
	sudoku: Tboard[];
}

let count = 1;

export default class app extends Component<{}, SudokuState> {
	state: SudokuState = {
		sudoku: new Array(9).fill(null).map(() => new Array(9).fill(null).map(() => count++)),
	};

	render() {
		return (
			<>
				<Sudoku sudoku={this.state.sudoku}/>
			</>
		);
	}
}
