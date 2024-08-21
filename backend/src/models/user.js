const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'company',
            key: 'company_id',
          },
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        mobile: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        birth: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        gender: {
          type: Sequelize.ENUM('M', 'F', 'U'),
          allowNull: false,
          defaultValue: 'U',
        },
        provider: {
          type: Sequelize.ENUM('local', 'kakao', 'naver'),
          allowNull: false,
          defaultValue: 'naver',
        },
        agreement_sms: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        agreement_email: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // User는 여러 Tag를 가질 수 있으며, UserTag를 통해 연결
    User.belongsToMany(db.Tag, { through: db.UserTag, foreignKey: 'user_id' });
  }
}

module.exports = User;
