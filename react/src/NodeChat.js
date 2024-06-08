const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
  next();
});

// MySQL configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'nxb4401_root',
  password: 'NXB@2023666',
  database: 'nxb4401_studentmsd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/sendMessage', async (req, res) => {
  try {
    const to_id = req.body.to_id;
    const message = req.body.message;
    const from_id = req.body.from_id;
    const datetime = req.body.datetime;

    const connection = await pool.getConnection();

    let result1;

    if (!message && !datetime) {
      [result1] = await connection.query(`
        SELECT cl.to_id, cl.message, cl.from_id, cl.datetime, u.FirstName
        FROM chat_list cl
        JOIN tblusers u ON u.ID = cl.from_id
        WHERE (cl.to_id = ? AND cl.from_id = ?) OR (cl.to_id = ? AND cl.from_id = ?)
        ORDER BY cl.datetime DESC
        LIMIT 10
      `, [to_id, from_id, from_id, to_id]);
    } else {
      const insertData = {
        to_id: to_id,
        message: message,
        from_id: from_id,
        datetime: datetime,
      };

      await connection.query('INSERT INTO chat_list SET ?', insertData);

      [result1] = await connection.query(`
        SELECT cl.to_id, cl.message, cl.from_id, cl.datetime, u.FirstName
        FROM chat_list cl
        JOIN tblusers u ON u.ID = cl.from_id
        WHERE (cl.to_id = ? AND cl.from_id = ?) OR (cl.to_id = ? AND cl.from_id = ?)
        ORDER BY cl.datetime DESC
        LIMIT 10
      `, [to_id, from_id, from_id, to_id]);
    }

    connection.release();

    if (result1.length > 0) {
      res.json({ status: 'success', data: result1 });
    } else {
      res.json({ status: 'failed', data: 'No records found.' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database Error: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
