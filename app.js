var createError = require("http-errors");
var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
var bodyParser = require("body-parser");
var cors  = require("cors")//pb header

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();
var cors = require("cors")//pb header

//view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.text());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json({type:'application/json'}));


var Img = require('./images.js');
const dbUrl = "mongodb://localhost/imageTest_db";
mongoose.connect(dbUrl)
let db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error;'));

const imgRouter = express.Router();
app.use('/', imgRouter)

imgRouter.get('/addimage',(req, res) => {
  res.json({"admin":"working"})
})

const storage = multer.diskStorage({
destination: ( req, file, cb) => {
    cb(null, './public/uploads/')
},
filename: (req, file, cb) => {
  cb(null, file.originalname)
}
});

const upload = multer({storage: storage})
//const upload = multer({dest:'public/uploads/'});
imgRouter.post('/addimage', upload.single('img'),(req,res) => {
  let newImg = new Img(req.body)
  if(req.file){
     newImg.img = req.file.originalname
  }else{
    newImg.img = "noimage.png"
  }
  newImg.save((err,img) => {
    if(err) res.send(err)
    res.json(img)
  });
});

imgRouter.get('/showimage',(req, res) => {
  Img.find({},(err, imgs) => {
    if(err) throw err
    res.json(imgs)
  });
});

app.get('/img',(req,res) => {
  res.json({"message":"coucou"})
});
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
