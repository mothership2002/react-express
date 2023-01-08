module.exports = {
  // postAll: () => {
  //   return `
  //     select board_no, board_title, create_date, update_date, member_id
  //     from board b
  //     join member m on (m.member_no = b.member_no)
  //   `;
  // },
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
      WHERE BOARD_NO = ${postNo}`
  },

  selectReply: `select`,
}