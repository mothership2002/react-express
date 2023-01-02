import React, { Component } from 'react';
import Board from './component/Board';
import Banner from './component/Banner';

export class Main extends Component {
  render() {
    return (
      <>
        <Banner></Banner>
        <Board></Board>
      </>
    )
  }
}

export default Main