const Sequelize = require('sequelize');

class SpotTag extends Sequelize.Model {
  static initiate(sequelize) {
    SpotTag.init(
      {
        spot_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'spot',
            key: 'spot_id',
          },
        },
        tag_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'tag',
            key: 'tag_id',
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'SpotTag',
        tableName: 'spot_tag',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // SpotTag는 Spot과 Tag를 참조합니다.
  }
}

module.exports = SpotTag;
