const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const CryptoJS = require("crypto-js");
const encryptionKey = "112233";

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "bahl",
    database: "tune",
});

conn.getConnection((err) => {
    if (err) console.log(err);
    else {
        console.log("MySQL connection Pool Created")
    }
});

const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("The server is running at port: " + port);
});

app.get("/", (req, res) => {
    res.send(`<h1>Welcome</h1>`)
});

app.post("/signin", (req, res) => {
    let {name, email, password, dob, age, phoneNo} = req.body;
    let encryptedPasword = CryptoJS.AES.encrypt(password, encryptionKey);

    let query = `insert into users(name, password, dob, age, phno, email) values('${name}', '${encryptedPasword}', '${dob}', ${age}, '${phoneNo}', '${email}' )`;

    conn.query(query, (err) => {
        err ? res.send("error") : res.send("Added")
    })
});

app.post("/login", (req, res) => {
    let {email, password} = req.body;

    let query = `select * from users where email = '${email}'`;

    conn.query(query, (err, rows) => {
        let plainPassword = CryptoJS.AES.decrypt(rows[0].password, encryptionKey).toString(CryptoJS.enc.Utf8)

        err ? res.send("error") : plainPassword === password ? res.send(rows) : res.send("Invalid")
    })
});

app.post("/posts", (req, res) => {

    let query = `select * from posts`;

    conn.query(query, (err, rows) => {
        err ? res.send("error") : res.send(rows)
    })
});

app.post("/getLikes", (req, res) => {
    let {userId} = req.body;

    let query = `select postid from Likes where userid='${userId}'`;

    conn.query(query, (err, rows) => {
        err ? res.send("error") : res.send(rows)
    })
});

app.post("/feedback", (req, res) => {
    let {userId, feedback} = req.body;

    Date.prototype.today = function () { 
        return  this.getFullYear() + "/" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +(((this.getMonth()+1) < 10)?"0":"");
    }
    
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
    var newDate = new Date();
    let date = newDate.today()
    let time = newDate.timeNow()

    let query = `insert into feedback(userid,fbdate,fbtime,comment) values ('${userId}','${date}','${time}','${feedback}')`;

    conn.query(query, (err) => {
        err ? res.send("error") : res.send("Done")
    })
});

app.post("/postPref", (req, res) => {
    let {userId} = req.body;
    let genre = []

    let query = `select * from preferences where  userid='${userId}'`;

    conn.query(query, (err, rows) => {
        genre = [rows[0].genreid1, rows[0].genreid2, rows[0].genreid3]

        let query2 = `select * from posts where genreid=${genre[0]} OR genreid=${genre[1]} OR genreid=${genre[2]}`;

        conn.query(query2, (err, rows) => {
            err ? res.send("error") : res.send(rows)
        })
    })    
});

app.post("/like", (req, res) => {
    let {postId, userId, likeCount} = req.body;

    let query = `insert into likes (userid, postid) VALUES (${userId}, ${postId});`;

    conn.query(query, (err) => {

        if(err){
            res.send("error")
        }
        else {
            let query2 = `update posts set likes=${likeCount} where postid=${postId}`;

            conn.query(query2, (err) => {
                if(err)  res.send("error")
            })
            res.send("success")
        }
    })
});

app.post("/unlike", (req, res) => {
    let {postId, userId, likeCount} = req.body;

    let query = `delete from likes where postid=${postId} and userid=${userId};`;

    conn.query(query, (err) => {

        if(err){
            res.send("error")
        }
        else {
            let query2 = `update posts set likes=${likeCount} where postid=${postId}`;

            conn.query(query2, (err) => {
                if(err)  res.send("error")
            })
            res.send("success")
        }
    })    
});

app.post("/preference", (req, res) => {
    let {emailId, gId1, gId2, gId3} = req.body;

    let query = `select userid from users where email='${emailId}'`;

    conn.query(query, (err, rows) => {
 
        if(err){
            res.send("error")
        }
        else {
            let userId = rows[0].userid;
            let query2 = `insert into preferences(userid,genreid1,genreid2,genreid3) value ('${userId}', ${gId1}, ${gId2}, ${gId3})`;

            conn.query(query2, (err) => {
                if(err)  res.send("error")
            })
            res.send("success")
        }
    })    
});

app.post("/store", (req, res) => {

    let query = `select * from merchandise`;

    conn.query(query, (err, rows) => {
        err ? res.send("error") : res.send(rows)
    })    
});