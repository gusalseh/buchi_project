const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
  static initiate(sequelize) {
    Company.init(
      {
        company_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING(80),
          allowNull: true,
        },
        industry_type: {
          type: Sequelize.ENUM('IT', 'EDU', 'BEUATY', 'NORMAL'),
          allowNull: false,
          defaultValue: 'NORMAL',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Company',
        tableName: 'company',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
}

module.exports = Company;
