import express from 'express';
import pool from '../db.js';
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../middleware/authorization.js';

const app = express.Router();

// Fetching All marketings
app.get('/api', authenticateToken , async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({error:"Null token"});
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const username = decode.emailid;
    var sql = `select * from marketing where username = '${username}'`
    pool.query(sql, async(err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });
  
  // Fetching marketing by regid
  app.get("/api/marketing/:id", (req, res, next) => {
      var sql = `select * from marketing where regid = ${req.params.id}`
      pool.query(sql, (err, row) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          })
      });
  });
  
  // Adding marketing
  app.post("/api/marketing/", authenticateToken, (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({error:"Null token"});
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const username = decode.emailid;
      var errors=[]
      if (!req.body.name){
          errors.push("No name specified");
      }
      if (!req.body.role){
          errors.push("No role specified");
      }
      if (!req.body.phone){
          errors.push("No phone specified");
      }
      if (!req.body.email){
          errors.push("No email specified");
      }
      if (!req.body.class){
          errors.push("No class specified");
      }
      if (!req.body.country){
          errors.push("No country specified");
      }
      if (!req.body.subjects){
          errors.push("No subjects specified");
      }
      if (!req.body.requirements){
          errors.push("No requirements specified");
      }
      if (!req.body.Callstat){
          errors.push("No call status specified");
      }
      if (!req.body.WAstat){
          errors.push("No WA status specified");
      }
      if (!req.body.emailstat){
          errors.push("No email status specified");
      }
      if (!req.body.action){
          errors.push("No action specified");
      }
      
      if (errors.length){
          res.status(400).json({"error":errors.join(",")});
          return;
      }
      
      let ts = Date.now();
      let date_time = new Date(ts);
      let date = date_time.getDate();
      let month = date_time.getMonth() + 1;
      let year = date_time.getFullYear();
      let today = year + "-" + month + "-" + date;
  
      var data = {
          name: req.body.name,
          role: req.body.role,
          phone: req.body.phone,
          email: req.body.email,
          class: req.body.class,
          country: req.body.country,
          subjects: req.body.subjects,
          requirements: req.body.requirements,
          Callstat: req.body.Callstat,
          WAstat: req.body.WAstat,
          emailstat: req.body.emailstat,
          date: today,
          action: req.body.action
      }
      var sql = `INSERT INTO marketing (name, role, phone, email, class, country, subjects, requirements, Callstat, WAstat, emailstat, regid, date, action, username) VALUES ('${data.name}','${data.role}','${data.phone}','${data.email}','${data.class}','${data.country}','${data.subjects}','${data.requirements}','${data.Callstat}','${data.WAstat}','${data.emailstat}',NULL,'${data.date}','${data.action}', '${username}')`
      pool.query(sql, function (err, result) {
          if (err){
              res.status(400).json({"error": err})
              return;
          }
          res.json({
              "message": "success",
              "data": data
          })
      });
  })
  
  // Delete marketing by regid
  app.delete("/api/marketing/:id", (req, res) => {
      pool.query(
          `DELETE FROM marketing WHERE regid = ${req.params.id}`,
          function (err, result) {
              if (err){
                  res.status(400).json({"error": err})
                  return;
              }
              res.json({"message":"Deleted", changes: result})
      });
  })

// All marketing
    app.get("/api/marketing/", (req, res) => {
        pool.query(
            `SELECT * FROM marketing`,
            function (err, result) {
                if (err){
                    res.status(400).json({"error": err})
                    return;
                }
                res.json({"success": result})
        });
    })
  // Edit marketing
  app.patch("/api/marketing/:id", (req, res, next) => {
      var errors=[]
      if (!req.body.name){
          errors.push("No name specified");
      }
      if (req.body.role===undefined || req.body.role===null){
          errors.push("No role specified");
      }
      if (!req.body.phone){
          errors.push("No phone specified");
      }
      if (!req.body.email){
          errors.push("No email specified");
      }
      if (!req.body.class){
          errors.push("No class specified");
      }
      if (!req.body.country){
          errors.push("No country specified");
      }
      if (!req.body.subjects){
          errors.push("No subjects specified");
      }
      if (!req.body.requirements){
          errors.push("No requirements specified");
      }
      if (!req.body.Callstat){
          errors.push("No call status specified");
      }
      if (!req.body.WAstat){
          errors.push("No WA status specified");
      }
      if (!req.body.emailstat){
          errors.push("No email status specified");
      }
      if (!req.body.action){
          errors.push("No action specified");
      }
      if (errors.length){
          res.status(400).json({"error":errors.join(",")});
          return;
      }
      var data = {
          name: req.body.name,
          role: req.body.role,
          phone: req.body.phone,
          email: req.body.email,
          class: req.body.class,
          country: req.body.country,
          subjects: req.body.subjects,
          requirements: req.body.requirements,
          Callstat: req.body.Callstat,
          WAstat: req.body.WAstat,
          emailstat: req.body.emailstat,
          action: req.body.action
      }
          pool.query(
          `UPDATE marketing set name='${data.name}', role='${data.role}', phone='${data.phone}', email='${data.email}', class='${data.class}', country='${data.country}', subjects='${data.subjects}', requirements='${data.requirements}', Callstat='${data.Callstat}', WAstat='${data.WAstat}', emailstat='${data.emailstat}', action='${data.action}' WHERE regid = '${req.params.id}'`,
          function (err, result) {
              if (err){
                  res.status(400).json({"error": err})
                  return;
              }
              res.json({
                  message: "Success!",
                  data: data,
                  changes: this.changes
              })
      })
  })


export default app;