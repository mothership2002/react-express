import { TYPE_ARTICLE } from "../type/type";

const errorCatch = (e:any) => {
    console.log('error catch');
    alert('데이터 조회에 실패 했습니다.');
    return {
        json: () => {
            return undefined;
            }
    };
}

const getResult = (dataList:TYPE_ARTICLE[], postNo:number, resJson:any, flag:string) => {
    let copiedDataList = [...dataList];
    
    for(let a of copiedDataList) {
      if(a.board_no === postNo){
        if(flag === 'content'){
            a.board_content = resJson[0].board_content;
        }
        else {
            a.reply = resJson;
        }
      }
    }
    
    return copiedDataList;
}

const reFresh = async (page:number) => {
    
    const result = await fetch(`http://localhost:3001/api/post-all/${page}`).catch( (e) =>
        errorCatch(e)
    );
    const resJson = await result.json()
    
    if (resJson !== undefined) {       
        resJson.postList.map((item:TYPE_ARTICLE, index:any) => {
            item.contentOpen = false;
            item.replyOpen = false;
            return item;
        });   
        return resJson;
    }
    else {
        return undefined
    }

    
};

const selectReply = async (postNo:number, dataList:TYPE_ARTICLE[],) => {
    // 디비 샘플 넣은 후 수정해야함
    const url = `http://localhost:3001/api/reply/${postNo}`;
    const result = await fetch(url).catch((e) =>
        errorCatch(e)
    );
    return getResult(dataList, postNo, await result.json(), 'reply');
};


const selectDetail = async (postNo:number, dataList:TYPE_ARTICLE[]) => {

    const url = `http://localhost:3001/api/post/${postNo}`
    const result = await fetch(url).catch((e) =>
        errorCatch(e)
    );
    return getResult(dataList, postNo, await result.json(), 'content');

    // 변화 감지 불가 ( 객체에 매핑이 되어있지 않아서?)
    // setDataList((dataList) => {
    //   dataList[postNo].content = resJson.content;
    //   console.log(dataList[postNo].content);
    //   setDataList(dataList);
    //   return dataList;
    // });
}


export {reFresh, selectReply, selectDetail};