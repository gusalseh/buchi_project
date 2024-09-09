const { Sequelize, DataTypes } = require('sequelize');

class Visit extends Sequelize.Model {
  static initiate(sequelize) {
    Visit.init(
      {
        visit_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
          },
          allowNull: false,
        },
        spot_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'spot',
            key: 'spot_id',
          },
          allowNull: false,
        },
        visit_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Visit', // 모델 이름 설정
        tableName: 'visit', // 테이블 이름을 명시적으로 지정
        timestamps: false,
      }
    );
  }
  static associate(models) {
    // Visit은 한 개의 Review를 가질 수 있다 (1:1 관계)
    Visit.hasOne(models.Review, {
      foreignKey: 'visit_id',
      sourceKey: 'visit_id',
    });

    // Visit은 하나의 Spot에 속한다 (N:1 관계)
    Visit.belongsTo(models.Spot, {
      foreignKey: 'spot_id',
      targetKey: 'spot_id',
    });

    // Visit은 하나의 User에 속한다 (N:1 관계)
    Visit.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });
  }
}

module.exports = Visit;
