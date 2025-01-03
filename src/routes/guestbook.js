const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// 방명록 목록 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM guestbook ORDER BY created DESC');
    res.json(rows);
  } catch (error) {
    console.error('방명록 조회 실패:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 방명록 작성
router.post('/', async (req, res) => {
  const { author, description, password } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO guestbook (author, description, password, created) VALUES (?, ?, ?, NOW())',
      [author, description, password]
    );
    res.status(201).json({ id: result.insertId, message: "방명록이 작성되었습니다." });
  } catch (error) {
    console.error("방명록 작성 실패:", error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router; 