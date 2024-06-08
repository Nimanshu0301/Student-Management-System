const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.get('/getUsers', async (req, res) => {
  try {
    if (req.query.ID) {
      const ID = req.query.ID;

      const connection = await pool.getConnection();

      const [result] = await connection.query('SELECT * FROM tblusers WHERE ID != ?', [ID]);

      connection.release();

      if (result.length > 0) {
        res.json({ status: 'success', data: result });
      } else {
        res.status(404).json({ status: 'failed', data: 'No records found.' });
      }
    } else {
      res.status(400).json({ status: 'failed', data: 'Missing ID parameter.' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database Error: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
