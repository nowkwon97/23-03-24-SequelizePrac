// 시퀄라이즈 사용하기 위해 require
const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
// MySQL 과 연동할 때는 config 폴더 안의 config.json 정보가 사용된다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
// db 객체에 User, Comment 모델을 담아둔다. 앞으로 db 객체를 require 해서 User, Comment 모델 접근 가능
db.User = User;
db.Comment = Comment;
// 각각 모델의 static initiate메서드를 호출하는 것이다.
// 모델.init이 실행되어야 테이블이 모델로 연결된다.
User.initiate(sequelize);
Comment.initiate(sequelize);
// 다른 테이블과의 관계를 연결하는 static associate메서드도 미리 실행해둔다.
User.associate(db);
Comment.associate(db);

module.exports = db;