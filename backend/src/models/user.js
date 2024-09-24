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
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
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
          type: Sequelize.ENUM('local', 'kakao', 'naver', 'google'),
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
  static associate(models) {
    // User는 여러 개의 Visit를 가질 수 있다 (1:N 관계)
    User.hasMany(models.Visit, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });

    // User는 여러 개의 UserLocation을 가질 수 있다 (1:N 관계)
    User.hasMany(models.UserLocation, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });

    // User는 한 개의 Company에 속한다. (1:1 관계)
    User.belongsTo(models.Company, {
      foreignKey: 'company_id',
      targetKey: 'company_id',
    });
  }
}

module.exports = User;
