module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    lastSessionToken: { type: DataTypes.STRING },
  });

  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'createdBy',
      as: 'events', 
    });
  };

  return User;
};
