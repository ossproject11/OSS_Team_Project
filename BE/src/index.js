const express = require("express");
const app = express();
const router = express.Router();
const logger = require("morgan");
const bodyParser = require("body-parser");
const route = require("./route");
const PORT = 8080;
const models = require("./models/index");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

models.sequelize
  .sync()
  .then(() => {
    console.log("====DB 연결 성공======");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

global.appRoot = path.resolve(__dirname);
// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//cors
const cors = require("cors");

// router.use(
//     cors()
// );
app.use(cors());

app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

//routers
app.use("/api", route);
app.use("/api/images", express.static("./static"));

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT);

module.exports = app;
