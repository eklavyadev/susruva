import jwt from 'jsonwebtoken'
// const sign = jwt.sign({"username": "eklavyachandra3040@gmail.com"}, "secretky", { expiresIn: '10hr' })
// console.log(sign)
const decode = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVrbGF2eWFjaGFuZHJhMzA0MEBnbWFpbC5jb20iLCJpYXQiOjE2NDY1ODM2MDcsImV4cCI6MTY0NjYxOTYwN30.m2FUENBmolKtQQ8i7gLqmWs45EpjdCjFl3uZy_D1lv4', "secretky")
console.log(decode)