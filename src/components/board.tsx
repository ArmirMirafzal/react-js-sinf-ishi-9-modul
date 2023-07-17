import React, { Component } from "react";
import Cell from "./cell";

interface BoardProps {
	board: number[];
}

export default class Board extends Component<BoardProps, {}> {
	render() {
		console.log("boards =>>> ", this.props.board);
		return (
			<>
				<div className="board">
					{this.props.board.map((number, idx) => {
						return <Cell key={idx} number={number} />;
					})}
				</div>
			</>
		);
	}
}
