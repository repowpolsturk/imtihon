const db = require('../config/db');

exports.createComment = (req, res) => {
  const { text, taskId, userId } = req.body;
  db('comments').insert({ text, task_id: taskId, user_id: userId }).returning('*').then(comments => {
    res.status(201).json(comments[0]);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.getComment = (req, res) => {
  const { id } = req.params;
  db('comments').where({ id }).first().then(comment => {
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.updateComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  db('comments').where({ id }).update({ text }).then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  db('comments').where({ id }).del().then(count => {
    if (count === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};
