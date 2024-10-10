const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const redisClient = require('../config/redis');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Try to get tasks from Redis cache
    const cachedTasks = await redisClient.get('tasks');
    if (cachedTasks) {
      // If tasks are in cache, return the cached data
      return res.json(JSON.parse(cachedTasks));
    }

    const tasks = await Task.find();

    // Store the tasks in Redis cache with an expiration time of 1 hour 
    await redisClient.set('tasks', JSON.stringify(tasks), {
      EX: 3600,
    });

    // Return the tasks from the database
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [body('title').notEmpty().withMessage('Title cannot be empty')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const task = new Task(req.body);
      await task.save();

      // Invalidate the cache
      await redisClient.del('tasks');
      res.status(201).json(task);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.status = req.body.status || task.status;
    await task.save();

    // Invalidate the cache
    await redisClient.del('tasks');
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Invalidate the cache
    await redisClient.del('tasks');
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
