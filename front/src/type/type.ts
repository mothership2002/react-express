export type TYPE_ARTICLE = {
    no : number,
    title : string,
    regNickName : string,
    regDateTime : string,
    updateDateTime : string,
};

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
