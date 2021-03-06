'use strict'

module.exports = function (sequelize, DataTypes) {
  let Group = sequelize.define('Group', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    vhost: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAdministrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    paranoid: true
  })

  Group.associate = function (models) {
    models.Group.hasMany(models.UserGroups)

    models.Group.addScope('stats', {
      attributes: []
    })
  }

  return Group
}
