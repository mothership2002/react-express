export type TYPE_ARTICLE = {
    board_no : number,
    board_title : string,
    member_id : string,
    create_date : string,
    update_date : string,
    board_content : string | undefined,
    reply : TYPE_REPLY[] | undefined
            // [
            //   {
            //     createNo : number,
            //     replyNo : number,
            //     replyContent : string,
            //     replyCreater : string,
            //     replyCreateDate : string,
            //     replyUpdateDate : string,
            //   },   ON = {
//   replyFlag : boolean,  
            // ]
};

export type TOGGLE_CONDITION = {
  postFlag : boolean,
  replyListFlag : boolean,
}

// export type REPLY_CONDITI
// }


// 테스트용 타입 객체;
export type TYPE_POST = {
  no : number,
  title : string,
  content : string,
  regNickName : string,
  regDateTime : string,
  updateDateTime : string,
}

export type TYPE_REPLY = {
  createNo : number,
  replyNo : number,
  replyContent : string,
  replyCreater : string,
  replyCreateDate : string,
  replyUpdateDate : string,
}
