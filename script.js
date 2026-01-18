const API_URL = 'http://localhost:3000/api/questions/simulate';

// Basic State
let currentCategory = localStorage.getItem('selectedCategory') || 'pedagogia';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let secondsElapsed = 0;

// DOM Elements
const questionText = document.getElementById('question-text');
const contextText = document.getElementById('context-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const timerText = document.getElementById('timer');
const explanationBox = document.getElementById('explanation-box');
const explanationText = document.getElementById('explanation-text');
const resultsContainer = document.getElementById('results-container');
const quizInterface = document.getElementById('quiz-interface');
const categoryTitle = document.getElementById('category-title');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the quiz page
    if (window.location.pathname.includes('quiz.html')) {
        loadQuestions();
    }
});

// Modal Logic (Must be available globally for index.html)
// Modal & Selection Logic
let selectedLevel = '';

const subjectsDB = {
    'preescolar': [
        { id: 'cognitiva', name: 'Dimensión Cognitiva', backend: 'pedagogy' },
        { id: 'comunicativa', name: 'Dimensión Comunicativa', backend: 'humanities' },
        { id: 'socioafectiva', name: 'Dimensión Socioafectiva', backend: 'pedagogy' },
        { id: 'corporal', name: 'Dimensión Corporal', backend: 'pedagogy' },
        { id: 'estetica', name: 'Dimensión Estética', backend: 'humanities' },
        { id: 'etica_espiritual', name: 'Dimensión Ética y Espiritual', backend: 'pedagogy' }
    ],
    'primaria': [
        { id: 'lengua_castellana_prim', name: 'Lengua Castellana', backend: 'humanities' },
        { id: 'matematicas_prim', name: 'Matemáticas', backend: 'aptitude' },
        { id: 'naturales_prim', name: 'Ciencias Naturales y Ed. Ambiental', backend: 'pedagogy' },
        { id: 'sociales_prim', name: 'Ciencias Sociales (Hist/Geo/Const)', backend: 'pedagogy' },
        { id: 'etica_prim', name: 'Ed. Ética y Valores Humanos', backend: 'behavioral' },
        { id: 'artistica_prim', name: 'Educación Artística', backend: 'humanities' },
        { id: 'ed_fisica_prim', name: 'Ed. Física, Recreación y Deportes', backend: 'pedagogy' },
        { id: 'religiosa_prim', name: 'Educación Religiosa', backend: 'humanities' },
        { id: 'tecnologia_prim', name: 'Tecnología e Informática', backend: 'technology' },
        { id: 'ingles_prim', name: 'Lengua Extranjera (Inglés)', backend: 'humanities' }
    ],
    'secundaria': [
        { id: 'lengua_castellana', name: 'Lengua Castellana', backend: 'humanities' },
        { id: 'matematicas', name: 'Matemáticas', backend: 'aptitude' },
        { id: 'naturales', name: 'Ciencias Naturales', backend: 'pedagogy' },
        { id: 'biologia', name: 'Biología', backend: 'pedagogy' },
        { id: 'fisica', name: 'Física', backend: 'aptitude' },
        { id: 'quimica', name: 'Química', backend: 'pedagogy' },
        { id: 'sociales', name: 'Ciencias Sociales', backend: 'pedagogy' },
        { id: 'historia', name: 'Historia', backend: 'humanities' },
        { id: 'geografia', name: 'Geografía', backend: 'humanities' },
        { id: 'democracia', name: 'Democracia / Constitución', backend: 'citizenship' },
        { id: 'etica', name: 'Ed. Ética y Valores', backend: 'behavioral' },
        { id: 'artistica', name: 'Educación Artística', backend: 'humanities' },
        { id: 'ed_fisica', name: 'Educación Física', backend: 'pedagogy' },
        { id: 'religiosa', name: 'Educación Religiosa', backend: 'humanities' },
        { id: 'ingles', name: 'Lengua Extranjera', backend: 'humanities' },
        { id: 'tecnologia', name: 'Tecnología e Informática', backend: 'technology' }
    ],
    'media_tecnica': [
        { id: 'sistemas', name: 'Sistemas', backend: 'technology' },
        { id: 'programacion', name: 'Programación', backend: 'technology' },
        { id: 'electronica', name: 'Electrónica Básica', backend: 'technology' },
        { id: 'diseno', name: 'Diseño Gráfico', backend: 'technology' },
        { id: 'robotica', name: 'Robótica Educativa', backend: 'technology' },
        { id: 'gestion', name: 'Gestión Empresarial', backend: 'aptitude' },
        { id: 'contabilidad', name: 'Contabilidad', backend: 'aptitude' },
        { id: 'agropecuaria', name: 'Agropecuaria', backend: 'pedagogy' },
        { id: 'turismo', name: 'Turismo', backend: 'pedagogy' },
        { id: 'mecanica', name: 'Mecánica', backend: 'technology' },
        { id: 'electricidad', name: 'Electricidad', backend: 'technology' }
    ],
    'transversales': [
        { id: 'ciudadania', name: 'Educación para la Ciudadanía', backend: 'citizenship' },
        { id: 'ambiental', name: 'Educación Ambiental', backend: 'pedagogy' },
        { id: 'sexual', name: 'Educación Sexual', backend: 'behavioral' },
        { id: 'digitales', name: 'Competencias Digitales', backend: 'technology' },
        { id: 'convivencia', name: 'Convivencia Escolar', backend: 'behavioral' },
        { id: 'inclusion', name: 'Inclusión y Diversidad', backend: 'pedagogy' },
        { id: 'evaluacion', name: 'Evaluación Formativa', backend: 'pedagogy' },
        { id: 'proyecto_vida', name: 'Proyecto de Vida', backend: 'behavioral' }
    ],
    'directivo': [
        { id: 'rector', name: 'Rector / Director Rural', backend: 'pedagogy' },
        { id: 'coordinador', name: 'Coordinador', backend: 'pedagogy' }
    ],
    'orientador': [
        { id: 'orientador', name: 'Docente Orientador', backend: 'behavioral' }
    ]
};

function openProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.style.display = 'flex'; // Flex to center with new CSS
        resetToLevel();
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
}

// Resources Modal Logic
function openResourcesModal() {
    const modal = document.getElementById('resources-modal');
    if (modal) modal.style.display = 'flex';
}

function closeResourcesModal() {
    const modal = document.getElementById('resources-modal');
    if (modal) modal.style.display = 'none';
}

function selectLevel(level) {
    selectedLevel = level;
    const subjects = subjectsDB[level];

    // Highlight selected level
    document.querySelectorAll('.level-grid .selection-btn').forEach(btn => {
        btn.classList.remove('selected');
        // Simple check based on onclick attribute text or we can just pass 'this'
        if (btn.getAttribute('onclick').includes(`'${level}'`)) {
            btn.classList.add('selected');
        }
    });

    renderSubjects(subjects);

    // Ensure subject section is visible
    const subjectStep = document.getElementById('step-subject');
    subjectStep.style.display = 'block';

    // Smooth scroll to subject section
    subjectStep.scrollIntoView({ behavior: 'smooth' });
}

function resetToLevel() {
    // Optional: Clear selection if needed, or just hide subjects
    document.getElementById('step-subject').style.display = 'none';
    document.querySelectorAll('.level-grid .selection-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function renderSubjects(list) {
    const container = document.getElementById('subject-options');
    container.innerHTML = '';

    list.forEach(sub => {
        const btn = document.createElement('div');
        btn.className = 'selection-btn';
        // Pass both ID and mapped Backend Category
        btn.onclick = () => startRealExam(sub.id, sub.backend);

        // Better icons mapping based on ID simple check
        let icon = '📘';
        if (sub.id.includes('matem') || sub.id.includes('contabilidad')) icon = '📐';
        if (sub.id.includes('tecnol') || sub.id.includes('sistemas') || sub.id.includes('robotica')) icon = '💻';
        if (sub.id.includes('natural') || sub.id.includes('biolo') || sub.id.includes('fisica') || sub.id.includes('quimica')) icon = '🔬';
        if (sub.id.includes('social') || sub.id.includes('filosofia') || sub.id.includes('ciudadan')) icon = '🌍';
        if (sub.id.includes('artistic') || sub.id.includes('estetica') || sub.id.includes('diseno')) icon = '🎨';
        if (sub.id.includes('etica') || sub.id.includes('religion') || sub.id.includes('convivencia')) icon = '🤝';
        if (sub.id.includes('ingles') || sub.id.includes('lengua')) icon = '🗣️';
        if (sub.id.includes('fisica_') || sub.id.includes('deportes')) icon = '⚽';

        btn.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span> ${sub.name}`;

        container.appendChild(btn);
    });
}

function startRealExam(profileId, backendCategory) {
    localStorage.setItem('selectedCategory', 'real');
    localStorage.setItem('selectedProfile', profileId);
    // Use the mapped backend category for the API call
    localStorage.setItem('backendMap', backendCategory || 'pedagogy');
    window.location.href = 'quiz.html';
}

// Override existing startQuiz
window.startQuiz = function (category) {
    if (category === 'real') {
        openProfileModal();
    } else {
        localStorage.setItem('selectedCategory', category);
        localStorage.removeItem('selectedProfile');
        window.location.href = 'quiz.html';
    }
}

async function loadQuestions() {
    try {
        console.log(`Fetching questions for: ${currentCategory}`);

        // CNSC Requirement: 80-100 questions for real exam
        let limit = 20;
        if (currentCategory === 'real') limit = 100;

        let url = `${API_URL}?limit=${limit}`;
        const profile = localStorage.getItem('selectedProfile');

        if (currentCategory === 'real') {
            const mappedProfile = localStorage.getItem('backendMap') || localStorage.getItem('selectedProfile');
            url += `&mode=real`;
            if (mappedProfile) url += `&profile=${mappedProfile}`;
            if (profile) url += `&profile=${profile}`;

            const profileText = localStorage.getItem('selectedProfile') || 'General';
            categoryTitle.innerText = `Simulacro Tipo Examen (${profileText}) - 100 Preguntas`;
        } else {
            url += `?area=${currentCategory}&limit=20`;
            categoryTitle.textContent = formatCategoryName(currentCategory);
        }

        const res = await fetch(url);

        if (!res.ok) throw new Error('Failed to fetch from API');

        const data = await res.json();

        if (data && data.length > 0) {
            currentQuestions = mapMongoQuestions(data);
            startTimer();
            updateUI();
        } else {
            console.warn("MongoDB returned empty. Falling back.");
            loadLocalQuestions();
        }

    } catch (err) {
        console.warn("API Error, falling back to local mode:", err);
        loadLocalQuestions();
    }
}

function mapMongoQuestions(mongoData) {
    return mongoData.map(q => ({
        id: q._id,
        question: q.text,
        options: q.options,
        answer: q.answerIndex,
        explanation: q.explanation,
        context: q.context,
        category: q.area
    }));
}

function loadLocalQuestions() {
    if (typeof questionsDB === 'undefined') {
        alert("Error: No se pudo conectar a la base de datos y no hay datos locales.");
        return;
    }

    currentQuestions = questionsDB.filter(q => q.category === currentCategory);

    if (currentQuestions.length === 0 || currentCategory === 'real') {
        currentQuestions = questionsDB;
    }

    currentQuestions = currentQuestions.sort(() => Math.random() - 0.5);

    categoryTitle.textContent = formatCategoryName(currentCategory) + " (Modo Offline)";

    startTimer();
    updateUI();
}

function formatCategoryName(slug) {
    const names = {
        'pedagogia': 'Pedagogía y Legislación',
        'aptitud_numerica': 'Aptitud Numérica',
        'lectura_critica': 'Lectura Crítica',
        'ciudadanas': 'Competencias Ciudadanas',
        'tecnologia': 'Tecnología e Informática',
        'filosofia': 'Filosofía'
    };
    return names[slug] || 'Simulacro General';
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateUI() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];

    // Reset contents
    explanationBox.classList.remove('visible');
    nextBtn.style.display = 'none';
    nextBtn.disabled = true;
    nextBtn.textContent = "Siguiente Pregunta";
    nextBtn.onclick = nextQuestion;

    questionText.textContent = q.question;

    if (q.context) {
        contextText.style.display = 'block';
        contextText.textContent = q.context;
    } else {
        contextText.style.display = 'none';
    }

    progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${currentQuestions.length}`;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, btnElement) {
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.style.pointerEvents = 'none');

    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;

    if (isCorrect) {
        btnElement.style.background = '#d4edda';
        btnElement.style.borderColor = '#28a745';
        score++;
    } else {
        btnElement.style.background = '#f8d7da';
        btnElement.style.borderColor = '#dc3545';
        allOptions[q.answer].style.background = '#d4edda';
        allOptions[q.answer].style.borderColor = '#28a745';
    }

    if (q.explanation) {
        explanationText.textContent = q.explanation;
        explanationBox.classList.add('visible');
    }

    nextBtn.style.display = 'inline-block';
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    updateUI();
}

function showResults() {
    clearInterval(timerInterval);
    quizInterface.style.display = 'none';
    resultsContainer.style.display = 'block';

    const percentage = Math.round((score / currentQuestions.length) * 100);
    document.getElementById('final-score').textContent = `${score} / ${currentQuestions.length}`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;

    let msg = "";
    if (percentage >= 80) msg = "¡Excelente trabajo! Estás muy bien preparado.";
    else if (percentage >= 60) msg = "Buen trabajo, pero sigue repasando.";
    else msg = "Necesitas reforzar tus conocimientos.";

    document.getElementById('final-message').textContent = msg;
}

function restartQuiz() {
    window.location.href = 'index.html';
}
