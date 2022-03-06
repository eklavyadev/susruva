import express from 'express';
import pool from '../db.js';
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../middleware/authorization.js';

const router = express.Router();

/* GET data from the server. */
router.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM data');
    res.json({data : data.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* GET specific user's data from the server. */
router.get('/user', authenticateToken , async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({error:"Null token"});
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const username = decode.user_email;
  try {
    const data = await pool.query('SELECT * FROM data where username = ($1)', [username]);
    res.json({data : data.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Logged in user will only able to create data
router.post('/',authenticateToken, async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({error:"Null token"});
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const username = decode.user_email;
  try {
    const newData = await pool.query(
      'INSERT INTO data (title,username,isprivate,data_q,data_a) VALUES ($1,$2,$3,$4,$5) RETURNING *'
      , [req.body.title,username, req.body.isprivate, req.body.data_q, req.body.data_a]);
    res.json({"command": newData.command,"data": newData.rows});
    console.log(req.body.data_a)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/',authenticateToken , async (req,res)=>{
  try {
    const data = await pool.query('DELETE FROM data WHERE data_id = ($1)', [req.body.data_id]);
    res.status(204).json(data.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

/* GET public data from the server. */
router.get('/public' , async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM data where isprivate = ($1)', [false]);
    res.json({data : data.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;