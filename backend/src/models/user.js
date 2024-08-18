const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
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
        phone: {
          type: Sequelize.STRING(20),
          // allowNull: false,
          allowNull: true,
        },
        birth: {
          type: Sequelize.INTEGER(8),
          allowNull: false,
        },
        sex: {
          type: Sequelize.ENUM("male", "female"),
          // allowNull: false,
          allowNull: true,
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
