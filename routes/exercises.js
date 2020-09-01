const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.json({ message: error });
  }
});

// Create a exercise
router.post('/add', async (req, res) => {
  const exercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });
  try {
    const savedExercise = await exercise.save();
    res.json(savedExercise);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get a specific exercis
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (error) {
    res.json({ message: error });
  }
});

//  Delete a specific exercise
router.delete('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.send('exercise deleted!');
  } catch (error) {
    res.json({ message: error });
  }
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json('Exercise updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
