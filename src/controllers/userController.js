const db = require('../config/db');

exports.getUser = (req, res) => {
  const { id } = req.params;
  db('users').where({ id }).first().then(user => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  db('users').where({ id }).update({
    first_name: firstName,
    last_name: lastName,
    email
  }).then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db('users').where({ id }).del().then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};
