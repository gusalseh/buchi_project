const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        mobile: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        birth: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        gender: {
          type: Sequelize.ENUM("M", "F"),
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING(40),
          // allowNull: false,
          allowNull: true,
        },
        company_branch: {
          type: Sequelize.STRING(40),
          // allowNull: false,
          allowNull: true,
          defaultValue: "main",
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao", "naver"),
          allowNull: false,
          defaultValue: "naver",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = User;
