import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

const logSession = null;
export class Banner extends Component {
  render() {
    return (
      <div style={{ display :'flex', 
                    justifyContent : 'space-between',
                    margin : '12px'}}>
        <div>게시판</div>
        {logSession === null ? <Button>로그인 판단여부</Button> : <Button>내 정보</Button>}
      </div>
    )
  }
}

export default Banner