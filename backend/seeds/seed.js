const mongoose = require('mongoose');
const Question = require('../models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/concurso_docente';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🌱 Connected to DB for Seeding');
        seedDB();
    })
    .catch(err => console.log(err));

/*
    ESTRUCTURA CNSC:
    1. FUNCIONAL (Evaluación, Didáctica, Aula, Currículo) - ~50 preguntas
    2. ÁREA ESPECÍFICA (Tecnología e Informática) - ~20 preguntas
    3. COMPORTAMENTAL (Ética, Trabajo en Equipo) - ~30 preguntas
    TOTAL: ~100 Preguntas
*/

const questions = [
    // =========================================================================
    // COMPONENTE FUNCIONAL: PEDAGOGÍA, AULA Y CURRÍCULO (SITUACIONALES)
    // =========================================================================
    {
        text: "Un docente de primaria nota que sus estudiantes tienen dificultades para comprender el concepto de fotosíntesis mediante la lectura del texto guía. Al planear su próxima clase, la estrategia didáctica más pertinente para atender la diversidad de estilos de aprendizaje sería:",
        options: [
            "Solicitarles que transcriban el capítulo del libro al cuaderno para reforzar la lectura.",
            "Realizar una clase magistral explicando los pasos químicos del proceso detalladamente.",
            "Diseñar una experiencia práctica donde observen plantas reales y utilicen recursos visuales y esquemas para representar el proceso.",
            "Dejarles una tarea de investigación en internet para que la traigan la próxima clase."
        ],
        answerIndex: 2,
        component: "functional",
        area: "pedagogy",
        explanation: "Responde a la diversidad y aprendizaje activo (Situación de aula / Didáctica)."
    },
    {
        text: "Al finalizar el segundo periodo, un docente identifica que el 40% de los estudiantes no alcanzó los logros propuestos en matemáticas. Según el enfoque de evaluación formativa y el Decreto 1290, la acción correcta es:",
        options: [
            "Continuar con el plan de estudios para no atrasarse en los temas del tercer periodo.",
            "Realizar un curso de recuperación en vacaciones con costo adicional.",
            "Diseñar e implementar un plan de actividades de apoyo y superación dentro del proceso escolar para nivelar las competencias pendientes.",
            "Informar a los padres que sus hijos reprobarán el año si no estudian más."
        ],
        answerIndex: 2,
        component: "functional",
        area: "pedagogy",
        explanation: "La evaluación formativa exige acciones de mejora continua durante el proceso (Evaluación)."
    },
    {
        text: "En una institución educativa se está actualizando el Manual de Convivencia. Un grupo de padres insiste en incluir sanciones físicas para faltas graves. Usted, como docente miembro del Consejo Académico, debe:",
        options: [
            "Apoyar la propuesta si la mayoría de padres está de acuerdo.",
            "Rechazar la propuesta argumentando que la Ley de Infancia y Adolescencia prohíbe el castigo físico y que el manual debe tener enfoque pedagógico.",
            "Sugerir que se someta a votación de los estudiantes.",
            "Renunciar al Consejo para no tener problemas."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "El marco legal (Ley 1098) prevalece sobre consensos que violen derechos (Convivencia Escolar)."
    },
    {
        text: "Un estudiante con diagnóstico de TDAH (Trastorno por Déficit de Atención e Hiperactividad) interrumpe constantemente la clase. La estrategia de adaptación curricular (PIAR) más adecuada es:",
        options: [
            "Ubicarlo en la última fila para que no distraiga a los demás.",
            "Ignorar su comportamiento para no reforzarlo.",
            "Fragmentar las actividades en pasos cortos, ubicarlo cerca del docente y permitirle pausas activas controladas.",
            "Enviarlo a la psicóloga cada vez que interrumpa."
        ],
        answerIndex: 2,
        component: "functional",
        area: "pedagogy",
        explanation: "Ajuste razonable de ambiente y metodología (Atención a la diversidad/Inclusión)."
    },
    {
        text: "El rector solicita que todos los docentes articulen sus proyectos de aula con el Proyecto Educativo Institucional (PEI). Esto significa que sus planeaciones deben:",
        options: [
            "Incluir el logo del colegio en todas las guías.",
            "Tener coherencia con la Misión, Visión y Modelo Pedagógico definidos institucionalmente.",
            "Ser idénticas para todos los grados.",
            "Enfocarse únicamente en preparación para pruebas Saber."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "La articulación curricular asegura la identidad y horizonte institucional (Currículo)."
    },
    {
        text: "Durante una salida pedagógica, dos estudiantes se agreden físicamente. Según los protocolos de convivencia escolar (Ley 1620), esta situación se clasifica como:",
        options: [
            "Situación Tipo I (Conflictos manejados inadecuadamente).",
            "Situación Tipo II (Agresión física sin incapacidad).",
            "Situación Tipo III (Presunto delito).",
            "Cosa de niños."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "Agresión física, acoso escolar (bullying) y ciberacoso son Tipo II si no constituyen delito."
    },
    {
        text: "Para promover el pensamiento crítico en ciencias sociales, la estrategia evaluativa más pertinente es:",
        options: [
            "Un examen de selección múltiple sobre fechas y nombres.",
            "Un debate estructurado donde los estudiantes argumenten posturas frente a un problema social actual.",
            "Un resumen del libro de texto.",
            "Completar un mapa mudo."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "El debate desarrolla argumentación y análisis (Didáctica)."
    },
    {
        text: "Un docente asigna tareas que requieren uso de internet, pero nota que varios estudiantes viven en zonas sin conectividad. Una decisión didáctica inclusiva sería:",
        options: [
            "Mantener la tarea y decirles que vayan a un café internet.",
            "Calificarles sobre 3.0 por no tener recursos.",
            "Diversificar los medios de consulta, permitiendo uso de textos físicos, radio comunitaria o guías impresas equivalentes.",
            "Eliminar las tareas para todos."
        ],
        answerIndex: 2,
        component: "functional",
        area: "pedagogy",
        explanation: "Equidad en el acceso al aprendizaje (Inclusión)."
    },
    {
        text: "La herramienta de gestión que permite hacer seguimiento anual a las metas de cobertura, calidad y eficiencia de la institución es:",
        options: [
            "Plan de Mejoramiento Institucional (PMI).",
            "Plan de Estudios.",
            "Observador del alumno.",
            "Diario de campo."
        ],
        answerIndex: 0,
        component: "functional",
        area: "pedagogy",
        explanation: "El PMI es la herramienta de gestión directiva por excelencia."
    },
    {
        text: "En el diseño curricular, la relación horizontal entre asignaturas del mismo grado se denomina:",
        options: [
            "Secuencia.",
            "Interdisciplinariedad o transversalidad.",
            "Jerarquía.",
            "Prerrequisito."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "Conexión entre diferentes áreas en un mismo nivel."
    },
    {
        text: "Si un docente utiliza los resultados de las Pruebas Saber para ajustar su plan de área, está realizando un proceso de:",
        options: [
            "Uso pedagógico de resultados para la mejora.",
            "Entrenamiento para el examen.",
            "Cumplimiento de requisito administrativo.",
            "Ranking de estudiantes."
        ],
        answerIndex: 0,
        component: "functional",
        area: "pedagogy",
        explanation: "Ciclo de calidad: Evaluar para mejorar."
    },
    {
        text: "El 'Clima de Aula' positivo se fomenta principalmente cuando el docente:",
        options: [
            "Es amigo de los estudiantes y les permite todo.",
            "Establece normas claras, consensuadas y mantiene relaciones de respeto y empatía.",
            "Es muy estricto y nadie se atreve a hablar.",
            "Solo se enfoca en dictar clase."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "Convivencia y autoridad pedagógica."
    },
    // ... Agregar 15 preguntas más de este tipo para fortalecer el bloque funcional ...
    {
        text: "La 'Metacognición' se refiere a la capacidad del estudiante para:",
        options: [
            "Memorizar grandes cantidades de datos.",
            "Resolver problemas matemáticos.",
            "Reflexionar sobre su propio proceso de aprendizaje y regularlo.",
            "Trabajar en grupo."
        ],
        answerIndex: 2,
        component: "functional",
        area: "pedagogy",
        explanation: "Aprender a aprender."
    },
    {
        text: "Según Vigotsky, la 'Zona de Desarrollo Próximo' es:",
        options: [
            "El lugar donde se sientan los estudiantes.",
            "La distancia entre lo que el niño puede hacer solo y lo que puede hacer con ayuda.",
            "La etapa de la adolescencia.",
            "El recreo."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "Concepto clave del constructivismo social."
    },
    {
        text: "Un indicador de logro bien redactado debe contener:",
        options: [
            "Solo el tema.",
            "La acción (verbo), el contenido y la condición de calidad/contexto.",
            "El nombre del profesor.",
            "La fecha de la clase."
        ],
        answerIndex: 1,
        component: "functional",
        area: "pedagogy",
        explanation: "Estructura de competencia."
    },
    // =========================================================================
    // COMPONENTE FUNCIONAL: ÁREA ESPECÍFICA (TECNOLOGÍA E INFORMÁTICA)
    // =========================================================================
    {
        text: "Al enseñar 'Pensamiento Computacional' en primaria sin usar computadores (Unplugged), una actividad pertinente sería:",
        options: [
            "Darles una charla sobre la historia de Windows.",
            "Jugar a 'programar' a un compañero dándole instrucciones precisas (algoritmos) para moverse en una cuadrícula.",
            "Enseñarles a limpiar un teclado.",
            "Pedirles que dibujen un computador."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Desarrolla la lógica secuencial y algorítmica sin hardware."
    },
    {
        text: "En un proyecto tecnológico escolar, la fase de 'Diseño' implica:",
        options: [
            "Comprar los materiales.",
            "Construir el prototipo inmediatamente.",
            "Representar gráficamente la idea y planificar materiales y herramientas.",
            "Vender el producto."
        ],
        answerIndex: 2,
        component: "functional",
        area: "technology",
        explanation: "Ciclo de diseño tecnológico."
    },
    {
        text: "El uso pedagógico de las TIC implica:",
        options: [
            "Llevar a los estudiantes a la sala de sistemas a jugar libremente.",
            "Usar el video beam para proyectar todo el libro de texto.",
            "Integrar herramientas digitales intencionadamente para mediar y potenciar el aprendizaje.",
            "Prohibir el celular en clase."
        ],
        answerIndex: 2,
        component: "functional",
        area: "technology",
        explanation: "Las TIC como medio, no como fin."
    },
    {
        text: "Un estudiante crea un blog publicando fotos de sus compañeros sin permiso y haciendo burlas. Como docente de informática, su primera acción formativa debe abordar:",
        options: [
            "La técnica de creación de blogs.",
            "La Ciudadanía Digital y el respeto a la intimidad y derechos de autor.",
            "La ortografía del blog.",
            "Cancelar el internet del colegio."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Ética y responsabilidad en la red."
    },
    {
        text: "La diferencia principal entre Tecnología y Técnica es:",
        options: [
            "No hay diferencia.",
            "La técnica es el saber hacer procedimental; la tecnología involucra el saber por qué y la innovación para resolver problemas.",
            "La tecnología es moderna y la técnica es antigua.",
            "La técnica es teórica."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Concepto epistemológico del área."
    },
    {
        text: "Para enseñar el funcionamiento de un motor de búsqueda a estudiantes de secundaria, la mejor analogía sería:",
        options: [
            "Un libro con índice.",
            "Una biblioteca gigante donde un bibliotecario (algoritmo) organiza y recupera información indexada.",
            "Un televisor.",
            "Un cerebro humano."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Didáctica específica del área."
    },
    {
        text: "El concepto de 'Obsolescencia Programada' se refiere a:",
        options: [
            "Un programa mal hecho.",
            "La planificación del fin de la vida útil de un producto para incentivar el consumo.",
            "Los virus informáticos.",
            "El reciclaje tecnológico."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Impacto social y ambiental de la tecnología."
    },
    {
        text: "En una red de computadores, el protocolo DHCP se encarga de:",
        options: [
            "Proteger contra virus.",
            "Asignar direcciones IP dinámicas automáticamente.",
            "Mostrar páginas web.",
            "Enviar correos."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Conocimiento técnico específico."
    },
    {
        text: "La herramienta Moodle se clasifica como:",
        options: [
            "Una red social.",
            "Un LMS (Learning Management System) o plataforma de gestión de aprendizaje.",
            "Un editor de video.",
            "Un navegador."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Herramientas TIC educativas."
    },
    {
        text: "¿Cuál es la estructura básica de control en programación que permite tomar decisiones (Si... entonces...)?",
        options: [
            "Ciclo For.",
            "Condicional (If/Else).",
            "Variable.",
            "Array."
        ],
        answerIndex: 1,
        component: "functional",
        area: "technology",
        explanation: "Lógica de programación."
    },
    // ... Más preguntas técnicas ...

    // =========================================================================
    // COMPONENTE 3: COMPORTAMENTAL (SITUACIONAL)
    // =========================================================================
    {
        text: "Usted es citado a una reunión de padres fuera de su horario laboral. Su respuesta es:",
        options: [
            "No asistir y apagar el celular.",
            "Asistir para no tener problemas con el rector.",
            "Manifestar su disposición, pero solicitar respetuosamente concertar la cita dentro de la jornada laboral establecida legalmente.",
            "Cobrar horas extras a los padres."
        ],
        answerIndex: 2,
        component: "behavioral",
        area: "global",
        explanation: "Asertividad y respeto a normas laborales."
    },
    {
        text: "Identifica que un estudiante talentoso se aburre en su clase porque termina muy rápido. Usted:",
        options: [
            "Le dice que espere callado.",
            "Lo pone a ayudar a calificar exámenes.",
            "Diseña actividades de profundización o reto adicional para mantener su motivación (flexibilización).",
            "Le dice que adelante tareas de otras materias."
        ],
        answerIndex: 2,
        component: "behavioral",
        area: "global",
        explanation: "Compromiso con la calidad y atención al talento."
    },
    {
        text: "Un compañero docente hace comentarios discriminatorios en la sala de profesores. Usted:",
        options: [
            "Se ríe para no caer mal.",
            "Se queda callado.",
            "Expresa su desacuerdo con respeto, señalando que esos comentarios no son coherentes con los valores institucionales.",
            "Lo insulta."
        ],
        answerIndex: 2,
        component: "behavioral",
        area: "global",
        explanation: "Ética y defensa de DDHH."
    },
    {
        text: "Al recibir un equipo tecnológico nuevo en el colegio, nadie sabe usarlo. Usted:",
        options: [
            "Lo guarda bajo llave para que no se dañe.",
            "Toma la iniciativa de auto-capacitarse y luego multiplicar el conocimiento con sus colegas.",
            "Espera a que el ministerio mande un capacitador el próximo año.",
            "Dice que eso no sirve."
        ],
        answerIndex: 1,
        component: "behavioral",
        area: "global",
        explanation: "Proactividad y aprendizaje continuo."
    },
    {
        text: "Durante una discusión acalorada en el Consejo Académico, el rector impone una decisión arbitraria. Usted:",
        options: [
            "Grita que es un dictador.",
            "Se levanta y se va.",
            "Deja constancia en el acta de su voto disidente y los argumentos legales/pedagógicos por los cuales no está de acuerdo.",
            "Acepta en silencio."
        ],
        answerIndex: 2,
        component: "behavioral",
        area: "global",
        explanation: "Manejo de conflictos y uso de canales formales."
    },
    {
        text: "Un acudiente le trae un regalo personal 'para que le ayude' a su hijo. Usted:",
        options: [
            "Lo acepta y agradece.",
            "Lo rechaza explicando amablemente que su ética no le permite recibir dádivas y que la evaluación es objetiva.",
            "Lo recibe pero no ayuda al niño.",
            "Le pide algo más caro."
        ],
        answerIndex: 1,
        component: "behavioral",
        area: "global",
        explanation: "Transparencia."
    }
];

const seedDB = async () => {
    try {
        await Question.deleteMany({});
        console.log('🧹 Old data cleared');
        await Question.insertMany(questions);
        console.log(`✅ Seeded ${questions.length} questions correctly following CNSC structure.`);
        mongoose.connection.close();
    } catch (e) {
        console.log(e);
    }
};
