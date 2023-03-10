module.exports = {

  postPage: (currentPage, pagePostSize) => {
    return `
      SELECT board_no, board_title, create_date, update_date, member_id
      FROM board b
      JOIN member m on (m.member_no = b.member_no)
      ORDER BY CREATE_DATE DESC
      LIMIT ${pagePostSize} OFFSET ${(currentPage - 1) * pagePostSize}
    `;
  },

  selectConent: (postNo) => {
    return `
      SELECT board_content
      FROM BOARD
      WHERE BOARD_NO = ${postNo}
      `;
  },

  selectReply: (postNo, currentPage, pageReplySize ) => {
    return `
      SELECT REPLY_NO, MEMBER_NO, MEMBER_ID, R_CREATE_DATE, R_UPDATE_DATE, REPLY_CONTENT
      FROM REPLY 
      NATURAL JOIN MEMBER
      WHERE BOARD_NO = ${postNo}
      ORDER BY REPLY_NO
      LIMIT ${pageReplySize} OFFSET ${(currentPage - 1) * pageReplySize}
      `;
  },
  
  selectReplyCount: (postNo) => {
    return `
      SELECT COUNT(*)
      FROM REPLY
      WHERE BOARD_NO = ${postNo}
    `
  },

  selectPostCount: () => {
    return `
      SELECT COUNT(*)
      FROM BOARD
    `
  },

  userLogin: (userId, password) => {
    return `
      SELECT member_no
      FROM MEMBER
      WHERE MEMBER_ID = '${userId}'
      AND PASSWORD = '${password}'
    `
  },

  selectDuplication: (userId) => {
    return `
      SELECT COUNT(MEMBER_ID)
      FROM MEMBER
      WHERE MEMBER_ID = '${userId}'
    `
  },

  insertAccount: ( userId, password ) => {
    return `
      INSERT INTO MEMBER 
      VALUES ( nextval('seq_member_no') , '${userId}', '${password}') RETURNING MEMBER_ID 
    `
  },

}