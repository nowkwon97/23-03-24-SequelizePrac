// MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의
// 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 한다.
const Sequelize = require('sequelize');
// comment모델을 만들어 comments 테이블에 연결
class Comment extends Sequelize.Model {
    // 테이블에 대한 설정 (첫번째 인수(모델.init)는 컬럼에 대한 설정, 두번째 인수는 테이블 자체에 대한 설정)
  static initiate(sequelize) {
    Comment.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false, // true 면 자동으로 createdAt, updatedAt 컬럼을 추가
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  // 다른 모델과의 관계
  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};

module.exports = Comment;