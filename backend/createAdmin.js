const bcrypt = require('bcryptjs');
const { User } = require('./models/User');

(async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
})();
