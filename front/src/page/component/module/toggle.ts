import { TOGGLE_CONDITION } from "../../../type/type";

const toggle = (conditional:TOGGLE_CONDITION[], flag:boolean, object:string, index:number) => {
        
    let copiedFlag = [...conditional];

    if( object === 'content') {

      const temp = copiedFlag[index].postFlag;
      copiedFlag[index].postFlag = !temp;
  
    } 
    else if ( object === 'reply' ) {

      const temp = copiedFlag[index].replyListFlag;
      copiedFlag[index].replyListFlag = !temp;
      
    }
}

export {toggle};