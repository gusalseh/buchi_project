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
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        birth: {
          type: Sequelize.INTEGER(6),
          allowNull: false,
        },
        sex: {
          type: Sequelize.ENUM("male", "female"),
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        company_branch: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: "main",
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
