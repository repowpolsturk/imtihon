const db = require('../config/db');

exports.createProject = (req, res) => {
  const { name, description, status, userId } = req.body;
  db('projects').insert({ name, description, status, user_id: userId }).returning('*').then(projects => {
    res.status(201).json(projects[0]);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  db('projects').where({ id }).first().then(project => {
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  db('projects').where({ id }).update({ name, description, status }).then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db('projects').where({ id }).del().then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};
