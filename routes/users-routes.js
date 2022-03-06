import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import {authenticateToken} from '../middleware/authorization.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

let refreshTokens = [];

const router = express.Router();

//  List All Users
router.get('/',authenticateToken, async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await pool.query('SELECT * FROM users');
    res.json({users : users.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY1NTg4NDQsImV4cCI6MTY0NjU2MjQ0NH0.JiR7h1Zya_nog9UjcpLSm14QeCfo1MCerSx2ghfhRWQ
// Create User Function
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (roleid, name, emailid, password, active, gender, loginaccess, registrationstageid, usertimezone, usertimezoneoffset, phonenumber) VALUES (7, '${req.body.name}', '${req.body.emailid}', '${hashedPassword}', 1, 1, 1, 1, 'Asia/Calcutta', 330, '${req.body.phonenumber}')`);
    res.json(jwtTokens(newUser));
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/', async (req,res)=>{
  try {
    const users = await pool.query('DELETE FROM users');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})


export default router;