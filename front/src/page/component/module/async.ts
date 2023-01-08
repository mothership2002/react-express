import { TYPE_ARTICLE } from "../../../type/type";

// const selectPost = async (postNo :number, dataList :TYPE_ARTICLE[] ) => {

//     const url = `http://localhost:3001/api/post/${postNo}`
//     const result = await fetch(url);
//     const resJson = await result.json();

//     let copiedDataList = [...dataList];
//     copiedDataList[postNo].board_content = resJson.board_content;
    
//     return copiedDataList;
    

//     // 변화 감지 불가 ( 객체에 매핑이 되어있지 않아서?)
//     // setDataList((dataList) => {
//     //   dataList[postNo].content = resJson.content;
//     //   console.log(dataList[postNo].content);
//     //   setDataList(dataList);
//     //   return dataList;
//     // });
//   }

// export { selectPost, }