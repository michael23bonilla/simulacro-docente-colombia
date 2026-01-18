require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/concurso_docente';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the parent directory (frontend)
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes

// 1. Get Questions for a specific Drill (Simulacro)
app.get('/api/questions/simulate', async (req, res) => {
    try {
        const mode = req.query.mode || 'real'; // 'real', 'area'
        const area = req.query.area || 'pedagogy';
        const limit = parseInt(req.query.limit) || 20;

        let questions = [];

        if (mode === 'real') {
            const profile = req.query.profile || 'general';

            // CNSC Strategy:
            // 40% Common Functional (Pedagogy, Legislation, Global Curriculum)
            // 30% Specific Functional (Profile specific: Math, Tech, etc.)
            // 30% Behavioral (Common)

            const commonCount = Math.floor(limit * 0.4);
            const specificCount = Math.floor(limit * 0.3);
            const behavioralCount = limit - commonCount - specificCount;

            // 1. Common Functional (Area = Pedagogy OR Global OR Humanities if generic)
            // We'll treat 'pedagogy' and 'humanities' (reading) as common for everyone usually, 
            // but let's stick to 'pedagogy' + 'aptitude' as common functional base if no specific mapped.
            const commonQuestions = await Question.aggregate([
                { $match: { component: 'functional', area: { $in: ['pedagogy', 'humanities'] } } },
                { $sample: { size: commonCount } }
            ]);

            // 2. Specific Functional
            // Map profile string to DB area string
            const areaMap = {
                'tecnologia': 'technology',
                'matematicas': 'aptitude', // Assuming aptitude contains math logic
                'primaria': 'pedagogy',    // Primary focuses heavily on pedagogy
                'sociales': 'humanities',  // Mapping closely
                'humanidades': 'humanities',
                'directivo': 'pedagogy'    // Management is close to pedagogy/legislation
            };

            const targetArea = areaMap[profile] || 'pedagogy';

            const specificQuestions = await Question.aggregate([
                { $match: { component: 'functional', area: targetArea } },
                { $sample: { size: specificCount } }
            ]);

            // 3. Behavioral
            const behavioralQuestions = await Question.aggregate([
                { $match: { component: 'behavioral' } },
                { $sample: { size: behavioralCount } }
            ]);

            questions = [...commonQuestions, ...specificQuestions, ...behavioralQuestions];

        } else if (mode === 'area') {
            // Specific training (e.g., only Aptitude or only Technology)
            // If area is 'pedagogy', we usually include 'functional' generic ones too
            const filter = { area: area };
            if (area === 'pedagogy') {
                // Allow global pedagogy questions too
            }

            questions = await Question.aggregate([
                { $match: filter },
                { $sample: { size: limit } }
            ]);
        }

        // Shuffle the final result
        questions = questions.sort(() => Math.random() - 0.5);

        res.json(questions);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// 2. Get Stats (Optional future use)
app.get('/api/stats', async (req, res) => {
    // Implementation for dashboard stats
    res.json({ message: "Stats endpoint" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
