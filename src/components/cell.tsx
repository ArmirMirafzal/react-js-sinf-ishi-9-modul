import React, { Component } from 'react'

interface CellProps {
	number: number;
}

export default class Cell extends Component<CellProps, {}> {
  render() {
    return (
      <>
       <div className="cell">{this.props.number}</div>
      </>
    )
  }
}

