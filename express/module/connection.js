const { Client, Pool } = require("pg");

const dbConfig = {
  user : 'board',
  host : 'localhost',
  database : 'board',
  password : 'board',
  port : 5432,
  max : 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let pool;

module.exports = {
  connectionPoolInit: async () => {
    if (!pool) {
      pool = new Pool(dbConfig);

      await pool.connect();
    }
    console.log('connection');
  },
  getRowResult: async (query) => {
    // const client = new Pool(dbConfig);
    // await client.connect();
    // const res = await client.query(query).catch(e => {
    //   console.log(e);
    // });
    // await client.end();
    
    const res = await pool.query(query).catch(e => {
      console.log(e);
    });
    return res.rows;
    // if (res.rows) {
    //   return res.rows;
    // }
    // else {
    //   return undefined;
    // }
  },
};
