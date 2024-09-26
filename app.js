import express from "express";
import connect from "./src/utils/mongodb.js";
import router from "./src/router.js";
import cookieParser from "cookie-parser";
import kakaoAccess from "./src/utils/kakaologin.js";


const app = express();
const port = 3000;


connect();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.get('/', (req, res) => {
  kakaoAccess(req, res, app);
  res.render('index');
});

app.listen(port, () => {
    console.log(port, "로 서버가 열렸습니다.");
});

 