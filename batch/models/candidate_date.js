'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate_date = sequelize.define('candidate_date', {
    candidate_month: DataTypes.STRING,
    candidate_date: DataTypes.DATE
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  candidate_date.associate = function(models) {
    // associations can be defined here
    candidate_date.hasMany(models.candidate_date_status, { foreignKey: 'candidate_date_id' });
  };
  return candidate_date;
};