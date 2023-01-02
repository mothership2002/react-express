import React, { Component } from 'react'

export class Banner extends Component {
  render() {
    return (
      <div style={{ display :'flex', 
                    justifyContent : 'space-between'}}>
        <div>게시판</div>
        <div>회원 가입 머시기 판단여부</div>
      </div>
    )
  }
}

export default Banner