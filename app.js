// express 앱과 MySQL 연결
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
// require('./models')는 require('./models/index.js')와 같다.
// 폴더 내의 index.js 파일은 require 시 생략 가능
const { sequelize } = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express : app,
  watch : true,
});
// force : true 시 서버 실행 때마다 테이블 재생성
// 테이블을 잘못 만든 경우 true로 설정하면 된다.
sequelize.sync({ force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());

  app.use(express.urlencoded({ extended: false}));

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/comments', commentsRouter);

  app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });