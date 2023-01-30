export type TYPE_ARTICLE = {
    board_no : number,
    board_title : string,
    member_id : string,
    create_date : string,
    update_date : string,
    board_content : string | undefined,
    contentOpen : boolean,
    replyOpen: boolean,
    reply : TYPE_REPLY[] | undefined,
    replyCount : number,
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

// export type TOGGLE_CONDITION = {
//   postFlag : boolean,
//   replyListFlag : boolean,
// }

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
  reply_no : number,
  member_no : number,
  member_id : string,
  reply_content : string,
  r_create_date : string,
  r_update_date : string,
}
