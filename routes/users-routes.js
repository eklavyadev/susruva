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
    const users = await pool.query('SELECT * FROM leadusers', async(err, rows)=>{
      if (err){
        res.json({error: err})
      }
      res.json({users : rows});
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Create User Function
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    pool.query(
      `INSERT INTO leadusers (roleid, name, emailid, password, active, gender, loginaccess, registrationstageid, usertimezone, usertimezoneoffset, phonenumber) VALUES (7, '${req.body.name}', '${req.body.emailid}', '${hashedPassword}', 1, ${req.body.gender}, 1, 1, 'Asia/Calcutta', 330, '${req.body.phonenumber}')`, async(err, rows)=>{
        if (err){
          res.status(500).json({error: err})
        }
        res.json(jwtTokens(req.body.emailid));
      });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/', async (req,res)=>{
  try {
    const users = await pool.query('DELETE FROM leadusers');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})


export default router;