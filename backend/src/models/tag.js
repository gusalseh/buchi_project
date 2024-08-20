const Sequelize = require('sequelize');

class Tag extends Sequelize.Model {
  static initiate(sequelize) {
    Tag.init(
      {
        tag_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        tag_name: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        tag_type: {
          type: Sequelize.ENUM('tagtype1', 'tagtype2'),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Tag',
        tableName: 'tag',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // Tag는 user_tag를 통해 여러 사용자와 연결됩니다.
    Tag.belongsToMany(db.User, { through: db.UserTag, foreignKey: 'tag_id' });
  }
}

module.exports = Tag;
