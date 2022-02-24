// Importing Express, Middleware and PHPMyAdmin
const express = require('express');
const LimitingMiddleware = require('limiting-middleware');
const cors = require('cors');
const path = require('path'); 
const client = require("./database")
const app = express();

// App function
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

// All Endpoints

// React Dashboard
app.use(express.static(path.join(__dirname, 'build')));

// <----------- Working with marketings ------------>

// Fetching All marketings
app.get('/api', async(req, res, next) => {
  var sql = "select * from marketing"
  client.query(sql, async(err, rows) => {
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
    client.query(sql, (err, row) => {
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
app.post("/api/marketing/", (req, res, next) => {
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
    var sql = `INSERT INTO marketing (name, role, phone, email, class, country, subjects, requirements, Callstat, WAstat, emailstat, regid, date, action) VALUES ('${data.name}','${data.role}','${data.phone}','${data.email}','${data.class}','${data.country}','${data.subjects}','${data.requirements}','${data.Callstat}','${data.WAstat}','${data.emailstat}',NULL,'${data.date}','${data.action}')`
    client.query(sql, function (err, result) {
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
    client.query(
        `DELETE FROM marketing WHERE regid = ${req.params.id}`,
        function (err, result) {
            if (err){
                res.status(400).json({"error": err})
                return;
            }
            res.json({"message":"Deleted", changes: result})
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
        client.query(
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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}, react running on / and server running on /api`));
