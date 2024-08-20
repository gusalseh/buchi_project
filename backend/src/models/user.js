const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        // company_id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: 'company',
        //     key: 'company_id',
        //   },
        // },
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
        agreement: {
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

  static associate(db) {}
}

module.exports = User;
