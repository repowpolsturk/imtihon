const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: async ({ email, username, password, role, firstName, lastName }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({
        email,
        username,
        password: hashedPassword,
        role,
        first_name: firstName,
        last_name: lastName,
        status : 'inactive'
      })
      .returning('*');
    return user;
  },
};

module.exports = User;
