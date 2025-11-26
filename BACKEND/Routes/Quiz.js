// BACKEND/Routes/Quiz.js

const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth'); // Import the JWT authentication middleware
const Module = require('../Models/Module');
const Quiz = require('../Models/Quiz'); 
// Assuming the path to your models is correct: ../Models/Module and ../Models/Quiz

// @route   GET /api/quiz/:moduleId
// @desc    Fetches quiz questions for a specific module
// @access  Private
router.get('/:moduleId', auth, async (req, res) => {
    try {
        const moduleId = req.params.moduleId;

        // 1. Find the module and populate the quizzes associated with it
        const module = await Module.findById(moduleId).populate('quizzes');

        if (!module) {
            return res.status(404).json({ msg: 'Module not found' });
        }

        // 2. Select the first quiz for this module (you can expand this later)
        if (module.quizzes.length === 0) {
             return res.status(404).json({ msg: 'No quiz available for this module' });
        }
        const quizId = module.quizzes[0]._id;

        // 3. Fetch the quiz questions
        const quiz = await Quiz.findById(quizId);
        
        // 4. Transform the questions to HIDE the correct answer before sending to the frontend
        const safeQuestions = quiz.questions.map(q => ({
            _id: q._id,
            questionType: q.questionType,
            text: q.text,
            options: q.options,
            points: q.points
            // CORRECT ANSWER IS LEFT OUT FOR SECURITY!
        }));

        res.json({ title: quiz.title, questions: safeQuestions });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;