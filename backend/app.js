var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");  // Require the cors library

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var headerRouter = require("./routes/get-header/get-header.router");
var callback=require('./routes/callback/callback.routes')
var unsub=require('./routes/Unsubscription/Unsubscription.route')
var checkuser=require('./routes/login/login.route')
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/get-headers", headerRouter);
app.use('/notify-callback',callback)
app.use("/users", usersRouter);
app.use('/unsub',unsub)
app.use('/checkuser',checkuser)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
