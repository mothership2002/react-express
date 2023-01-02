export class ModelArticle {
    no : number = -1;
    title : string = '';
    regNickName : string = '';
    regDateTime : string = '';
}

export class ConditionToggle {
    postFlag : boolean = false;
    replyListFlag : boolean = false;
}

// class ModelPost {
//     no : number = -1;
//     title : string = '';
//     content : string = '';
//     regNickName : string = '';
//     regDateTime : string = '';
//     updateDateTime : string = '';
// }

// class ModelReply {
//     createNo : number = -1;
//     replyNo : number = -1;
//     replyContent : string = '';
//     replyCreater : string = '';
//     replyCreateDate : string = '';
//     replyUpdateDate : string = '';
// }

// export class ModelContent {
//     constructor() {
//         new ModelPost;
//         // new ModelReply;
//     }
// }