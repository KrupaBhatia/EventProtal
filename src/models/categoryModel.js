module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Category, {
      as: 'subcategories',
      foreignKey: 'parentId'
    });
    Category.belongsTo(models.Category, {
      as: 'parent',
      foreignKey: 'parentId'
    });

    Category.hasMany(models.Event, {
      foreignKey: 'categoryId',
      as: 'Events',
    });
  };

  return Category;
};
