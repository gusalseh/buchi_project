const Sequelize = require('sequelize');

class UserTag extends Sequelize.Model {
  static initiate(sequelize) {
    UserTag.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
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
        timestamps: false,
        underscored: false,
        modelName: 'UserTag',
        tableName: 'user_tag',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // UserTag는 User와 Tag를 참조합니다.
  }
}

module.exports = UserTag;
