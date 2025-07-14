module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    photos: DataTypes.JSON,
    publishAt: DataTypes.DATE,
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: DataTypes.INTEGER,
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'user', 
    });

    Event.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return Event;
};
