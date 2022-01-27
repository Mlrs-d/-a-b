"use strict";

//모듈
const express = require('express');
const app = express();


//라우팅
const home = require("./src/routers/home");

//앱 세팅
app.set("views", "./app/views" );
app.set("view engine", "ejs");

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.


app.use('/public', express.static('./app/public'));

module.exports = app;