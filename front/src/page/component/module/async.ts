import { TYPE_ARTICLE } from "../../../type/type";

const reFresh = async (page:number) => {
    
    const res = await fetch(`http://localhost:3001/api/post-all/${page}`).catch(e => {
    console.log('error catch');
    alert('데이터 조회에 실패 했습니다.');
    return {
        json: () => {
            return undefined;
        }
        };
    });
    
    return res.json();
    
};

const selectReply = async (postNo:number, dataList:TYPE_ARTICLE[],) => {
    
    const url = `http://localhost:3001/api/reply/${postNo}`;
    const result = await fetch(url);
    const resJson = await result.json();

    let copiedDataList = [...dataList];
    copiedDataList[postNo].reply = resJson;

    return copiedDataList;
};

const selectDetail = async (postNo:number, dataList:TYPE_ARTICLE[]) => {

    const url = `http://localhost:3001/api/post/${postNo}`
    const result = await fetch(url);
    const resJson = await result.json();
 
    let copiedDataList = [...dataList];
    
    for(let a of copiedDataList) {
      if(a.board_no == postNo){
        a.board_content = resJson[0].board_content;
      }
    }
    return copiedDataList;
}



export {reFresh, selectReply, selectDetail};