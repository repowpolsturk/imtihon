const db = require('../config/db');

exports.createTask = (req, res) => {
  const { name, description, status, projectId, userId } = req.body;
  db('tasks').insert({ name, description, status, project_id: projectId, user_id: userId }).returning('*').then(tasks => {
    res.status(201).json(tasks[0]);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.getTask = (req, res) => {
  const { id } = req.params;
  db('tasks').where({ id }).first().then(task => {
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  db('tasks').where({ id }).update({ name, description, status }).then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db('tasks').where({ id }).del().then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};
