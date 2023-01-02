export type TYPE_ARTICLE = {
    no : number,
    title : string,
    regNickName : string,
    regDateTime : string,
    updateDateTime : string,
    content : string | undefined,
    reply : TYPE_REPLY[] | undefined
            // [
            //   {
            //     createNo : number,
            //     replyNo : number,
            //     replyContent : string,
            //     replyCreater : string,
            //     replyCreateDate : string,
            //     replyUpdateDate : string,
            //   },     
            // ]
};






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
