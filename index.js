const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ehdgus99$$',
  database: 'auctiondb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// // 기본 라우트
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public','src', 'views'));
// });

// 기본 라우트
app.get('/', (req, res) => {
  res.render('index', { items: ['Item 1', 'Item 2', 'Item 3'] });
});

// 예제 라우트: 데이터베이스에서 데이터 가져오기
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
