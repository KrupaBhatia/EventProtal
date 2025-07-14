const bcrypt = require('bcrypt');
const db = require('../config/sequelize');

const createAdmin = async () => {
  try {
    await db.sequelize.sync();

    const hash = await bcrypt.hash('admin123', 10);

    const user = await db.User.create({
      username: 'admin',
      password: hash,
    });

    console.log('Admin user created:', user.username);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
