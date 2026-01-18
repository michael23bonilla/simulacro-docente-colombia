const questionsDB = [
    // === PEDAGOGIA y LEGISLACIÓN ===
    {
        id: 1,
        category: 'pedagogia',
        context: "Un docente, tras finalizar el año lectivo, realiza un análisis exhaustivo de los resultados institucionales y nota que la estructura actual del plan de estudios limita el desarrollo de habilidades críticas en los estudiantes.",
        question: "Para sustentar la necesidad de la reforma ante el comité, el argumento más sólido relacionado con el dominio curricular es:",
        options: [
            "Argumentar la modificación del plan de estudios demostrando que los recursos didácticos actuales resultan insuficientes.",
            "Sustentar la actualización curricular evidenciando la desarticulación entre propósitos institucionales y referentes de calidad nacionales.",
            "Justificar los cambios señalando que las temáticas actuales generan desmotivación."
        ],
        answer: 1,
        explanation: "La opción B es la correcta porque alinea el horizonte institucional (PEI) con los estándares nacionales, garantizando pertinencia y legalidad."
    },
    {
        id: 2,
        category: 'pedagogia',
        context: "Un estudiante presenta dificultades sistemáticas en el cumplimiento de las normas de convivencia del aula, distrayendo a sus compañeros.",
        question: "¿Cuál es la primera acción que debe tomar el docente según el debido proceso disciplinario escolar?",
        options: [
            "Remitir inmediatamente al estudiante a coordinación de disciplina para una sanción ejemplarizante.",
            "Dialogar con el estudiante para identificar las causas de su comportamiento y establecer compromisos pedagógicos.",
            "Citar a los padres de familia para advertirles sobre la posible expulsión del estudiante."
        ],
        answer: 1,
        explanation: "El debido proceso y el enfoque formativo del manual de convivencia exigen agotar el diálogo y los compromisos pedagógicos antes de escalar a instancias sancionatorias."
    },
    {
        id: 3,
        category: 'pedagogia',
        context: "En una institución educativa se busca implementar el modelo pedagógico constructivista.",
        question: "¿Qué rol debe asumir el docente principalmente en este modelo?",
        options: [
            "Transmisor de conocimientos acabados y verdades absolutas.",
            "Facilitador y orientador que crea desequilibrios cognitivos para que el estudiante construya su saber.",
            "Evaluador estricto que mide la memorización de los contenidos dictados en clase."
        ],
        answer: 1,
        explanation: "En el constructivismo, el docente es un guía que facilita el aprendizaje, no el centro del conocimiento."
    },

    // === APTITUD NUMÉRICA ===
    {
        id: 10,
        category: 'aptitud_numerica',
        question: "Si 3 trabajadores construyen un muro en 12 horas, ¿cuánto tardarán 9 trabajadores en construir el mismo muro?",
        options: ["36 horas", "4 horas", "3 horas", "9 horas"],
        answer: 1,
        explanation: "Regla de tres inversa: (3 trabajadores * 12 horas) = 36 horas de trabajo total. 36 / 9 trabajadores = 4 horas."
    },
    {
        id: 11,
        category: 'aptitud_numerica',
        question: "En un curso de 40 estudiantes, el 60% son mujeres. ¿Cuántos hombres hay en el curso?",
        options: ["16", "20", "24", "12"],
        answer: 0,
        explanation: "Mujeres = 60%, Hombres = 40%. 40% de 40 = 0.4 * 40 = 16."
    },
    {
        id: 12,
        category: 'aptitud_numerica',
        question: "La edad de Juan es el doble que la de pedro, y ambas suman 36 años. ¿Qué edad tiene Juan?",
        options: ["12", "24", "18", "30"],
        answer: 1,
        explanation: "J = 2P. J + P = 36. Sustituyendo: 2P + P = 36 -> 3P = 36 -> P = 12. Juan tiene 2 * 12 = 24."
    },
    {
        id: 13,
        category: 'aptitud_numerica',
        question: "Un artículo cuesta $120.000. Si se le aplica un descuento del 20% y luego un aumento del 10% sobre el nuevo precio, ¿cuál es el precio final?",
        options: ["$105.600", "$108.000", "$100.000", "$110.000"],
        answer: 0,
        explanation: "Descuento 20%: 120.000 * 0.8 = 96.000. Aumento 10%: 96.000 * 1.1 = 105.600."
    },

    // === LECTURA CRÍTICA ===
    {
        id: 20,
        category: 'lectura_critica',
        context: "La lectura crítica implica no solo decodificar el texto, sino entender su propósito, la intención del autor y el contexto.",
        question: "¿Cuál es el propósito principal de un texto argumentativo?",
        options: [
            "Narrar una historia ficticia.",
            "Describir detalladamente un objeto o lugar.",
            "Convencer o persuadir al lector sobre una tesis.",
            "Explicar un fenómeno natural."
        ],
        answer: 2,
        explanation: "El texto argumentativo tiene como fin principal persuadir al lector mediante argumentos."
    },
    {
        id: 21,
        category: 'lectura_critica',
        context: "Fragmento: 'Llegó el momento de que la humanidad entienda que los recursos no son infinitos...'",
        question: "En el texto, la expresión 'recursos no son infinitos' implica una crítica hacia:",
        options: [
            "El modelo de consumo desmedido.",
            "La falta de tecnología.",
            "La sobrepoblación mundial exclusivamente.",
            "La política educativa."
        ],
        answer: 0,
        explanation: "Sugiere que el uso actual de recursos es insostenible, criticando el consumo."
    },

    // === COMPETENCIAS CIUDADANAS ===
    {
        id: 30,
        category: 'ciudadanas',
        question: "¿Cuál de los siguientes es un mecanismo de participación ciudadana en Colombia para reformar la Constitución?",
        options: ["El Voto", "El Referendo", "El Cabildo Abierto", "La Tutela"],
        answer: 1,
        explanation: "El Referendo es el mecanismo mediante el cual el pueblo aprueba o rechaza un proyecto de norma jurídica o deroga una norma ya vigente, incluyendo reformas constitucionales."
    },
    {
        id: 31,
        category: 'ciudadanas',
        context: "Un alcalde decide prohibir el libre tránsito de ciudadanos por una plaza pública porque 'se ve fea con tanta gente'.",
        question: "¿Qué derecho fundamental está vulnerando principalmente?",
        options: ["Derecho a la salud", "Derecho a la libre circulación", "Derecho al trabajo", "Derecho a la educación"],
        answer: 1,
        explanation: "La Constitución garantiza la libre circulación por el territorio nacional (Art. 24), salvo limitaciones legales razonables, no estéticas."
    },

    // === FILOSOFÍA ===
    {
        id: 40,
        category: 'filosofia',
        question: "Para Platón, el mundo sensible es solo una copia imperfecta del mundo de las:",
        options: ["Sombras", "Ideas", "Matemáticas", "Opiniones"],
        answer: 1,
        explanation: "En la teoría de las Ideas de Platón, el mundo real y perfecto es el Mundo de las Ideas (Topos Uranos)."
    },
    {
        id: 41,
        category: 'filosofia',
        question: "¿Qué filósofo es conocido por la frase 'Pienso, luego existo' (Cogito, ergo sum)?",
        options: ["Aristóteles", "Nietzsche", "Descartes", "Kant"],
        answer: 2,
        explanation: "René Descartes formuló esta sentencia como primer principio de su filosofía racionalista."
    },

    // === TECNOLOGÍA E INFORMÁTICA ===
    {
        id: 50,
        category: 'tecnologia',
        question: "¿Cuál es la función principal de un Sistema Operativo?",
        options: [
            "Procesar textos y realizar hojas de cálculo.",
            "Administrar los recursos de hardware y software del computador.",
            "Navegar por internet a alta velocidad.",
            "Diseñar gráficos vectoriales."
        ],
        answer: 1,
        explanation: "El SO gestiona la memoria, procesos y dispositivos para que otros programas puedan funcionar."
    },
    {
        id: 51,
        category: 'tecnologia',
        question: "En el pensamiento computacional, la descomposición consiste en:",
        options: [
            "Romper el computador para ver sus partes.",
            "Dividir un problema complejo en partes más pequeñas y manejables.",
            "Eliminar los virus del sistema.",
            "Escribir código binario."
        ],
        answer: 1,
        explanation: "Descomponer es una habilidad clave para solucionar problemas grandes dividiéndolos en sub-problemas."
    },
    {
        id: 52,
        category: 'tecnologia',
        question: "¿Qué significa el acrónimo TIC en el contexto educativo?",
        options: [
            "Técnicas de Inteligencia Computacional",
            "Tecnologías de la Información y la Comunicación",
            "Trabajos de Investigación Científica",
            "Tratado de Interconexión Continental"
        ],
        answer: 1,
        explanation: "TIC se refiere a las Tecnologías de la Información y la Comunicación."
    }
];
