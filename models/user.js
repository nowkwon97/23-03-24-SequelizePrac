// MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의
// 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 한다.
const Sequelize = require('sequelize');
// user모델을 만들어 users 테이블에 연결
// User모델은 Sequelize.Model을 확장한 클래스로 선언
// 모델은 크게 static initiate메서드와 static associate 메서드로 나뉨
// 시퀄라이즈는 알아서 id를 기본키로 연결하므로 id컬럼 적을 필요 X
class User extends Sequelize.Model {
  // 테이블에 대한 설정 (첫번째 인수(모델.init)는 컬럼에 대한 설정, 두번째 인수는 테이블 자체에 대한 설정)
  static initiate(sequelize) {
    User.init({
      name : {
        type: Sequelize.STRING(20),
        allowNULL: false,
        unique: true,
      },
      age : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNULL: false,
      },
      married : {
        type : Sequelize.BOOLEAN,
        allowNULL: false,
      },
      comment : {
        type: Sequelize.TEXT,
        allowNULL: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNULL: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      // true이면 시퀄라이즈는 createdAt, updatedAt 컬럼을 추가한다. 각각 로우가 생설될 때와 수정될 때의 시간이 자동으로 입력된다.
      timestamps: false,
      // underscored : 시퀄라이즈는 기본적으로 테이블과 컬럼명을 캐멀 케이스로 만든다.
      // 카멜 케이스 -> 스네이크 케이스로 바꾸는 옵션이다.
      underscored: false,
      modelName: 'User',
      // 실제 DB의 테이블 이름이다. 기본적으로 모델 이름을 소문자 및 복수형으로 만든다. ex) User -> users
      tableName: 'users',
      // true로 설정하면 deletedAt 컬럼이 생긴다.
      // 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록된다.
      // 로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우(삭제되지 않았다는 뜻)를 조회한다.
      // 이렇게 하는 이유 -> 나중에 로우를 복원하기 위해서이다.
      // 로우를 복원해야 하는 상황이 생길 것 같다면 미리 true로 설정해두자.
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  // 다른 모델과의 관계
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};

module.exports = User;