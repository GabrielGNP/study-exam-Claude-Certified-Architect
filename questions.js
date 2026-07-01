/* ARCHIVO GENERADO AUTOMATICAMENTE por build-questions.py. NO editar a mano. */
/* Fuente de verdad: study-question-bank.json */
window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["es"] = {
 "title": "Banco de Preguntas de Estudio de Claude Code",
 "description": "Multiple-choice study bank for Claude Code and Claude development workflows.",
 "language": "en",
 "topics": [
  {
   "id": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 1,
   "title": "Claude Code para Integración Continua",
   "questionCount": 30
  },
  {
   "id": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 2,
   "title": "Sistema de Investigación Multi-Agente",
   "questionCount": 30
  },
  {
   "id": "01KT81BA4J2675N47R42Q4C716",
   "order": 3,
   "title": "Productividad del Desarrollador con Claude",
   "questionCount": 30
  },
  {
   "id": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 4,
   "title": "Generación de Código con Claude Code",
   "questionCount": 30
  }
 ],
 "questions": [
  {
   "id": "01KT81N3RTZKP46GW353B7QPQA",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "La revisión automatizada marca sistemáticamente patrones que tu equipo usa de forma intencional: force-unwrapping de opcionales en archivos de prueba, uso de clases coordinadoras grandes que siguen tu arquitectura establecida, e importación de módulos internos marcados como deprecated en el SDK público. Los desarrolladores descartan aproximadamente el 30% de todos los hallazgos como falsos positivos específicos del proyecto. ¿Qué enfoque evita que el modelo genere estos hallazgos desde el inicio, al proporcionar las convenciones del proyecto como contexto persistente en cada revisión?",
   "options": [
    {
     "key": "A",
     "text": "Construir filtros de palabras clave en post-procesamiento que supriman hallazgos que contengan términos como 'force unwrap', 'large class' o 'deprecated import' antes de que los resultados lleguen a los desarrolladores."
    },
    {
     "key": "B",
     "text": "Hacer que los desarrolladores agreguen comentarios de supresión en línea en las líneas marcadas y preprocesar los diffs para excluir las líneas suprimidas antes de enviar el código al modelo."
    },
    {
     "key": "C",
     "text": "Configurar la revisión para analizar solo las líneas modificadas en el diff sin el contexto del archivo circundante, reduciendo la cantidad de código que el modelo evalúa por revisión."
    },
    {
     "key": "D",
     "text": "Documentar los patrones aceptados y las convenciones intencionales del equipo en el archivo CLAUDE.md del proyecto, para que el modelo reciba este contexto en cada revisión."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "`CLAUDE.md` es el mecanismo a nivel de proyecto para proporcionar a Claude Code contexto persistente, como convenciones de codificación, criterios de revisión, estándares de prueba y patrones arquitectónicos aceptados. Como el problema es que el modelo marca repetidamente decisiones intencionales específicas del proyecto, la solución correcta es proporcionar esas convenciones antes de que se genere la revisión. Los filtros de palabras clave, los comentarios de supresión o la reducción de contexto solo ocultan o limitan los hallazgos después de que el modelo ya ha malinterpretado el proyecto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RT20D62GS0H9NAYG9G",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tras implementar la revisión automatizada, notas alta precisión pero bajo recall: los bugs reales pasan desapercibidos. La investigación revela que tu prompt de revisión le indica a Claude que 'solo reporte problemas de alta confianza de los que esté seguro' y que 'erre del lado de no comentar'. Los desarrolladores aprecian el bajo ruido, pero una race condition que causó una interrupción en producción era visible en un PR revisado y no fue reportada. Necesitas mejorar sustancialmente la detección de bugs manteniendo las tasas de falsos positivos manejables para tu equipo. ¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Agregar ejemplos few-shot detallados que demuestren las categorías de bugs que Claude debería marcar —race conditions, null dereferences, brechas en el manejo de errores— manteniendo la instrucción de filtrado de alta confianza para preservar los niveles actuales de precisión."
    },
    {
     "key": "B",
     "text": "Ampliar la ventana de contexto incluyendo archivos de prueba relacionados, historial de git reciente y el grafo de dependencias del módulo junto con el diff, dando a Claude señales más ricas para evaluar la severidad de los problemas."
    },
    {
     "key": "C",
     "text": "Dividir la revisión en una etapa de hallazgos donde el objetivo de Claude es la cobertura —marcando cada problema potencial con metadata de confianza y severidad— y una etapa separada que filtra esos hallazgos."
    },
    {
     "key": "D",
     "text": "Eliminar las instrucciones de filtrado conservadoras y pedirle a Claude que reporte todos los problemas potenciales, luego aplicar un filtro programático para deduplicar y suprimir las categorías que históricamente generan falsos positivos."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El prompt actual suprime problemas reales porque optimiza demasiado agresivamente para la certeza. Una revisión en dos etapas separa el recall de la publicación: primero, Claude identifica problemas potenciales de manera amplia y adjunta metadata estructurada de confianza y severidad; luego, un paso de umbral separado decide qué llega a los desarrolladores. Esto preserva la visibilidad de bugs graves como las race conditions, mientras gestiona los falsos positivos. Mantener la instrucción de alta confianza continuaría perdiendo bugs, y simplemente agregar más contexto o filtros post-procesamiento no resuelve directamente el problema de recall."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTXEKM0BV2S96564Q5",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revisión automatizada genera muchos hallazgos por PR, pero el feedback de los desarrolladores indica que aproximadamente la mitad se descartan como 'no vale la pena abordar'. El análisis revela que los hallazgos descartados suelen ser técnicamente precisos pero involucran preferencias de estilo menores o patrones aceptables en tu codebase. Antes de agregar complejidad de infraestructura, ¿qué cambio en el diseño del prompt reduciría más efectivamente los descartes manteniendo la detección de problemas reales?",
   "options": [
    {
     "key": "A",
     "text": "Agregar instrucciones pidiéndole a Claude que califique la confianza de cada hallazgo (1-10) e incluir solo los hallazgos con calificación 8 o superior"
    },
    {
     "key": "B",
     "text": "Implementar un modelo de clasificación secundario que filtre los hallazgos de Claude basándose en la aceptación predicha por los desarrolladores"
    },
    {
     "key": "C",
     "text": "Agregar criterios explícitos que definan qué problemas reportar (bugs, seguridad) versus cuáles omitir (estilo menor, patrones locales)"
    },
    {
     "key": "D",
     "text": "Agregar instrucciones para 'reportar solo los hallazgos de los que estés muy seguro de que son problemas reales'"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Los hallazgos descartados no son necesariamente incorrectos; simplemente son de bajo valor para esta codebase. El mejor cambio de prompt es definir categorías claras de qué debe reportarse y qué debe omitirse, como reportar bugs y problemas de seguridad mientras se excluyen preferencias de estilo menores o patrones locales aceptados. Las instrucciones basadas en confianza son demasiado vagas y pueden suprimir problemas importantes, mientras que agregar otro modelo introduce infraestructura innecesaria antes de corregir los criterios del prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTJSPDS2TFG4K2BJAJ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revisor automatizado usa un único prompt que cubre problemas de seguridad, diseño de API y corrección de lógica de negocio. Tu suite de evaluación muestra alto recall para hallazgos de diseño de API (82%) pero bajo recall para casos extremos de lógica de negocio en el puntaje de quizzes (34%). Cuando agregas ejemplos few-shot de bugs de lógica al prompt, el recall de lógica mejora al 41% pero el recall de diseño de API cae al 68%. ¿Cómo deberías abordar este trade-off para mejorar la detección en ambas categorías?",
   "options": [
    {
     "key": "A",
     "text": "Reemplazar los ejemplos few-shot por un checklist detallado de casos extremos de lógica específicos a verificar, como división por cero en cálculos de puntaje y condiciones de límite en umbrales de calificación."
    },
    {
     "key": "B",
     "text": "Dividir la revisión en prompts separados y enfocados —uno para seguridad y diseño de API, otro para lógica de negocio— cada uno con ejemplos dedicados, y luego consolidar los hallazgos antes de publicarlos."
    },
    {
     "key": "C",
     "text": "Actualizar a un tier de modelo más potente, ya que su razonamiento más sólido manejará ambos tipos de preocupaciones en un único prompt y eliminará el trade-off de recall."
    },
    {
     "key": "D",
     "text": "Proporcionar el repositorio completo como contexto en lugar de solo los archivos modificados y el código circundante, dando al modelo mayor visibilidad sobre los patrones de lógica de negocio."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La evaluación muestra interferencia entre prompts: agregar ejemplos para una preocupación mejora el recall de lógica de negocio pero perjudica el recall de diseño de API. Dividir la revisión en pasadas enfocadas permite que cada prompt use criterios y ejemplos adaptados a su categoría, y luego consolidar los resultados para los desarrolladores. Un checklist puede ayudar con los bugs de lógica pero no aborda la regresión en el diseño de API, y una actualización del modelo o más contexto del repositorio no resuelve directamente el conflicto creado al combinar objetivos de revisión distintos en un único prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTEZJKR5AZKKPH66C8",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu pipeline incluye un paso de generación de notas de versión que clasifica y resume aproximadamente 200 commits al final de cada ciclo semanal de release. Actualmente, cada commit se envía como una llamada separada a la Messages API usando un modelo Claude de tier Sonnet. Las notas de versión no se necesitan hasta la mañana siguiente (los resultados tienen ~12 horas de latencia aceptable). Tu equipo necesita reducir el costo de API por token para este paso manteniendo el mismo modelo y prompts (sin cambios en el tier del modelo ni en la calidad del output). ¿Qué enfoque satisface todas estas restricciones?",
   "options": [
    {
     "key": "A",
     "text": "Emitir las 200 solicitudes de la Messages API en paralelo usando conexiones concurrentes, ya que la concurrencia reduce el precio por token que cobra la API."
    },
    {
     "key": "B",
     "text": "Cambiar las llamadas de resumen del modelo de tier Sonnet al modelo de tier Haiku para aprovechar las tarifas por token más bajas de Haiku."
    },
    {
     "key": "C",
     "text": "Concatenar los 200 mensajes de commit en una única solicitud de la Messages API y hacer que el modelo devuelva todos los resúmenes en una respuesta, ya que menos solicitudes siempre reduce el costo total de tokens."
    },
    {
     "key": "D",
     "text": "Enviar las 200 solicitudes a la Message Batches API con custom_ids únicos y recuperar los resultados una vez que termine el batch, lo que aplica un descuento del 50% a todos los tokens de entrada y salida."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Esta carga de trabajo tolera la latencia y no requiere resultados hasta la mañana siguiente, por lo que se adapta al procesamiento por lotes. La Message Batches API mantiene el mismo modelo y prompts mientras reduce el costo de tokens de entrada y salida, y los valores de `custom_id` permiten correlacionar el resultado de cada commit después del procesamiento. Las llamadas paralelas a la Messages API no reducen el precio por token, cambiar a Haiku viola el requisito de mismo modelo, y concatenar todos los commits cambia la estructura del prompt y puede perjudicar la correlación o la calidad del output."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVYXJMRQ62M326SB42",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revisión de código automatizada está perdiendo bugs reales en pull requests. La investigación revela que tu prompt de revisión incluye la instrucción: 'Solo marcar problemas críticos que definitivamente causarían fallos en producción. Ignorar preocupaciones menores y cualquier cosa de la que no estés seguro.' Los desarrolladores confirman que algunos bugs perdidos son errores lógicos reales que el modelo investigó pero decidió no reportar. El equipo requiere que el output de la revisión permanezca estructurado (cada hallazgo etiquetado con metadata) y accionable. ¿Qué cambio en el prompt elimina la causa de los hallazgos suprimidos y preserva el output estructurado y etiquetado para el filtrado posterior?",
   "options": [
    {
     "key": "A",
     "text": "Agregar una segunda pasada de revisión que vuelva a leer el diff usando el mismo prompt, buscando cualquier cosa que la primera pasada pueda haber omitido."
    },
    {
     "key": "B",
     "text": "Instruir al modelo para que reporte todos los hallazgos con un nivel de confianza y una etiqueta de severidad, dejando el filtrado para un paso posterior."
    },
    {
     "key": "C",
     "text": "Eliminar todas las instrucciones relacionadas con severidad del prompt y dejar que el modelo use su criterio predeterminado sobre qué reportar."
    },
    {
     "key": "D",
     "text": "Habilitar el extended thinking e instruir al modelo para que razone paso a paso sobre cada cambio de código antes de producir su revisión."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Los bugs perdidos son causados por una instrucción que le indica al modelo no reportar nada incierto o por debajo de un umbral de severidad muy alto. Pedir todos los hallazgos con metadata de confianza y severidad elimina esa supresión mientras preserva el output estructurado para el filtrado posterior. Volver a ejecutar el mismo prompt conservador repetiría el mismo modo de fallo, eliminar toda la guía de severidad reduciría la estructura, y el extended thinking no aborda la instrucción que le indica al modelo retener hallazgos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RV6GH7MHTX84DBR863",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tras implementar la revisión de código automatizada, los desarrolladores reportan que aproximadamente el 35% de los hallazgos marcados son falsos positivos que siguen patrones consistentes: sugerencias de estilo que contradicen las convenciones del equipo, advertencias de seguridad para patrones seguros en tu contexto de despliegue, y sugerencias de rendimiento que degradarían tu caso de uso específico. Quieres reducir los falsos positivos manteniendo la capacidad de detectar problemas reales. ¿Qué enfoque permite mejor al modelo generalizar su criterio a patrones de código nuevos que no ha visto antes?",
   "options": [
    {
     "key": "A",
     "text": "Incluir ejemplos few-shot en tu prompt mostrando fragmentos de código anotados que distingan los patrones aceptables de los problemas reales en cada categoría."
    },
    {
     "key": "B",
     "text": "Crear una especificación escrita completa de todos los patrones que no deben marcarse, luego incluir esta documentación completa en el system prompt."
    },
    {
     "key": "C",
     "text": "Implementar post-procesamiento que use coincidencia de palabras clave para filtrar hallazgos que contengan términos como 'convention', 'context-dependent' o 'trade-off'."
    },
    {
     "key": "D",
     "text": "Agregar instrucciones a tu system prompt para 'ser conservador', 'solo marcar problemas definitivos', y 'considerar que algunos patrones pueden ser intencionales'."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Los ejemplos few-shot son muy adecuados para juicios de revisión ambiguos porque muestran cómo distinguir patrones aceptables específicos del proyecto de problemas reales. Los ejemplos anotados para estilo, seguridad y rendimiento enseñan al modelo el límite de decisión subyacente para que pueda generalizar a código nuevo, en lugar de simplemente coincidir con una lista fija. Una lista de bloqueo completa es frágil, el filtrado por palabras clave ocurre demasiado tarde y puede ocultar problemas reales, y las instrucciones vagas como 'ser conservador' no proporcionan suficiente guía concreta."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVZY0BD03BKT26KNMV",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "El pipeline de revisión automatizada genera un promedio de 18 hallazgos por PR. El feedback de los desarrolladores revela tres categorías de ruido no deseado: (1) problemas de estilo y formato ya aplicados por tu linter en CI, (2) hallazgos sobre código de plantilla auto-generado bajo src/gen/, y (3) patrones de helpers de renderizado que son convenciones intencionales del proyecto pero se marcan porque se parecen a anti-patrones comunes. Solo alrededor de 4 hallazgos por PR son bugs lógicos reales. ¿Cuál es la forma más efectiva de reducir este ruido preservando la detección de problemas reales?",
   "options": [
    {
     "key": "A",
     "text": "Agregar el parámetro de prompt a la configuración de GitHub Action con instrucciones para suprimir hallazgos duplicados del linter, ignorar el código de plantilla generado, y aplicar requisitos de evidencia más estrictos para problemas relacionados con el renderizado."
    },
    {
     "key": "B",
     "text": "Agregar explicaciones detalladas al CLAUDE.md del proyecto describiendo qué patrones son intencionales, que el linting se maneja por separado en CI, y que el directorio src/gen/ contiene código de plantilla auto-generado."
    },
    {
     "key": "C",
     "text": "Crear un REVIEW.md en la raíz del repositorio con reglas de omisión para los checks aplicados por CI y los archivos generados, y un requisito de verificación de que los hallazgos relacionados con el renderizado deben citar una línea específica que demuestre comportamiento incorrecto."
    },
    {
     "key": "D",
     "text": "Configurar archivos de workflow de GitHub Action separados para cada área de código —uno para el código generado con hallazgos suprimidos, uno para el código de renderizado con instrucciones de revisión personalizadas, y un workflow general para todo lo demás."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El ruido proviene de la falta de contexto del proyecto: el modelo revisa el formato gestionado por el linter, los archivos generados y las convenciones de renderizado intencionales como si fueran defectos ordinarios. Poner esos detalles en `CLAUDE.md` proporciona a Claude Code guía persistente del proyecto durante la revisión, para que pueda evitar hallazgos de bajo valor mientras sigue detectando bugs lógicos reales. Dividir los workflows o filtrar de forma ad hoc agrega complejidad, y un parámetro de prompt puntual es menos mantenible que documentar las convenciones estables del repositorio donde Claude Code espera el contexto del proyecto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVF49N9MZKNFTKD5AZ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Durante las pruebas iniciales del pipeline de revisión automatizada, notas que las revisiones de PRs grandes (50+ archivos modificados) a veces tardan más de 20 minutos y cuestan $8-12 por ejecución debido a extensos bucles agénticos —Claude lee archivos, ejecuta herramientas de análisis e itera muchas veces. Tu equipo necesita que cada invocación se detenga al alcanzar un conteo de iteraciones fijo y una cantidad en dólares fija, aplicado por Claude Code mismo en lugar del runner del job circundante. ¿Qué cambio de configuración aplica directamente ambos límites por invocación?",
   "options": [
    {
     "key": "A",
     "text": "Agregar --max-turns 10 --max-budget-usd 2.00 a la invocación de claude -p para limitar las iteraciones y el gasto."
    },
    {
     "key": "B",
     "text": "Configurar timeout-minutes: 5 en el paso del job de GitHub Actions y monitorear los costos por ejecución a través del dashboard de uso de la Anthropic Console."
    },
    {
     "key": "C",
     "text": "Cambiar el flag --model a un modelo más pequeño y económico para que cada iteración use menos tokens y tenga un costo por llamada menor."
    },
    {
     "key": "D",
     "text": "Configurar --permission-mode dontAsk para denegar automáticamente cualquier solicitud de permisos de herramientas que no esté en el conjunto explícitamente permitido."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El requisito es que Claude Code mismo detenga cada invocación después de un conteo de iteraciones fijo y una cantidad en dólares fija. El cap `--max-turns` limita las iteraciones agénticas, mientras que `--max-budget-usd` limita el gasto para esa ejecución. Un timeout de GitHub Actions y el dashboard de uso son controles externos en lugar de caps aplicados por Claude Code, cambiar modelos solo reduce el costo por token sin limitar los bucles, y el modo de permisos controla las aprobaciones de herramientas en lugar del conteo de iteraciones o el presupuesto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVHF1RDAY99N25R5P1",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu pipeline revisa aproximadamente 200 scripts de migración de base de datos diariamente usando la Message Batches API. Cada solicitud del batch incluye un system prompt compartido de 8.000 tokens que contiene directrices de revisión de migraciones y documentación del esquema, seguido del script de migración individual. Has agregado breakpoints de cache_control en el system prompt compartido en cada solicitud, pero el monitoreo muestra tasas de cache hit de solo el 32%, con cache misses concentradas en solicitudes procesadas más tarde en la ventana del batch. ¿Qué cambio abordará la causa raíz de estas cache misses sin agregar latencia de procesamiento secuencial?",
   "options": [
    {
     "key": "A",
     "text": "Mover los breakpoints de cache_control del system prompt al contenido del script de migración individual para cachear patrones de código similares entre revisiones."
    },
    {
     "key": "B",
     "text": "Agregar solicitudes de pre-calentamiento con max_tokens: 0 al inicio de cada batch para cargar el cache antes de que se ejecuten las solicitudes de revisión."
    },
    {
     "key": "C",
     "text": "Dividir las 200 solicitudes en 10 batches secuenciales de 20, enviando cada uno solo después de que el anterior termine, para mantener las solicitudes suficientemente cercanas en el tiempo para la reutilización del cache."
    },
    {
     "key": "D",
     "text": "Usar el TTL de cache extendido de 1 hora en lugar del TTL predeterminado de 5 minutos en tus breakpoints de cache."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El system prompt compartido es idéntico y ya tiene breakpoints de cache, por lo que las cache misses no son causadas por la ubicación del contenido. Se concentran en solicitudes procesadas más tarde en la ventana del batch, lo que apunta al cache que expira antes de que las solicitudes posteriores puedan reutilizarlo. Usar el TTL extendido de 1 hora aborda esa causa raíz mientras preserva el procesamiento paralelo del batch. Mover los breakpoints a scripts de migración variables reduciría la reutilización, el pre-calentamiento no previene la expiración posterior, y los batches secuenciales agregarían latencia innecesaria."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVQ7DZADFKFKGNM1BW",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu pipeline de CI realiza revisiones de código enfocadas en seguridad en aproximadamente 50 PRs diariamente, costando actualmente $150/día usando la API síncrona. Las revisiones no son bloqueantes —los desarrolladores hacen merge después de que pasen los tests y abordan los hallazgos en commits posteriores. Estás evaluando la Message Batches API por su reducción de costos del 50%. ¿Qué factor determina principalmente si el procesamiento por lotes es apropiado para este caso de uso?",
   "options": [
    {
     "key": "A",
     "text": "Si puedes estructurar cada revisión como una única solicitud sin refinamiento multi-turno."
    },
    {
     "key": "B",
     "text": "Si tu procesamiento de resultados puede manejar revisiones que llegan en un orden diferente al enviado."
    },
    {
     "key": "C",
     "text": "Si el feedback de revisión que llega hasta 24 horas después de la creación del PR sigue siendo accionable."
    },
    {
     "key": "D",
     "text": "Si reducir la latencia por revisión de 30-60 segundos a casi instantánea importa para tu flujo de trabajo."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La Message Batches API es apropiada para trabajo no bloqueante y tolerante a la latencia porque intercambia garantías de latencia por menor costo. Dado que estas revisiones no bloquean los merges, la pregunta clave es si los hallazgos entregados más tarde, potencialmente hasta 24 horas después de la presentación, siguen siendo lo suficientemente útiles para commits posteriores. El orden de los resultados puede manejarse con identificadores, y la latencia casi instantánea no es la propuesta de valor del procesamiento por lotes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVFQ5MJ2N2W0HX1JMZ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revisión automatizada llama a la API de Claude para cada PR, usando tool_use con una herramienta report_findings que devuelve un array JSON de objetos de hallazgos (cada uno con file_path, line_number, severity, category y description). Durante las pruebas en un PR grande que toca 30+ archivos, la respuesta alcanza el límite de max_tokens y el output se trunca a mitad del JSON, haciendo que el parser de tu pipeline falle. ¿Cuál es la forma más efectiva de manejar esto?",
   "options": [
    {
     "key": "A",
     "text": "Dividir la revisión en múltiples llamadas a la API que analicen un subconjunto de los archivos modificados, luego combinar los arrays de hallazgos resultantes."
    },
    {
     "key": "B",
     "text": "Aumentar max_tokens al máximo del modelo e instruir a Claude para que mantenga las descripciones de hallazgos de menos de 50 palabras cada una."
    },
    {
     "key": "C",
     "text": "Agregar lógica de reintento que detecte JSON truncado y reenvíe la solicitud con instrucciones para reportar solo los hallazgos de severidad crítica y alta."
    },
    {
     "key": "D",
     "text": "Cambiar de tool_use a pedirle a Claude que devuelva los hallazgos como una lista en markdown."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El fallo es causado por una única revisión grande que produce más output estructurado del que cabe en `max_tokens`, resultando en JSON truncado. Dividir el PR en unidades de revisión más pequeñas mantiene cada respuesta de `tool_use` acotada y parseable mientras preserva el mismo esquema de hallazgos estructurado. Simplemente aumentar `max_tokens` puede seguir fallando en PRs muy grandes, reintentar con solo los hallazgos de alta severidad cambia el recall, y cambiar a Markdown elimina la estructura parseable por máquina de la que depende el pipeline."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVJ5B7A6GS57J0S5W6",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "[ilegible]"
   },
   "prompt": "Tu pipeline ejecuta:\n\n```\nPROMPT=\"You are a code reviewer.\"\nPROMPT=\"$PROMPT Analyze the provided diff\"\nPROMPT=\"$PROMPT for bugs, security issues,\"\nPROMPT=\"$PROMPT and style violations.\"\n\nclaude -p \\\n  --dangerously-skip-permissions \\\n  --system-prompt \"$PROMPT\" \\\n  < diff.txt\n```\n\nLas revisiones se completan y devuelven feedback, pero Claude solo comenta sobre el texto del diff enviado por pipe —nunca lee archivos circundantes en el repositorio clonado para entender el contexto más amplio, incluso cuando el diff modifica una función llamada por muchos otros módulos. ¿Qué cambio en la invocación hará que Claude lea los archivos relacionados en el repositorio mientras sigue aplicando tus instrucciones de revisión personalizadas?",
   "options": [
    {
     "key": "A",
     "text": "Mantener --system-prompt y agregar --allowedTools \"Read,Glob,Grep\" para que el modo no interactivo -p permita las herramientas del sistema de archivos que de otro modo deshabilita."
    },
    {
     "key": "B",
     "text": "Eliminar --system-prompt por completo y colocar las instrucciones de revisión en un archivo CLAUDE.md en la raíz del repositorio, ya que --system-prompt es incompatible con el uso de herramientas bajo -p."
    },
    {
     "key": "C",
     "text": "Dejar de enviar el diff por stdin e incorporar el contenido del diff dentro del string del prompt, para que Claude Code trate la invocación como una sesión agéntica en lugar de un procesamiento de stream."
    },
    {
     "key": "D",
     "text": "Reemplazar --system-prompt con --append-system-prompt para que las instrucciones de revisión se agreguen al prompt predeterminado de Claude Code en lugar de sobrescribir la guía incorporada para usar herramientas de lectura de archivos y navegación de código."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "La invocación está reemplazando la guía predeterminada del sistema de Claude Code con un prompt personalizado mínimo, por lo que la ejecución se comporta como si solo debiera analizar el texto del diff enviado por stdin. Usar `--append-system-prompt` preserva las instrucciones incorporadas de Claude Code para navegar el repositorio con herramientas, mientras agrega los criterios de revisión personalizados. Simplemente permitir herramientas o mover el diff al prompt no soluciona la guía predeterminada sobrescrita, y `CLAUDE.md` es contexto del proyecto, no un reemplazo para las instrucciones de revisión a nivel de invocación."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RV9QP7F2EXVX3V8FJ4",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Construiste una herramienta de revisión de código basada en LLM que analiza pull requests y genera hallazgos estructurados. Cada hallazgo es un objeto JSON con file_path, line_number, issue_category (por ejemplo, \"security\", \"style\") y description. Los desarrolladores pueden hacer clic en \"dismiss\" en cualquier hallazgo que consideren poco útil; actualmente el 35% de los hallazgos son descartados. Quieres analizar estos descartados para entender qué está fallando en tu sistema y mejorar tus prompts. ¿Qué cambio en la estructura de salida sería más útil para este análisis?",
   "options": [
    {
     "key": "A",
     "text": "Eliminar el campo issue_category y rastrear las tasas de descarte solo a nivel de hallazgo individual."
    },
    {
     "key": "B",
     "text": "Ampliar el campo description para incluir explicaciones más detalladas de por qué cada problema importa y cómo corregirlo."
    },
    {
     "key": "C",
     "text": "Agregar un campo model_confidence (0.0-1.0) y filtrar los hallazgos por debajo de un umbral calibrado contra las tasas históricas de descarte."
    },
    {
     "key": "D",
     "text": "Agregar un campo detected_pattern que registre la construcción de código (por ejemplo, \"single-letter loop variable\") que disparó cada hallazgo."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Para mejorar los prompts, el equipo necesita saber qué patrones de código recurrentes generan hallazgos descartados. `issue_category` es demasiado amplio, y el rastreo a nivel de hallazgo individual es demasiado granular para revelar fallas sistemáticas del prompt. Un campo `detected_pattern` permite segmentar los descartados por la construcción real que disparó el comentario de revisión, identificar patrones con alto índice de falsos positivos y refinar criterios o ejemplos para esos casos. El filtrado por confianza puede reducir el volumen, pero no explica qué está fallando en el sistema."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWQ2TM730EQJNRC6MQ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tus prompts de revisión de código incluyen tanto los cambios de implementación como el archivo de tests correspondiente, pero los comentarios de revisión del LLM no señalan caminos de código sin pruebas. El análisis revela que el modelo detecta correctamente las funciones que no tienen tests en absoluto, pero no identifica cuando las ramas condicionales o los caminos de manejo de errores dentro de funciones con tests carecen de cobertura.\n¿Cuál es la forma más efectiva de mejorar la detección de gaps de cobertura a nivel de ramas sin complicar demasiado el pipeline?",
   "options": [
    {
     "key": "A",
     "text": "Agregar instrucciones explícitas que dirijan al modelo a enumerar cada rama condicional y camino de excepción, luego verificar que cada uno tenga una aserción de test correspondiente"
    },
    {
     "key": "B",
     "text": "Incluir ejemplos few-shot que muestren código con una rama sin cobertura junto al comentario de revisión que identifica el caso de test faltante específico"
    },
    {
     "key": "C",
     "text": "Implementar un pipeline multi-paso donde llamadas separadas al LLM primero extraigan todas las ramas condicionales, luego crucen cada una con las aserciones de test en un segundo paso"
    },
    {
     "key": "D",
     "text": "Reestructurar el prompt para intercalar implementación y tests, presentando cada función seguida inmediatamente de sus casos de test"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El modelo ya detecta funciones completamente sin tests, pero falla en el juicio más ambiguo de si ramas específicas y caminos de error están cubiertos. Los ejemplos few-shot demuestran directamente ese patrón de decisión: una función con tests puede tener igualmente una rama condicional o un camino de excepción sin cobertura, y la revisión debe nombrar el caso de test faltante. Esto mejora la detección a nivel de ramas sin agregar una arquitectura multi-paso. Un checklist o prompt reordenado puede ayudar, pero los ejemplos son más efectivos para enseñar el comportamiento de revisión matizado."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RW6F9A6X0J8S3MH4GD",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Los usuarios reportan que los reportes finales a veces carecen de profundidad en subtemas específicos. La investigación muestra que el agente de análisis de documentos frecuentemente identifica brechas—por ejemplo, notando “las fuentes recuperadas discuten autenticación de API pero carecen de detalles sobre patrones de token refresh”—pero bajo el pipeline estricto actual, este insight no es accionable ya que la búsqueda ya se completó. ¿Cuál es el cambio arquitectónico más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador revise la salida del análisis en busca de indicadores de brecha y vuelva a invocar la búsqueda con consultas informadas por las brechas cuando se detecten."
    },
    {
     "key": "B",
     "text": "Hacer que el agente de síntesis adjunte puntajes de confianza a cada sección y marque las áreas con cobertura insuficiente para revisión manual."
    },
    {
     "key": "C",
     "text": "Agregar un agente de planificación de investigación antes de la fase de búsqueda que descomponga los temas en sub-preguntas específicas."
    },
    {
     "key": "D",
     "text": "Hacer que el agente de análisis reporte brechas específicas al coordinador, que dispara búsquedas dirigidas y vuelve a invocar el análisis hasta que sea suficiente."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El problema no es solo la planificación inicial; el agente de análisis está descubriendo brechas de cobertura concretas después de ver el material recuperado. Esas brechas necesitan convertirse en señales accionables en la arquitectura. Que el agente de análisis devuelva subtemas específicos faltantes al coordinador permite que este realice búsquedas dirigidas, pase las nuevas fuentes de vuelta por el análisis e itere hasta que la cobertura sea adecuada. Las marcas de confianza o la revisión manual solo exponen la debilidad después del hecho, y un paso solo de planificación no puede reaccionar a brechas descubiertas durante el análisis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RW6NPSN7Y2P0428FBA",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de síntesis completa su paso inicial pero marca que tres preguntas clave de investigación permanecen sin respuesta porque los agentes de búsqueda web y análisis de documentos no encontraron información relevante sobre esos subtemas específicos. El coordinador actualmente procede directamente a la generación del reporte, produciendo reportes con cobertura incompleta. ¿Qué cambio mejoraría más efectivamente la completitud de la investigación?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador evalúe la salida de síntesis en busca de brechas, luego vuelva a delegar en la búsqueda web y el análisis de documentos con consultas dirigidas antes de invocar la síntesis nuevamente."
    },
    {
     "key": "B",
     "text": "Dar al agente de síntesis acceso directo a herramientas de búsqueda web para que pueda llenar de forma autónoma las brechas de conocimiento sin devolver el control al coordinador."
    },
    {
     "key": "C",
     "text": "Hacer que el agente de generación de reportes anote qué preguntas de investigación no pudieron responderse, para que los usuarios entiendan las limitaciones del resultado final."
    },
    {
     "key": "D",
     "text": "Aumentar la amplitud inicial de las consultas enviadas a la búsqueda web y análisis de documentos para reducir la probabilidad de omitir información relevante."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El agente de síntesis identificó preguntas de investigación sin respuesta específicas, por lo que el coordinador debería usar esas brechas para impulsar otro paso de investigación dirigida. Esto preserva la arquitectura liderada por el coordinador mientras permite que el pipeline mejore iterativamente la cobertura antes de la generación del reporte. Dar a síntesis acceso amplio de búsqueda debilita la separación de responsabilidades, solo anotar las limitaciones no mejora la completitud, y ampliar la búsqueda inicial es menos eficiente que usar las brechas concretas descubiertas durante la síntesis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWNNJ0B7ETY3R54GJ8",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Después de que los subagentes de búsqueda web y análisis de documentos completan sus tareas, el coordinador necesita iniciar el subagente de síntesis para sintetizar los hallazgos. ¿Cuál es el enfoque correcto para proveer al subagente de síntesis con la información que necesita?",
   "options": [
    {
     "key": "A",
     "text": "Pasar identificadores de referencia y configurar el subagente con acceso de lectura a un almacén de memoria compartida donde otros subagentes depositaron sus resultados"
    },
    {
     "key": "B",
     "text": "Incluir los hallazgos completos de ambos subagentes directamente en el prompt del subagente de síntesis"
    },
    {
     "key": "C",
     "text": "Proveer al subagente con definiciones de herramientas que le permitan solicitar salidas de otros subagentes a través de callbacks"
    },
    {
     "key": "D",
     "text": "Iniciar el subagente con solo una breve descripción de tarea, confiando en la herencia automática de contexto del coordinador"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Los subagentes operan con su propio contexto, por lo que el subagente de síntesis no debe depender de la herencia automática de la conversación del coordinador. El coordinador necesita pasar directamente las salidas de búsqueda web y análisis de documentos, idealmente en una forma estructurada que preserve las afirmaciones, evidencia, metadatos de fuente y atribución. Las referencias a memoria compartida o los mecanismos de callback agregan indirección innecesaria, mientras que una breve descripción de tarea dejaría al agente de síntesis sin la evidencia que debe combinar."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWGA6W5CE41E0KE0YP",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de búsqueda web recopiló varias fuentes relevantes para un tema de investigación. El agente de análisis de documentos ahora necesita examinar estas fuentes. ¿Cómo fluye típicamente la información entre estos dos subagentes especializados?",
   "options": [
    {
     "key": "A",
     "text": "El agente de búsqueda web invoca directamente al agente de análisis de documentos, pasando las fuentes descubiertas como parámetros."
    },
    {
     "key": "B",
     "text": "Ambos agentes acceden a un almacén de memoria compartida donde el agente de búsqueda web escribe los hallazgos y el agente de análisis de documentos los lee."
    },
    {
     "key": "C",
     "text": "El agente coordinador recibe la salida del agente de búsqueda web e incluye los hallazgos relevantes en el prompt al invocar al agente de análisis de documentos."
    },
    {
     "key": "D",
     "text": "Los agentes se comunican a través de una cola de mensajes basada en eventos, con el agente de análisis de documentos suscripto a los eventos de finalización de búsqueda web."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "En una arquitectura coordinador-subagente, los agentes especializados típicamente no se comunican directamente entre sí ni dependen de contexto compartido implícito. El coordinador gestiona la descomposición de tareas, la agregación de resultados y el enrutamiento de información. Después de que la búsqueda web se completa, el coordinador debe tomar los hallazgos de fuentes relevantes e incluirlos explícitamente al invocar al agente de análisis de documentos. Esto mantiene la comunicación observable y controlada mientras asegura que el siguiente subagente tenga el contexto que necesita."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWCFE8BBP43HFKBPT4",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Al analizar casos legales complejos que citan múltiples precedentes, el subagente de análisis de documentos los procesa secuencialmente. Un caso emblemático que cita 12 precedentes tarda más de 3 minutos en analizarse por completo. ¿Cuál es la forma más efectiva de reducir esta latencia preservando la capacidad del coordinador para monitorear y depurar el sistema?",
   "options": [
    {
     "key": "A",
     "text": "Implementar una cola de mensajes donde las tareas de análisis de precedentes sean procesadas asíncronamente por un pool de agentes trabajadores"
    },
    {
     "key": "B",
     "text": "Crear una jerarquía de agentes recursiva donde los agentes de análisis subdividan el trabajo entre agentes hijos hasta alcanzar la granularidad de un solo precedente"
    },
    {
     "key": "C",
     "text": "Habilitar al subagente de análisis de documentos para que genere dinámicamente sus propios subagentes especializados cuando encuentre casos con muchas citas"
    },
    {
     "key": "D",
     "text": "Hacer que el coordinador genere subagentes de análisis de documentos en paralelo, cada uno manejando un subconjunto de precedentes, luego agregar los resultados antes de la síntesis"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El trabajo es naturalmente particionable por precedente, por lo que ejecutar múltiples subagentes de análisis de documentos en paralelo reduce la latencia. Mantener la generación y agregación en el coordinador preserva la observabilidad, el manejo de errores y la depurabilidad, porque el coordinador puede rastrear qué subconjunto analizó cada subagente y combinar los resultados antes de la síntesis. Las colas de mensajes, las jerarquías recursivas o los subagentes que generan sus propios subagentes agregan complejidad y hacen que el flujo de control sea más difícil de monitorear."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWDY00S5VYB5CE2HE5",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Después de que el agente de búsqueda web y el agente de análisis de documentos completan sus tareas, el coordinador invoca al agente de síntesis. Sin embargo, el agente de síntesis responde que no puede completar la tarea porque no se proporcionaron hallazgos de investigación. ¿Cuál es la causa más probable de este problema?",
   "options": [
    {
     "key": "A",
     "text": "El agente de síntesis necesita herramientas que puedan obtener resultados directamente del historial de conversaciones de los otros agentes."
    },
    {
     "key": "B",
     "text": "La ventana de contexto del agente de síntesis no es lo suficientemente grande para contener las salidas combinadas de ambos agentes anteriores."
    },
    {
     "key": "C",
     "text": "Los subagentes necesitan compartir una única conexión a la API para habilitar el compartido automático de contexto entre invocaciones."
    },
    {
     "key": "D",
     "text": "El coordinador no incluyó las salidas de los agentes anteriores en el prompt del agente de síntesis."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los subagentes no heredan automáticamente el historial completo de conversación del coordinador ni las salidas de otros subagentes. Si el agente de síntesis dice que no se proporcionaron hallazgos, el problema probable es que el coordinador lo invocó solo con la solicitud de tarea y omitió los resultados de búsqueda web y análisis de documentos. La solución es incluir esas salidas previas directamente en el prompt de síntesis, preferiblemente en una forma estructurada que preserve los metadatos de fuente y la evidencia."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWYKZDVRZYMQH2F80X",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "En producción, observás que las consultas simples de verificación de hechos (por ejemplo, \"¿En qué año se firmó el Acuerdo de París sobre el Clima?\") atraviesan los cuatro subagentes secuencialmente, consumiendo más de 40 segundos y tokens significativos por consulta. La investigación comparativa compleja se beneficia del pipeline completo. La distribución de consultas es diversa y evoluciona a medida que los usuarios descubren nuevas aplicaciones. ¿Cuál es el enfoque más efectivo para optimizar para variedad de complejidad de consultas?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador analice cada consulta y decida dinámicamente qué subagentes invocar basándose en su evaluación de los requisitos de la consulta."
    },
    {
     "key": "B",
     "text": "Crear un camino rápido para preguntas fácticas que omita los subagentes por completo, enrutando todas las demás consultas a través del pipeline completo para garantizar la exhaustividad de la investigación."
    },
    {
     "key": "C",
     "text": "Implementar enrutamiento basado en patrones que categorice las consultas por estructura (hecho único vs. comparativa vs. analítica) y mapee cada categoría a una combinación predefinida de subagentes."
    },
    {
     "key": "D",
     "text": "Entrenar un clasificador de complejidad de consultas con datos históricos etiquetados para predecir combinaciones óptimas de subagentes, reentrenando periódicamente a medida que los patrones de consulta evolucionan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "La carga de trabajo tiene tipos de consultas diversas y en evolución, por lo que un pipeline fijo desperdicia tiempo en preguntas simples y el enrutamiento rígido se volverá frágil. El rol del coordinador es evaluar la complejidad de las consultas, descomponer tareas e invocar solo los subagentes necesarios para esa solicitud. Esto permite que las verificaciones de hechos simples tomen un camino más ligero mientras la investigación comparativa compleja sigue usando el flujo de trabajo multi-agente completo. Un camino rápido estático o una tabla de patrones maneja solo categorías conocidas, y un clasificador separado agrega sobrecarga de mantenimiento sin aprovechar el rol de orquestación existente del coordinador."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWC8A6KA0T0S68ASK1",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Las revisiones de producción revelan un manejo inconsistente de la incertidumbre en los reportes finales. A veces, los hallazgos contradictorios de los subagentes se sintetizan en una declaración única y confiada (perdiendo matices), mientras que otras veces los reportes tienen demasiadas calificaciones (volviéndose inútiles). Cuando el agente de búsqueda web devuelve \"analistas de la industria estiman un tamaño de mercado de $50B (metodología varía)\" y el agente de análisis de documentos devuelve \"estudio revisado por pares estima $35B (±$7B, IC 95%)\", el coordinador elige uno arbitrariamente o produce declaraciones vagas como \"el mercado podría ser $35B-$50B dependiendo de factores\". ¿Qué enfoque sistemático aborda mejor esto?",
   "options": [
    {
     "key": "A",
     "text": "Implementar una capa de calibración de confianza que normalice las expresiones de incertidumbre de los subagentes a puntajes de probabilidad estandarizados (0.0-1.0), luego promediar ponderadamente los hallazgos por su confianza calibrada."
    },
    {
     "key": "B",
     "text": "Configurar los subagentes para que solo reporten hallazgos que cumplan un umbral de alta confianza, filtrando la información incierta antes de que llegue al coordinador."
    },
    {
     "key": "C",
     "text": "Instruir al agente de síntesis para que estructure los reportes con secciones explícitas que distingan los hallazgos bien establecidos de los controvertidos, preservando las caracterizaciones originales de las fuentes y el contexto metodológico."
    },
    {
     "key": "D",
     "text": "Agregar un subagente de verificación que cruce los hallazgos entre fuentes, pasando a síntesis solo las afirmaciones corroboradas por al menos dos fuentes independientes."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El problema es la síntesis inconsistente de la incertidumbre, no la falta de un único puntaje de confianza numérico. Los hallazgos contradictorios pero creíbles deben preservarse con atribución, caracterización de la fuente, intervalos de confianza y contexto metodológico. Estructurar el reporte para separar los hallazgos bien establecidos de los controvertidos evita la selección arbitraria sin caer en el sobre-precavido vago. Filtrar afirmaciones inciertas o requerir corroboración de dos fuentes descartaría matices útiles, y el promedio ponderado puede ocultar diferencias metodológicas importantes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RX8Q4TGJE5WJ00R47V",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El coordinador proporciona instrucciones paso a paso detalladas al subagente de búsqueda web, especificando consultas de búsqueda exactas, prioridades de fuentes y filtros de fecha. El monitoreo de producción revela tres problemas: (1) el subagente reporta \"resultados insuficientes\" en lugar de probar enfoques alternativos cuando las búsquedas pre-especificadas fallan, (2) la calidad de la investigación cae para temas emergentes que no coinciden con los patrones esperados, y (3) el subagente raramente encuentra fuentes tangenciales valiosas. ¿Cuál es la forma más efectiva de mejorar la adaptabilidad del subagente?",
   "options": [
    {
     "key": "A",
     "text": "Eliminar los detalles procedimentales por completo, delegando con objetivos simples como \"investigá X a fondo\" y confiando en las capacidades generales del subagente."
    },
    {
     "key": "B",
     "text": "Implementar un paso de clasificación de temas donde el coordinador categorice las solicitudes como \"bien definidas\" o \"exploratorias\" y use diferentes estilos de instrucción para cada categoría."
    },
    {
     "key": "C",
     "text": "Especificar objetivos de investigación y criterios de calidad (amplitud de cobertura, diversidad de fuentes, actualidad) en lugar de pasos procedimentales, dejando que el subagente determine su estrategia de búsqueda."
    },
    {
     "key": "D",
     "text": "Agregar directivas de respaldo explícitas a las instrucciones detalladas: \"Si las búsquedas especificadas arrojan menos de N resultados, intentar formulaciones de consulta alternativas antes de reportar el fallo\"."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Los fallos provienen de sobre-restringir al subagente de búsqueda web con consultas y procedimientos fijos. Para temas emergentes o exploratorios, el subagente necesita espacio para adaptar su estrategia de búsqueda mientras se le sigue exigiendo estándares de calidad claros. Los objetivos y criterios como la amplitud, la diversidad de fuentes y la actualidad definen cómo es una buena investigación sin dictar pasos frágiles. Eliminar la guía por completo es demasiado vago, las cláusulas de respaldo solo parchean un modo de fallo, y la clasificación agrega complejidad mientras sigue dependiendo de estilos de instrucción predefinidos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXEJJ97KBXA8RANBQJ",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Tu pipeline de investigación multi-agente falló después de procesar 12 de 28 documentos. El agente de búsqueda web había identificado fuentes relevantes, el analizador de documentos había completado parcialmente la extracción, y el sintetizador había comenzado la identificación de patrones. Necesitás reanudar el procesamiento sin repetir trabajo ni perder la fidelidad de los hallazgos previos. ¿Qué enfoque de gestión de estado equilibra mejor la fidelidad de la información con la eficiencia del contexto al restaurar el estado del agente?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que cada agente persista una exportación estructurada en una ubicación conocida. Al reanudar, el coordinador carga el manifiesto e inyecta el estado relevante en los prompts de los agentes."
    },
    {
     "key": "B",
     "text": "Hacer que cada agente mantenga su propio archivo de estado persistente y lo recargue de forma independiente al inicio de cada sesión."
    },
    {
     "key": "C",
     "text": "Persistir el log de conversación del coordinador que contiene todas las delegaciones de tareas y respuestas, proveyéndolo a los agentes al reanudar."
    },
    {
     "key": "D",
     "text": "Indexar todas las salidas de los agentes en un almacén vectorial compartido. Al reanudar, cada agente consulta el almacén usando búsqueda semántica para recuperar hallazgos previos relevantes."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Las exportaciones de estado estructuradas preservan el progreso con alta fidelidad sin reproducir cada turno de conversación. Un manifiesto le da al coordinador un mapa confiable de qué fuentes fueron encontradas, qué documentos fueron procesados, qué extracciones están completas y qué trabajo de síntesis había comenzado. El coordinador puede entonces inyectar solo el estado relevante en cada prompt de agente reanudado. Los archivos de estado independientes de los agentes arriesgan una restauración inconsistente, los logs completos desperdician contexto, y la recuperación semántica puede omitir o distorsionar hallazgos previos exactos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXY3TDCTP2EWBDXJ9N",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente coordinador tiene AgentDefinitions configuradas para los cuatro subagentes especializados, cada uno con descripciones, prompts y restricciones de herramientas apropiadas. Durante las pruebas, notás que el coordinador razona correctamente sobre cuándo delegar—genera mensajes como \"Le pediré al agente de búsqueda web que encuentre fuentes sobre este tema\"—pero nunca ocurre ninguna ejecución de subagente. El coordinador luego procede como si la delegación hubiera ocurrido y continúa con información incompleta. Los logs no muestran errores. ¿Cuál es la causa más probable?",
   "options": [
    {
     "key": "A",
     "text": "Las AgentDefinitions están configuradas correctamente, pero el system prompt del coordinador no lista explícitamente los tipos de subagentes disponibles, impidiendo que el modelo sepa que pueden ser invocados."
    },
    {
     "key": "B",
     "text": "La configuración max_tokens del coordinador es demasiado baja, causando que la invocación de la herramienta Task sea truncada antes de que se pueda especificar el parámetro del tipo de subagente."
    },
    {
     "key": "C",
     "text": "La configuración allowedTools del coordinador no incluye \"Task\", por lo que aunque puede razonar sobre la delegación, no puede invocar la herramienta necesaria para generar subagentes."
    },
    {
     "key": "D",
     "text": "El aislamiento de contexto de los subagentes significa que las descripciones de tareas del coordinador no llegan automáticamente a los subagentes; necesitás configurar el reenvío explícito de contexto en ClaudeAgentOptions."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Las entradas `AgentDefinition` describen los tipos de subagentes disponibles, pero el coordinador aún necesita permiso para usar el mecanismo que los genera. La herramienta `Task` es necesaria para la invocación de subagentes, por lo que si falta en `allowedTools`, el coordinador puede razonar sobre la delegación en lenguaje natural pero nunca ejecutar una llamada de subagente. El aislamiento de contexto afecta lo que los subagentes reciben después de ser generados; no explica por qué no ocurre ninguna ejecución de subagente en absoluto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXZ9S35AMBY8PVTKHG",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de síntesis recibe hallazgos resumidos de los agentes de búsqueda web y análisis de documentos, luego pasa un resumen consolidado al generador de reportes. Durante las pruebas, descubrís que los reportes generados hacen afirmaciones fácticas sin citas apropiadas—el generador de reportes no puede atribuir declaraciones a sus fuentes originales porque esos metadatos se perdieron durante los pasos de resumen. ¿Cuál es el enfoque más efectivo para asegurar la atribución adecuada de fuentes en los reportes finales?",
   "options": [
    {
     "key": "A",
     "text": "Omitir el resumen y pasar las salidas crudas completas de la búsqueda web y análisis de documentos directamente al generador de reportes."
    },
    {
     "key": "B",
     "text": "Hacer que el generador de reportes consulte al agente de búsqueda web para re-localizar fuentes de las afirmaciones en el reporte final."
    },
    {
     "key": "C",
     "text": "Hacer que cada agente genere datos estructurados separando los resúmenes de contenido de los metadatos de fuente (URLs, nombres de documentos, números de página)."
    },
    {
     "key": "D",
     "text": "Instruir al agente de síntesis para que incorpore referencias de fuentes en línea dentro del texto de su resumen usando un formato de cita consistente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La atribución de fuentes se pierde porque el resumen comprime las afirmaciones sin preservar su procedencia. Las salidas estructuradas que mantienen los resúmenes separados de los metadatos de fuente permiten que los agentes posteriores preserven y fusionen los mapeos afirmación-fuente durante la síntesis y generación de reportes. Pasar las salidas crudas desperdicia contexto, relocalizar fuentes después es poco confiable, y las citas en línea dentro del texto son más fáciles de omitir o distorsionar que los metadatos estructurados explícitos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXBQ1HHNJ51NGG3M1K",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Configuraste el sistema para que los cuatro subagentes tengan acceso al conjunto completo de 18 herramientas. Durante las pruebas, los agentes frecuentemente llaman a herramientas fuera de su especialización—el agente de síntesis intenta búsquedas web, y el generador de reportes intenta analizar documentos. ¿Cuál es la causa principal de este comportamiento deficiente de selección de herramientas?",
   "options": [
    {
     "key": "A",
     "text": "Elegir entre 18 herramientas en lugar de 4-5 relevantes aumenta la complejidad de la decisión más allá de los umbrales de selección confiable."
    },
    {
     "key": "B",
     "text": "El coordinador no puede rastrear qué capacidades tiene cada subagente, lo que lleva a tareas mal enrutadas."
    },
    {
     "key": "C",
     "text": "Las descripciones de rol de los agentes en sus system prompts entran en conflicto con tener acceso a herramientas fuera de ese rol."
    },
    {
     "key": "D",
     "text": "Las definiciones de herramientas consumen demasiado espacio de la ventana de contexto, dejando espacio insuficiente para el contenido de la tarea."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Darle a cada subagente las 18 herramientas hace que la selección de herramientas sea más difícil y alienta el mal uso entre roles. Un agente de síntesis con herramientas de búsqueda web y un generador de reportes con herramientas de análisis de documentos pueden elegir capacidades fuera de su especialización porque el conjunto de herramientas disponibles es demasiado amplio. El mejor diseño es el acceso acotado a herramientas: cada subagente debe recibir solo las herramientas necesarias para su rol, con herramientas entre roles limitadas solo para necesidades específicas de alta frecuencia."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXNPT76C1327WEQ2V8",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "En producción, los reportes finales frecuentemente contienen afirmaciones sin la atribución adecuada de fuentes. La investigación muestra que mientras los agentes de búsqueda web y análisis de documentos adjuntan correctamente las citas a sus salidas, el agente de síntesis pierde el rastro de qué fuentes respaldan qué conclusiones al combinar los hallazgos. ¿Cuál es el cambio arquitectónico más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Agregar un paso de verificación donde el generador de reportes use coincidencia de similitud semántica contra las fuentes originales para reconstruir qué afirmaciones provienen de qué documentos."
    },
    {
     "key": "B",
     "text": "Hacer que el coordinador inyecte prefijos de identificador de fuente en el texto antes de cada traspaso, luego analice estos prefijos en la generación del reporte para reconstruir las citas."
    },
    {
     "key": "C",
     "text": "Mantener transcriptos completos de todas las interacciones de subagentes y agregar un agente de resolución de citas para analizar los logs y determinar las atribuciones antes de la generación del reporte."
    },
    {
     "key": "D",
     "text": "Requerir que todos los subagentes generen mapeos estructurados afirmación-fuente que el agente de síntesis debe preservar y fusionar al combinar hallazgos de múltiples fuentes."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El paso de síntesis es donde se pierde la atribución, por lo que la arquitectura debe hacer la procedencia explícita y duradera antes de que ocurra la síntesis. Los mapeos estructurados afirmación-fuente permiten que el agente de síntesis fusione conclusiones mientras retiene qué fuentes respaldan cada afirmación. Reconstruir citas después del hecho mediante similitud semántica, logs o prefijos de texto es frágil y puede hacer atribuciones incorrectas; preservar los mapeos a través del pipeline es más confiable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXT5EGBRVZKFHD6ZQH",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El monitoreo de producción muestra que las consultas de seguimiento como \"resumí lo que aprendimos sobre tendencias de mercado\" tardan consistentemente más de 40 segundos. La investigación revela que el coordinador genera el subagente de síntesis para cada solicitud de resumen, pasando más de 80K tokens de hallazgos acumulados. El coordinador ya tiene estos hallazgos en su contexto de la orquestación de la investigación. ¿Cuál es la forma más efectiva de mejorar el tiempo de respuesta para estos resúmenes de seguimiento?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador maneje las solicitudes de resumen directas usando su contexto existente, reservando la generación de subagentes para el análisis complejo."
    },
    {
     "key": "B",
     "text": "Pre-generar y cachear resúmenes con múltiples granularidades cada vez que se acumulen nuevos hallazgos."
    },
    {
     "key": "C",
     "text": "Generar el subagente de síntesis con contexto reducido y hacer que solicite hallazgos específicos al coordinador bajo demanda."
    },
    {
     "key": "D",
     "text": "Habilitar el caché de prompts en el subagente de síntesis para reducir la sobrecarga de transferir repetidamente los mismos hallazgos de investigación."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El coordinador ya tiene los hallazgos acumulados en contexto, por lo que generar un subagente de síntesis y pasar más de 80K tokens para un resumen de seguimiento simple agrega latencia y costo evitables. El coordinador debe decidir dinámicamente si una solicitud necesita un subagente especialista; los resúmenes directos pueden responderse directamente, mientras que la síntesis compleja o el nuevo análisis aún pueden delegarse. El caché o la pre-generación de resúmenes puede ayudar en casos específicos, pero la mejora más directa es evitar la invocación innecesaria de subagentes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXJ6V12ZKZQ2A40ZST",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu agente pasó 25 minutos explorando el subsistema de renderizado de un motor de juegos—leyendo código de shaders, gestión de buffers y lógica de sincronización de frames. Un ingeniero ahora le pide que entienda cómo el motor de físicas se integra con el renderizado para los overlays de debug de colisiones. Notás que las respuestas recientes hacen referencia a \"patrones de renderizado típicos\" en lugar de las clases específicas VulkanPipeline y FrameGraph que descubrió antes.\n¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Continuar en el contexto actual con prompts más dirigidos que hagan referencia a las clases específicas por nombre."
    },
    {
     "key": "B",
     "text": "Resumir los hallazgos clave de renderizado, luego iniciar un sub-agente para la exploración de físicas con ese resumen en su contexto inicial."
    },
    {
     "key": "C",
     "text": "Usar /clear para resetear el contexto por completo, luego comenzar de cero con la exploración de físicas usando las rutas de archivo del CLAUDE.md del proyecto."
    },
    {
     "key": "D",
     "text": "Iniciar un sub-agente para explorar físicas de forma independiente, luego sintetizar manualmente sus hallazgos con el conocimiento de renderizado acumulado en la conversación principal."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La sesión actual muestra degradación de contexto: las respuestas están derivando hacia patrones de renderizado genéricos en lugar de usar las clases específicas ya descubiertas. Resumir los hallazgos concretos de renderizado preserva el estado importante, y darle ese resumen a un subagente enfocado en físicas aísla la siguiente exploración mientras mantiene el contexto de integración necesario. Continuar en el contexto degradado arriesga respuestas más genéricas, limpiar el contexto descartaría descubrimientos útiles, y explorar físicas de forma independiente haría la integración más difícil."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXQZ76VKF05H2657A0",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Configuraste tu agente Claude con tres servidores MCP: uno para operaciones git, uno para gestión de tickets Jira y uno para búsqueda de documentación. Cuando un usuario le pide al agente \"crear una rama para JIRA-123 y agregar links de documentación al ticket\", ¿cómo accede el agente a las herramientas de estos servidores?",
   "options": [
    {
     "key": "A",
     "text": "El agente selecciona automáticamente el servidor más relevante basándose en la solicitud y carga solo las herramientas de ese servidor."
    },
    {
     "key": "B",
     "text": "Las herramientas de todos los servidores MCP configurados se descubren en el momento de la conexión y están disponibles simultáneamente para el agente."
    },
    {
     "key": "C",
     "text": "El agente consulta cada servidor secuencialmente para determinar cuál maneja cada herramienta, enrutando las llamadas basándose en los prefijos del nombre de herramienta."
    },
    {
     "key": "D",
     "text": "Debés especificar qué servidor MCP usar en cada turno, y el agente solo puede acceder a las herramientas de un servidor a la vez."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Cuando se configuran múltiples servidores MCP, sus herramientas se descubren cuando el agente se conecta y se ponen disponibles juntas. El agente puede por lo tanto usar la herramienta git para la rama, la herramienta Jira para el ticket y la herramienta de búsqueda de documentación para los links en el mismo flujo de trabajo. No necesita seleccionar solo un servidor por turno ni consultar servidores secuencialmente para determinar la propiedad."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYHFVN7311YFG36073",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero usó el agente ayer para analizar un módulo de autenticación legado, identificando dos enfoques distintos de refactoring: extraer un microservicio versus refactorizar en el lugar. Hoy quiere explorar ambos enfoques en profundidad—hacer que el agente proponga cambios de código específicos para cada uno—antes de decidir cuál implementar. ¿Cuál es la forma más efectiva de estructurar esta exploración?",
   "options": [
    {
     "key": "A",
     "text": "Iniciar dos sesiones nuevas, proveyendo manualmente un resumen de los hallazgos del análisis de ayer para establecer el contexto."
    },
    {
     "key": "B",
     "text": "Usar fork_session para crear dos ramas desde el análisis de ayer, explorando un enfoque en cada fork."
    },
    {
     "key": "C",
     "text": "Reanudar la sesión de ayer para explorar el primer enfoque, luego iniciar una nueva sesión para el segundo, recreando manualmente el contexto original."
    },
    {
     "key": "D",
     "text": "Reanudar la sesión de ayer y explorar ambos enfoques secuencialmente dentro del mismo hilo de conversación."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El ingeniero quiere comparar dos enfoques de refactoring divergentes que comparten la misma base de análisis previo. `fork_session` está diseñado para esto: crea ramas independientes desde el contexto existente para que cada enfoque pueda explorarse en profundidad sin contaminar al otro. Comenzar de cero o recrear el contexto manualmente arriesga perder detalles, mientras que explorar ambos secuencialmente en una conversación puede mezclar suposiciones y recomendaciones entre las dos estrategias."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYQ95W4F6W48W28AA6",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu herramienta de exploración de codebase almacena IDs de sesión para permitir a los ingenieros continuar investigaciones a través de sesiones de trabajo. Un ingeniero pasó una hora ayer analizando un módulo de autenticación legado, construyendo contexto sobre su arquitectura y dependencias. Quiere continuar hoy. El ID de sesión es válido, pero el control de versiones muestra que 3 de los 12 archivos que el agente leyó anteriormente fueron modificados durante la noche por el merge de un compañero. ¿Qué enfoque equilibra mejor la eficiencia y la precisión?",
   "options": [
    {
     "key": "A",
     "text": "Iniciar una sesión nueva para asegurar que el agente trabaje con el estado actual del codebase sin suposiciones desactualizadas"
    },
    {
     "key": "B",
     "text": "Reanudar la sesión y de inmediato hacer que el agente vuelva a leer los 12 archivos analizados anteriormente"
    },
    {
     "key": "C",
     "text": "Reanudar la sesión e informar al agente qué archivos específicos cambiaron para un re-análisis dirigido"
    },
    {
     "key": "D",
     "text": "Reanudar la sesión sin informar al agente sobre los archivos modificados"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La mayor parte del contexto de la sesión anterior sigue siendo útil, pero algunas observaciones a nivel de archivo pueden estar desactualizadas. Reanudar la sesión preserva la hora de comprensión arquitectónica acumulada, mientras que identificar explícitamente los tres archivos modificados permite al agente volver a leer y actualizar solo las suposiciones afectadas. Comenzar de cero o volver a leer los doce archivos desperdicia trabajo, y reanudar sin mencionar los cambios arriesga conclusiones inexactas basadas en contenidos de archivos desactualizados."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RY03QN182KHPV110FB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Durante las pruebas, observás que en sesiones de exploración extendidas (más de 30 minutos), el agente comienza a dar respuestas inconsistentes sobre la estructura del código que discutió antes. Los ingenieros reportan tener que repetir el contexto sobre módulos que ya exploraron. ¿Cuál es el enfoque más efectivo para abordar esto?",
   "options": [
    {
     "key": "A",
     "text": "Crear resúmenes de todos los archivos fuente antes de que comience la exploración, cargando solo estas representaciones comprimidas en el contexto."
    },
    {
     "key": "B",
     "text": "Implementar limpieza automática del contexto cada 15 minutos para asegurar que el agente comience con contexto fresco y no contaminado."
    },
    {
     "key": "C",
     "text": "Cambiar a un nivel de modelo de mayor capacidad para proporcionar más espacio de ventana de contexto para los datos de exploración acumulados."
    },
    {
     "key": "D",
     "text": "Hacer que el agente mantenga un archivo de notas que registre los hallazgos clave, referenciándolo para preguntas posteriores."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "La exploración extendida de codebase puede degradarse cuando el contexto se llena de salidas verbosas de herramientas y los detalles más antiguos se vuelven menos confiables. Un archivo de notas preserva los hallazgos clave fuera del contexto de conversación transitorio, dando al agente una referencia estable para módulos, clases, dependencias y conclusiones ya descubiertas. Limpiar el contexto descarta trabajo útil, pre-resumir todos los archivos es costoso y superficial, y un modelo más grande no garantiza por sí mismo que los hallazgos importantes permanezcan organizados y referenciados de forma consistente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYFFNMXYBXRZ13ZZRQ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide a tu agente que agregue tests exhaustivos a un codebase legado con 200 archivos y cobertura de tests mínima existente. El ingeniero no especificó qué módulos priorizar. ¿Cómo debería el agente descomponer esta tarea abierta?",
   "options": [
    {
     "key": "A",
     "text": "Crear un cronograma de tests fijo de antemano basado en la estructura de directorios, asignando igual esfuerzo a cada directorio de nivel superior sin importar la complejidad del código o la importancia para el negocio."
    },
    {
     "key": "B",
     "text": "Leer sistemáticamente los 200 archivos para crear un inventario completo de funciones antes de escribir cualquier test, asegurando que el plan de testing tenga en cuenta cada función antes de comenzar."
    },
    {
     "key": "C",
     "text": "Empezar a escribir tests para el primer módulo alfabéticamente, usando los fallos de tests e imports para descubrir archivos relacionados de forma orgánica."
    },
    {
     "key": "D",
     "text": "Usar Glob y Grep para mapear la estructura del codebase, identificar módulos fuertemente acoplados, crear un plan priorizado para áreas de alto impacto y revisar a medida que se descubren dependencias."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Para una tarea abierta en un gran codebase legado, el agente primero debe construir un mapa incremental del sistema en lugar de leer cada archivo o comenzar arbitrariamente. `Glob` puede identificar la estructura de archivos y los tests existentes, mientras que `Grep` puede revelar puntos de entrada, imports, sitios de llamada y acoplamiento. Esa información respalda un plan de testing priorizado enfocado en los módulos de alto impacto, y el plan puede adaptarse a medida que las dependencias y áreas de riesgo se vuelven más claras."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYGTVQ4DDDJY03D79E",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu agente necesita insertar una nueva función helper en el medio de un módulo utilitario de 150 líneas, entre dos funciones existentes. La herramienta Edit falla porque su parámetro old_string no puede encontrar texto único para hacer coincidir — el archivo tiene docstrings, nombres de variables y patrones estructurales repetitivos. ¿Cuál es la forma más confiable de completar esta inserción?",
   "options": [
    {
     "key": "A",
     "text": "Usar Bash para agregar la definición de la función al final del archivo usando sintaxis heredoc"
    },
    {
     "key": "B",
     "text": "Usar Edit con un old_string extremadamente largo que capture más de 30 líneas de contexto para garantizar la unicidad"
    },
    {
     "key": "C",
     "text": "Usar el parámetro replace_all de Edit para apuntar a un patrón común e incorporar la nueva función en el texto de reemplazo"
    },
    {
     "key": "D",
     "text": "Usar Read para cargar el archivo, agregar la función en la ubicación apropiada, luego usar Write para escribir el archivo actualizado"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Cuando `Edit` no puede encontrar un `old_string` único, seguir forzando un reemplazo arriesga modificar la ubicación incorrecta o fallar nuevamente. Leer el archivo completo, insertar la función helper en la ubicación correcta en el contenido completo y escribir el archivo actualizado es la alternativa confiable para texto ambiguo o repetitivo. Agregar con Bash colocaría la función incorrectamente, los strings de coincidencia muy largos son frágiles, y `replace_all` contra un patrón común no es seguro."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RY40AYFABS7YQ8FQVY",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide a tu agente que identifique los caminos de código sin tests en un módulo de procesamiento de pagos legado que abarca 45 archivos. Después de leer los primeros 8 archivos fuente, las respuestas del agente se vuelven notablemente menos precisas—está olvidando patrones de código discutidos previamente y todavía no localizó todos los archivos de test ni trazó los flujos de pago críticos. ¿Cuál es el enfoque más efectivo para completar esta investigación?",
   "options": [
    {
     "key": "A",
     "text": "Limpiar el contexto con /clear, luego releer selectivamente solo los archivos más críticos descubiertos hasta ahora, escribiendo los hallazgos clave en un archivo de notas que persiste entre reinicios de contexto."
    },
    {
     "key": "B",
     "text": "Documentar todos los hallazgos actuales en un reporte de resumen, limpiar el contexto por completo, luego usar ese reporte como única referencia para continuar la investigación."
    },
    {
     "key": "C",
     "text": "Iniciar subagentes para investigar preguntas específicas (por ejemplo, \"encontrar todos los archivos de test para el procesamiento de pagos\", \"rastrear las dependencias del flujo de reembolso\") mientras el agente principal coordina los hallazgos y preserva la comprensión de alto nivel."
    },
    {
     "key": "D",
     "text": "Cambiar a usar Grep para buscar nombres de funciones específicos en lugar de leer archivos completos, reduciendo el contenido cargado en el contexto para la exploración restante."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La investigación es amplia y el contexto ya está degradado. Iniciar subagentes enfocados permite que cada uno maneje una tarea de descubrimiento acotada, como localizar tests de pagos o rastrear dependencias de reembolso, sin inundar el contexto principal con cada lectura de archivo. El agente principal puede coordinar y sintetizar los resultados. Limpiar el contexto o depender de un único resumen arriesga perder detalles, y usar solo `Grep` ayuda a buscar pero no resuelve la necesidad más amplia de dividir y coordinar la investigación."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYDAXGZ29CXZTFTJEB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente que encuentre todos los callers de una función antes de eliminarla. La función está definida en una biblioteca central pero también se expone a través de módulos wrapper que renombran la función para uso específico del dominio (por ejemplo, calculateTax en la biblioteca se convierte en computeOrderTax en el módulo de órdenes). ¿Qué estrategia de exploración identificará más confiablemente todos los callers?",
   "options": [
    {
     "key": "A",
     "text": "Usar Grep para buscar el nombre original de la función en todo el codebase."
    },
    {
     "key": "B",
     "text": "Leer la biblioteca y los módulos wrapper para identificar todos los nombres expuestos de la función, luego usar Grep para cada nombre en todo el codebase."
    },
    {
     "key": "C",
     "text": "Usar Grep para encontrar todos los archivos que importan desde la biblioteca o los módulos wrapper, luego leer cada archivo para verificar si usa la función."
    },
    {
     "key": "D",
     "text": "Buscar el nombre de la función en la documentación del proyecto para entender los patrones de uso previstos y navegar a los puntos de integración documentados."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Buscar solo el nombre original de la función omitirá los callers que usen alias a nivel de wrapper como `computeOrderTax`. La estrategia confiable es entender cómo se exporta y renombra la función a través de los módulos wrapper, recopilar todos los nombres expuestos y luego buscar cada nombre en todo el codebase. Las búsquedas solo de imports aún pueden omitir el uso indirecto o con alias, y la documentación no es una fuente completa de los sitios de llamada reales."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYSVFSX6Q8AK182XRN",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Una ingeniera usó Claude Code ayer para investigar los flujos de autenticación en un monolito legado, acumulando contexto significativo durante una sesión de 2 horas. Hoy quiere continuar esa investigación específica. Desde entonces trabajó en otros tres codebases y sabe que la sesión se llamaba \"auth-deep-dive\". ¿Cómo debería reanudarla?",
   "options": [
    {
     "key": "A",
     "text": "Usar --session-id con el UUID del archivo de transcripción de la sesión de ayer"
    },
    {
     "key": "B",
     "text": "Usar --resume auth-deep-dive para cargar esa sesión específica por nombre"
    },
    {
     "key": "C",
     "text": "Usar --continue para retomar donde dejó la conversación más reciente"
    },
    {
     "key": "D",
     "text": "Comenzar de cero y volver a leer los mismos archivos"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La ingeniera quiere continuar una investigación específica con nombre, no simplemente la conversación más reciente. `--resume auth-deep-dive` carga esa sesión nombrada y preserva el contexto acumulado del análisis de autenticación previo. `--continue` arriesgaría reanudar una de las otras sesiones de codebase en las que trabajó después, y comenzar de cero desperdiciaría las dos horas de exploración previa."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYF21RYS0B50DRCA4B",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu asistente de revisión de código necesita analizar pull requests y proporcionar feedback sobre tres aspectos: cumplimiento del estilo de código, posibles problemas de seguridad y completitud de la documentación. Cada aspecto requiere leer archivos, ejecutar herramientas de análisis y generar una sección del reporte. El proceso de revisión sigue el mismo flujo de trabajo de tres pasos para cada PR.\n¿Qué patrón de descomposición de tareas es más apropiado para este flujo de trabajo?",
   "options": [
    {
     "key": "A",
     "text": "Orquestador-trabajadores—tener un LLM central que analice cada PR para determinar dinámicamente qué verificaciones son necesarias, luego delegar en LLMs trabajadores especializados para cada subtarea identificada."
    },
    {
     "key": "B",
     "text": "Enrutamiento—clasificar cada PR por tipo (feature, bugfix, refactor) primero, luego enrutar a diferentes prompts de revisión optimizados para esa categoría."
    },
    {
     "key": "C",
     "text": "Encadenamiento de prompts—dividir la revisión en pasos secuenciales donde cada aspecto (estilo, seguridad, documentación) se analiza por separado, con las salidas combinadas en un paso final de síntesis."
    },
    {
     "key": "D",
     "text": "Prompt único integral—incluir todas las instrucciones en un prompt y dejar que el modelo maneje los tres aspectos simultáneamente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La revisión tiene los mismos pasos conocidos para cada PR, y cada aspecto se beneficia de atención enfocada. El encadenamiento de prompts se adapta a flujos de trabajo multi-paso predecibles: ejecutar pasadas separadas para estilo, seguridad y documentación, luego combinar las salidas en una síntesis final. Los patrones orquestador-trabajador son mejores cuando las subtareas necesarias son dinámicas, el enrutamiento es para elegir entre diferentes flujos de trabajo, y un único prompt integral arriesga la dilución de atención en las tres dimensiones de revisión."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYF650NAXV9J1DS8BJ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente que encuentre todos los archivos en el monorepo que importan el paquete @company/auth para entender cómo se usa la autenticación en los servicios. ¿Qué herramienta integrada es más apropiada para esta tarea?",
   "options": [
    {
     "key": "A",
     "text": "Glob, para encontrar archivos con \"auth\" en su nombre o ruta"
    },
    {
     "key": "B",
     "text": "Bash, para ejecutar find . -type d -name \"*auth*\" y explorar los directorios coincidentes"
    },
    {
     "key": "C",
     "text": "Read, comenzando con los archivos package.json para rastrear las declaraciones de dependencias"
    },
    {
     "key": "D",
     "text": "Grep, para buscar el patrón de declaración de importación en los contenidos de los archivos"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El ingeniero necesita encontrar archivos cuyos contenidos importen `@company/auth`. `Grep` es la herramienta integrada apropiada para buscar en los contenidos de los archivos patrones como declaraciones de importación, nombres de funciones o mensajes de error. `Glob` busca rutas de archivo, `Read` es demasiado manual como primer paso, y usar `Bash` para inspeccionar directorios omitirá las importaciones en archivos cuyas rutas no incluyen `auth`."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ8S696SAMWM2XK5TT",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero que acaba de unirse al equipo le pide al agente que le ayude a entender la arquitectura de autenticación y autorización antes de hacer mejoras de seguridad. El codebase tiene más de 800 archivos en múltiples servicios. ¿Qué estrategia de exploración construirá la comprensión más efectivamente, dadas las herramientas integradas de Claude y los límites de contexto?",
   "options": [
    {
     "key": "A",
     "text": "Leer todos los archivos que contengan \"auth\", \"login\", \"permission\" o \"token\" en su contenido o nombre de archivo."
    },
    {
     "key": "B",
     "text": "Leer primero los archivos CLAUDE.md y README, luego pedirle al ingeniero que especifique qué 10-15 archivos son más importantes para entender el sistema de auth."
    },
    {
     "key": "C",
     "text": "Usar Grep para encontrar los puntos de entrada de autenticación, leer esos archivos, luego seguir las importaciones y llamadas de funciones para mapear el flujo de autenticación de forma incremental."
    },
    {
     "key": "D",
     "text": "Lanzar subagentes en paralelo para explorar diferentes servicios simultáneamente, luego sintetizar sus hallazgos en una descripción arquitectónica."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Con más de 800 archivos, leer todos los archivos relacionados con auth de antemano inundaría el contexto y aún así podría no revelar el flujo. El mejor enfoque es incremental: usar `Grep` para encontrar puntos de entrada concretos de autenticación y autorización, `Read` los archivos relevantes, luego seguir las importaciones, los sitios de llamada y las dependencias para construir el mapa de arquitectura. Esto mantiene el contexto enfocado y basado en caminos de código reales. Los subagentes en paralelo pueden ayudar después, pero el primer paso debe establecer los puntos de entrada y el flujo reales."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ8E7WATSEYGN3EYQV",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente que entienda cómo funciona la capa de caché antes de agregar un nuevo disparador de invalidación de caché. Después de búsquedas iniciales con Grep, el agente identificó que la lógica de caché abarca 15 archivos incluyendo decoradores, middleware y clases de servicio (~8.000 líneas en total). ¿Cuál es el siguiente paso más efectivo para construir comprensión mientras se gestionan las restricciones de contexto?",
   "options": [
    {
     "key": "A",
     "text": "Usar la herramienta Read para cargar secuencialmente los 15 archivos, construyendo comprensión completa de toda la implementación de caché."
    },
    {
     "key": "B",
     "text": "Analizar las importaciones y las jerarquías de clases para identificar la clase base de caché, leer ese archivo para entender la interfaz, luego rastrear las implementaciones de invalidación específicas."
    },
    {
     "key": "C",
     "text": "Usar Grep para buscar patrones \"invalidate\" y \"expire\" en todos los archivos, luego leer solo esos rangos de líneas específicos con contexto circundante mínimo."
    },
    {
     "key": "D",
     "text": "Usar Glob para encontrar archivos que coincidan con patrones comunes de caché (cache.py, caching/), priorizar los archivos más grandes leyéndolos primero, luego verificar los archivos más pequeños para detectar brechas."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Después de encontrar un amplio conjunto de archivos relacionados con caché, el siguiente paso debe reducir el problema a la estructura del sistema. Identificar la abstracción de caché base y leer su interfaz da un modelo mental estable, luego rastrear las implementaciones de invalidación sigue la arquitectura real. Leer los 15 archivos sobrecargaría el contexto, las búsquedas solo de palabras clave para `invalidate` y `expire` pueden omitir el flujo de control importante, y priorizar por tamaño de archivo no es un indicador confiable de importancia arquitectónica."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ71SDX5Z7GAW92ZKH",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "El subagente de exploración de un ingeniero pasó 30 minutos analizando un sistema de pagos legado, leyendo 47 archivos y documentando los flujos de datos. La sesión fue interrumpida cuando se cayó la conexión del ingeniero. Mientras estuvo fuera, un compañero de equipo mergeó un PR que renombró dos funciones utilitarias. El ingeniero quiere continuar la misma exploración. ¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Reanudar el subagente desde su transcripción anterior sin mencionar los cambios—la comprensión de la arquitectura sigue siendo válida."
    },
    {
     "key": "B",
     "text": "Lanzar un subagente nuevo con un resumen de los hallazgos previos."
    },
    {
     "key": "C",
     "text": "Reanudar el subagente desde su transcripción anterior e informarle sobre las funciones renombradas."
    },
    {
     "key": "D",
     "text": "Lanzar un subagente nuevo e incluir la transcripción anterior en el prompt inicial como contexto."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La exploración anterior contiene contexto útil sustancial, por lo que reiniciar desperdiciaría trabajo. Sin embargo, el merge del compañero significa que algunas observaciones previas pueden estar desactualizadas. Reanudar la sesión mientras se le dice explícitamente al agente qué funciones utilitarias fueron renombradas le permite preservar los 30 minutos de análisis y realizar un re-análisis dirigido alrededor de los símbolos cambiados. Reanudar silenciosamente arriesga suposiciones desactualizadas, y pasar una transcripción previa completa a un subagente nuevo es ineficiente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ6JA0DSHVD77DF9PS",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Te encargaron agregar actualizaciones en tiempo real a la aplicación. Esto podría implementarse usando WebSockets, Server-Sent Events o polling, cada uno con diferente complejidad, soporte de navegador y requisitos de infraestructura. ¿Cuál es la forma más efectiva de comenzar esta tarea?",
   "options": [
    {
     "key": "A",
     "text": "Comenzar la ejecución directa con WebSockets, luego refactorizar si surgen problemas de infraestructura."
    },
    {
     "key": "B",
     "text": "Entrar en modo plan para explorar la arquitectura, evaluar los trade-offs y presentar opciones para la aprobación del equipo antes de implementar."
    },
    {
     "key": "C",
     "text": "Usar ejecución directa con un prompt pidiendo a Claude que analice todos los enfoques e implemente el que determine como mejor."
    },
    {
     "key": "D",
     "text": "Usar ejecución directa para implementar polling primero, luego evaluar si actualizar a WebSockets después."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Las actualizaciones en tiempo real implican trade-offs arquitectónicos entre WebSockets, Server-Sent Events y polling, incluyendo requisitos de infraestructura, soporte de navegador, complejidad operacional y necesidades del producto. El modo plan es apropiado antes de la implementación porque permite que Claude investigue la arquitectura existente, compare las opciones y produzca una propuesta de decisión para el equipo. La ejecución directa comprometería prematuramente un enfoque antes de entender los trade-offs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZB1Z43B6XT1EJRY3V",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "El CLAUDE.md de tu equipo incluye una regla: \"Usar indentación de 4 espacios y siempre ejecutar el formato Prettier\". A pesar de esto, las revisiones de código revelan que aproximadamente el 30% de los archivos que genera Claude Code usan formato inconsistente—a veces indentación de 2 espacios, a veces sin trailing commas. Agregar énfasis (\"IMPORTANTE: DEBÉS usar el formato Prettier\") reduce las violaciones a aproximadamente el 15%, pero no las elimina. ¿Cuál es la forma más efectiva de asegurar que todo el código generado tenga formato consistente?",
   "options": [
    {
     "key": "A",
     "text": "Agregar un hook Stop con una verificación basada en prompts que evalúe si el código generado sigue los estándares de formato y solicite a Claude que corrija las violaciones."
    },
    {
     "key": "B",
     "text": "Dividir las reglas de formato en archivos .claude/rules/ con alcance de ruta que se cargan cuando Claude trabaja en tipos de archivos coincidentes."
    },
    {
     "key": "C",
     "text": "Extraer las reglas de formato en un skill dedicado que Claude carga automáticamente al generar código, con ejemplos más detallados del formato correcto."
    },
    {
     "key": "D",
     "text": "Configurar un hook PostToolUse con un matcher Edit|Write que ejecute automáticamente Prettier en cada archivo que Claude modifica."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El formato es una preocupación de post-procesamiento determinista, por lo que debe ser aplicado por herramientas en lugar de depender del cumplimiento del prompt. Un hook `PostToolUse` que coincida con `Edit` y `Write` puede ejecutar automáticamente Prettier en los archivos modificados, eliminando la indentación inconsistente y los problemas de trailing comma sin importar lo que Claude generó inicialmente. Más énfasis en las instrucciones, reglas con alcance de ruta o skills pueden mejorar el comportamiento, pero aún dependen de que el modelo siga la guía de formato."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZDVDWJPPBH92R5AG6",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Necesitás agregar una validación de fechas que asegure que las fechas de los eventos sean en el futuro. Esto requiere agregar una declaración condicional a una función existente en un único archivo. ¿Cuál es el enfoque más apropiado?",
   "options": [
    {
     "key": "A",
     "text": "Comenzar con el modo de pensamiento extendido habilitado para asegurar un razonamiento exhaustivo sobre la lógica de validación"
    },
    {
     "key": "B",
     "text": "Entrar en modo plan para analizar cómo la validación podría impactar otras partes del flujo de reservas"
    },
    {
     "key": "C",
     "text": "Usar ejecución directa para hacer el cambio"
    },
    {
     "key": "D",
     "text": "Entrar primero en modo plan para crear una estrategia de implementación detallada antes de hacer el cambio"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Esta es una modificación simple y bien delimitada: agregar un condicional de validación a una función existente en un único archivo. La ejecución directa es apropiada para cambios con alcance claro y bajo riesgo arquitectónico. El modo plan es mejor para cambios en múltiples archivos, decisiones arquitectónicas o tareas con múltiples enfoques viables, y el pensamiento extendido es innecesario para una verificación de validación directa."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ5F73KKZGD0DRDTWH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo frecuentemente migra componentes de React a Vue. Escribiste un flujo de trabajo paso a paso para que Claude Code lo siga durante cada migración, y querés que todos los desarrolladores del equipo lo invoquen escribiendo /migrate-component. El flujo de trabajo debe mantenerse sincronizado a medida que el equipo lo itera. ¿Dónde deberías colocar el archivo skill?",
   "options": [
    {
     "key": "A",
     "text": "En .claude/skills/migrate-component/SKILL.md en la raíz del proyecto, comprometido en el control de versiones"
    },
    {
     "key": "B",
     "text": "En el .claude/settings.json del proyecto usando una entrada skillOverrides para registrar y definir el flujo de trabajo"
    },
    {
     "key": "C",
     "text": "Como un bloque de instrucciones detallado en el archivo CLAUDE.md de la raíz del proyecto"
    },
    {
     "key": "D",
     "text": "En ~/.claude/skills/migrate-component/SKILL.md en la máquina de cada desarrollador"
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Un flujo de trabajo que debe ser compartido por todos los desarrolladores y mantenerse sincronizado a medida que el equipo lo mejora pertenece al repositorio, no a la configuración personal de cada desarrollador. Un skill de proyecto en `.claude/skills/migrate-component/SKILL.md` puede versionarse, revisarse y actualizarse con el codebase. `CLAUDE.md` cargaría el flujo de trabajo en cada conversación de forma innecesaria, y los archivos de skill por usuario irían divergiendo entre máquinas."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZTTMC0NNFJSM3STY5",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo conectó un servidor MCP personalizado que proporciona plantillas de flujo de trabajo DevOps. El servidor expone varios prompts MCP (como deploy_checklist e incident_response) además de herramientas. ¿Cómo se vuelven accesibles estos prompts MCP dentro de Claude Code?",
   "options": [
    {
     "key": "A",
     "text": "Se agregan al registro de herramientas de Claude Code junto con las herramientas del servidor, invocados automáticamente por el modelo cuando son relevantes para la tarea."
    },
    {
     "key": "B",
     "text": "Se anteponen automáticamente a cada conversación como contexto adicional de nivel de sistema, influyendo en el comportamiento de Claude durante toda la sesión."
    },
    {
     "key": "C",
     "text": "Se exponen como recursos mencionables con @ junto a los archivos, obtenidos y adjuntados a tu mensaje cuando se los referencia."
    },
    {
     "key": "D",
     "text": "Aparecen como slash commands (por ejemplo, /mcp__servername__deploy_checklist) que podés invocar, con argumentos pasados después del nombre del comando."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los prompts MCP son plantillas de prompt reutilizables expuestas por el servidor. En Claude Code, se exponen para invocación explícita como slash commands, usando una forma con namespace que identifica el servidor MCP y el nombre del prompt. No son herramientas seleccionadas automáticamente por el modelo, no son contexto de sistema antepuesto a cada conversación, y no son recursos mencionables con `@` como archivos o catálogos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZBQMDNJ030HT06WYY",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu monorepo contiene estándares de código compartidos en /docs/standards/: security-rules.md (para servicios que manejan datos de usuario), testing-patterns.md (para todos los paquetes) y api-conventions.md (para servicios expuestos como API). Tus 15 paquetes están organizados por dominio de feature (/packages/auth/, /packages/billing/, /packages/notifications/, etc.) sin convenciones de nombres que indiquen cuáles manejan datos de usuario o exponen APIs. Se espera que los mantenedores de paquetes configuren sus propios ajustes de desarrollo local, ya que conocen los requisitos de dominio de su paquete. Actualmente, todos los archivos CLAUDE.md de los paquetes duplican los tres estándares, aplicando guía irrelevante. ¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Poner todos los estándares en el CLAUDE.md raíz con instrucciones de anulación como \"ignorar security-rules.md al trabajar en paquetes que no manejan datos de usuario\"."
    },
    {
     "key": "B",
     "text": "Crear un shared-standards.md que use @imports para combinar los tres estándares, luego hacer que el CLAUDE.md de cada paquete importe ese archivo combinado."
    },
    {
     "key": "C",
     "text": "Crear archivos .claude/rules/ para cada estándar con rutas en frontmatter YAML que listen cada directorio de paquete donde ese estándar debe aplicarse."
    },
    {
     "key": "D",
     "text": "Usar @imports en el CLAUDE.md de cada paquete para referenciar solo los archivos de estándares relevantes para ese paquete, basándose en el conocimiento de dominio del mantenedor."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los estándares son modulares, pero la aplicabilidad depende del conocimiento de dominio que no puede inferirse de las rutas o nombres de los paquetes. Usar `@import` en el `CLAUDE.md` de cada paquete permite que los mantenedores incluyan solo los estándares que realmente aplican a su paquete mientras los archivos fuente permanecen centralizados en `/docs/standards/`. Las instrucciones de ignorar a nivel raíz y las importaciones combinadas seguirían cargando guía irrelevante, mientras que las reglas con alcance de ruta requieren mantener listas explícitas de paquetes para criterios que no son obvios a partir de las rutas."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZHNQKFFB0S2RA4FFT",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Documentaste las convenciones de manejo de errores de API en un archivo CLAUDE.md en la raíz del proyecto, especificando que los handlers de endpoints deben usar una clase ApiError personalizada. Después de varias sesiones, notás que Claude Code a veces sigue estas convenciones y a veces usa bloques try/catch genéricos con mensajes de texto. La inconsistencia parece aleatoria entre diferentes sesiones de codificación. ¿Cuál es el primer paso diagnóstico más eficiente?",
   "options": [
    {
     "key": "A",
     "text": "Buscar instrucciones conflictivas en ~/.claude/CLAUDE.md o ~/.claude/rules/ que puedan estar anulando las convenciones del proyecto."
    },
    {
     "key": "B",
     "text": "Crear reglas específicas de ruta en .claude/rules/handlers.md con frontmatter YAML que delimite las instrucciones de manejo de errores a los archivos de handlers de API."
    },
    {
     "key": "C",
     "text": "Agregar ejemplos de código más detallados a tu CLAUDE.md que muestren el patrón exacto de uso de ApiError para diferentes tipos de endpoints."
    },
    {
     "key": "D",
     "text": "Ejecutar /memory para verificar qué archivos de memoria están cargados y confirmar que tu CLAUDE.md está incluido."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Antes de cambiar la configuración, el paso diagnóstico más rápido es confirmar si Claude Code está realmente cargando el archivo de memoria del proyecto esperado en las sesiones donde el comportamiento es inconsistente. `/memory` muestra qué archivos de memoria están activos, ayudando a identificar problemas de jerarquía o carga. Agregar ejemplos o reglas específicas de ruta puede ser útil después, pero primero no verifica que el `CLAUDE.md` existente esté siendo aplicado."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S03YTS2VVG2YJP4V6Z",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo tiene tres requisitos para el comportamiento de Claude Code en tu proyecto:\n\n1. Claude nunca debe modificar archivos en el directorio db/migrations/\n2. Claude debería preferir tu módulo de logging personalizado sobre console.log\n3. Todos los archivos TypeScript deben formatearse automáticamente con Prettier después de cada edición\n\nLos tres están actualmente escritos como instrucciones en el CLAUDE.md de tu proyecto. Durante una sesión de refactoring compleja, un desarrollador descubre que Claude editó un archivo de migración, violando el requisito #1. ¿Cómo deberías reestructurar estos requisitos en los mecanismos de configuración de Claude Code?",
   "options": [
    {
     "key": "A",
     "text": "Reescribir los tres requisitos en CLAUDE.md usando lenguaje directivo más fuerte y agregar ejemplos few-shot que demuestren a Claude rechazando editar archivos de migración y ejecutando Prettier después de las ediciones."
    },
    {
     "key": "B",
     "text": "Agregar Edit(./db/migrations/**) a permissions.deny en la configuración del proyecto, mantener la preferencia de logging en CLAUDE.md y agregar un hook PostToolUse en la herramienta Edit que ejecute Prettier en los archivos TypeScript modificados."
    },
    {
     "key": "C",
     "text": "Mover los tres requisitos a .claude/rules/ como reglas con alcance de ruta: una apuntando a db/migrations/** que prohíbe editar esos archivos, y otras apuntando a **/*.ts para la convención de logging y la instrucción de formato."
    },
    {
     "key": "D",
     "text": "Configurar hooks para los tres: un script de hook PreToolUse que bloquee las llamadas Edit dirigidas a db/migrations/, un script de hook PreToolUse que agregue contexto de convención de logging antes de las ediciones, y un hook PostToolUse que ejecute Prettier después de ediciones de TypeScript."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Estos requisitos tienen diferentes necesidades de aplicación. “Nunca modificar migraciones” es una regla de seguridad estricta y debe ser aplicada por permisos en lugar de instrucciones de prompt. Preferir un módulo de logging personalizado es una convención de código de todo el proyecto, por lo que `CLAUDE.md` es apropiado. El formato después de las ediciones es automatización determinista, por lo que un hook `PostToolUse` debe ejecutar Prettier en los archivos TypeScript modificados. Una redacción más fuerte o reglas de prompt con alcance de ruta aún dependen del cumplimiento del modelo para requisitos que deben aplicarse mecánicamente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0CPT5MC0XY26NDZHH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Una auditoría de seguridad requiere actualizar tu biblioteca de autenticación de v2 a v3. La guía de migración documenta cambios que rompen compatibilidad: authenticate() ahora devuelve una Promise en lugar de aceptar un callback, el tipo User tiene campos reestructurados y se eliminaron tres métodos deprecados. Grep muestra que la biblioteca se importa en 45 archivos en varios módulos. ¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Pegar los cambios que rompen compatibilidad de la guía de migración en tu prompt y usar ejecución directa para actualizar todos los usos en los 45 archivos."
    },
    {
     "key": "B",
     "text": "Actualizar la versión de la dependencia, ejecutar el conjunto de tests y usar Claude Code para corregir cada fallo a medida que aparece."
    },
    {
     "key": "C",
     "text": "Crear un comando slash personalizado que encapsule las transformaciones de migración y ejecutarlo contra cada archivo sin exploración previa del código."
    },
    {
     "key": "D",
     "text": "Entrar en plan mode para explorar el uso de la librería en todos los módulos, mapear los caminos de código afectados y luego crear una estrategia de migración antes de implementar."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Esta es una migración multi-archivo con cambios de API que rompen compatibilidad en 45 archivos. El plan mode es apropiado porque Claude Code debe primero mapear los diferentes patrones de uso, entender los cambios de callback a Promise, identificar los supuestos del tipo `User` afectados y planificar cómo reemplazar los métodos eliminados antes de editar. La ejecución directa o las correcciones basadas en fallos de tests probablemente producirían cambios fragmentados y perderían los patrones entre módulos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0S92C7QHM5RM2ANMW",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Estás implementando una capa de caché para respuestas de API para acelerar el endpoint /products. Tenés una idea aproximada—Redis con un TTL de 5 minutos—pero sos nuevo en caching en producción y no estás seguro de qué otras consideraciones requiere una implementación robusta. ¿Cuál es la forma más efectiva de iniciar tu flujo de trabajo iterativo?",
   "options": [
    {
     "key": "A",
     "text": "Empezar con una solicitud mínima: 'Agregar caché Redis a /products con TTL de 5 minutos.' Agregar funcionalidades y corregir problemas a través de prompts de seguimiento a medida que surjan durante las pruebas."
    },
    {
     "key": "B",
     "text": "Usar plan mode para analizar la implementación actual del endpoint /products y luego proporcionar los requisitos de caché una vez que Claude explique cómo está estructurado el código existente."
    },
    {
     "key": "C",
     "text": "Escribir una especificación con los requisitos conocidos y marcadores 'TBD' para las áreas inciertas, haciendo que Claude proponga soluciones para cada TBD mientras implementa."
    },
    {
     "key": "D",
     "text": "Pedirle a Claude que te entreviste sobre los requisitos de caché antes de implementar, identificando consideraciones como estrategias de invalidación, capas de caché, garantías de consistencia y modos de fallo."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El usuario tiene una idea de implementación aproximada pero le falta claridad sobre los requisitos de producción. El patrón de entrevista es apropiado porque ayuda a identificar consideraciones de diseño que el desarrollador puede no haber anticipado, como invalidación, consistencia, comportamiento de fallback, cache stampedes, observabilidad y modos de fallo. Empezar con una implementación mínima o completar marcadores `TBD` probablemente perdería decisiones importantes, mientras que el plan mode solo puede analizar la estructura del código sin obtener los requisitos de producto y operacionales faltantes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0671ZK85V2M9E2RWZ",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Estás implementando un algoritmo de recorrido de grafos complejo con requisitos de rendimiento específicos y casos borde a manejar (nodos desconectados, ciclos, aristas ponderadas). Querés estructurar tu flujo de trabajo para un refinamiento iterativo eficiente con Claude. ¿Qué enfoque permitirá más efectivamente la mejora progresiva a lo largo de múltiples iteraciones?",
   "options": [
    {
     "key": "A",
     "text": "Escribir un conjunto de tests que cubra el comportamiento esperado, los casos borde y los requisitos de rendimiento antes de la implementación. Pedirle a Claude que escriba código que pase los tests, luego iterar compartiendo los fallos de tests con cada solicitud de refinamiento."
    },
    {
     "key": "B",
     "text": "Proporcionarle a Claude una implementación de referencia de la documentación, luego pedirle que reescriba el código para que coincida con el estilo de tu código y agregue el manejo de casos borde requeridos, comparando los resultados con la referencia."
    },
    {
     "key": "C",
     "text": "Proporcionarle a Claude una especificación detallada en lenguaje natural del algoritmo, incluyendo todos los requisitos y casos borde. Revisar cada salida manualmente y proporcionar retroalimentación descriptiva sobre qué comportamiento necesita cambiar."
    },
    {
     "key": "D",
     "text": "Hacer que Claude investigue extensamente el algoritmo y cree un plan de implementación detallado usando pensamiento extendido, luego implementar la solución completa basándose en ese plan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Para un algoritmo complejo, los tests proporcionan retroalimentación concreta y repetible a lo largo de las iteraciones. Cubrir nodos desconectados, ciclos, aristas ponderadas, salidas esperadas y restricciones de rendimiento le da a Claude un objetivo claro y convierte cada refinamiento en una respuesta específica a los casos que fallan. La revisión en lenguaje natural sola es menos precisa, y un plan detallado no garantiza la corrección en los casos borde sin retroalimentación ejecutable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S04CBZ9PEMR21VH3N1",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo quiere que Claude siga un checklist detallado de revisión de código (8 ítems que cubren cambios de API, cobertura de tests, documentación, seguridad, etc.) al revisar pull requests. El equipo también usa Claude extensamente para otras tareas: escribir nuevas funcionalidades, depurar problemas de producción y generar documentación. Actualmente, los desarrolladores pegan el checklist al inicio de cada sesión de revisión. ¿Qué enfoque aborda mejor esta necesidad del flujo de trabajo?",
   "options": [
    {
     "key": "A",
     "text": "Configurar plan mode como predeterminado para las sesiones de revisión de código."
    },
    {
     "key": "B",
     "text": "Crear un subagente de revisión dedicado con el checklist embebido en su configuración."
    },
    {
     "key": "C",
     "text": "Agregar el checklist al archivo CLAUDE.md del proyecto bajo una sección 'Code Review'."
    },
    {
     "key": "D",
     "text": "Crear un comando slash /review que contenga el checklist, invocado al iniciar las revisiones."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Un comando slash se adapta a un flujo de trabajo repetible que los desarrolladores inician intencionalmente solo para revisiones de pull requests. Mantiene el checklist detallado fuera de las sesiones ordinarias de funcionalidades, depuración y documentación, a la vez que le da al equipo un procedimiento de revisión consistente sin pegar el checklist manualmente cada vez."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0REMK190Z3ZJVQZEG",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo está configurando servidores MCP en Claude Code. Querés agregar un servidor compartido de búsqueda de venues al que todos los miembros del equipo deberían tener acceso, y personalmente querés agregar un servidor experimental de playlists de música que solo vos estás probando. ¿Qué enfoque de configuración aplica correctamente los scopes de servidores MCP?",
   "options": [
    {
     "key": "A",
     "text": "Agregar el servidor de venues a ~/.claude.json y el servidor de playlists a .mcp.json"
    },
    {
     "key": "B",
     "text": "Agregar ambos servidores al archivo .mcp.json a nivel de proyecto"
    },
    {
     "key": "C",
     "text": "Agregar el servidor de venues a .mcp.json y el servidor de playlists a ~/.claude.json"
    },
    {
     "key": "D",
     "text": "Agregar ambos servidores a tu ~/.claude.json local"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Un servidor que todos los miembros del equipo deben usar pertenece al `.mcp.json` con scope de proyecto, porque puede compartirse con el repositorio. Un servidor experimental personal pertenece al `~/.claude.json` con scope de usuario, porque debe afectar solo al desarrollador que lo está probando."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0TW6567F0VNBA1TC4",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Un bug crítico está afectando a los usuarios de producción. Los logs de error muestran excepciones en el módulo OrderProcessing con un stack trace claro que apunta a una función específica. Nunca trabajaste con este módulo antes. ¿Cuál es el enfoque más efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Entrar en plan mode para explorar la arquitectura y dependencias del módulo antes de intentar cualquier corrección."
    },
    {
     "key": "B",
     "text": "Empezar con ejecución directa para recopilar información inicial, luego cambiar a plan mode para diseñar una solución integral antes de implementar cualquier cambio."
    },
    {
     "key": "C",
     "text": "Usar ejecución directa para examinar el stack trace, leer el código relevante e implementar una corrección una vez que se identifica la causa raíz."
    },
    {
     "key": "D",
     "text": "Usar plan mode para analizar el error en el contexto del diseño del módulo, enumerar las posibles causas raíz y priorizar las correcciones sistemáticamente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El problema es urgente y ya está bien delimitado por los logs y el stack trace. La ejecución directa permite a Claude inspeccionar la función que falla, seguir el camino de código inmediato, identificar la causa raíz y aplicar una corrección específica sin gastar tiempo en una fase de planificación arquitectónica más amplia que no es necesaria dada la evidencia disponible."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0C1M5J6RM7SWACX1G",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Le pediste a Claude Code que construya una funcionalidad de generación de reportes PDF. La implementación inicial consulta la base de datos correctamente, pero la salida tiene problemas de formato: las columnas de la tabla son demasiado estrechas causando truncamiento de contenido, las fechas se muestran sin el formato correcto y el manejo de saltos de página es incorrecto. Notaste que estos problemas interactúan—cambiar el ancho de las columnas afecta cómo se renderizan las fechas, y los saltos de página dependen de la altura del contenido. ¿Cuál es el enfoque más efectivo para iterar hacia una solución funcional?",
   "options": [
    {
     "key": "A",
     "text": "Abordar el problema del ancho de columnas primero con medidas específicas, verificar que funcione, luego corregir el formato de fechas dentro de las columnas corregidas, luego ajustar los saltos de página—testeando después de cada cambio."
    },
    {
     "key": "B",
     "text": "Empezar de cero con un prompt detallado que especifique todos los requisitos de formato desde el principio."
    },
    {
     "key": "C",
     "text": "Mostrarle a Claude un ejemplo de un reporte correctamente formateado y pedirle que coincida con esa salida, en lugar de listar los problemas técnicos específicos."
    },
    {
     "key": "D",
     "text": "Proporcionar los tres problemas en un único mensaje detallado con especificaciones exactas para cada uno, permitiendo que Claude los aborde juntos en una sola actualización."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los problemas de formato interactúan entre sí, por lo que corregirlos de uno en uno puede hacer que los cambios posteriores invaliden el trabajo anterior. Proporcionar los requisitos de ancho de columnas, formato de fechas y saltos de página juntos le da a Claude el conjunto completo de restricciones necesarias para producir una actualización de layout coherente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "EED2HX89TBGVDW4VD66W0VN1Q0",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "El revisor automatico de tu CI reincide en marcar decisiones deliberadas de tu equipo: force-unwrap de opcionales en archivos de test, clases coordinadoras grandes propias de tu arquitectura, e imports de modulos internos etiquetados como deprecated en el SDK publico. Alrededor del 30% de los hallazgos terminan descartados como falsos positivos propios del proyecto. ¿Que opcion impide de raiz que el modelo produzca esos hallazgos, entregandole las convenciones del proyecto como contexto permanente en cada revision?",
   "options": [
    {
     "key": "A",
     "text": "Construir filtros de palabras clave en post-procesamiento que supriman hallazgos que contengan términos como 'force unwrap', 'large class' o 'deprecated import' antes de que los resultados lleguen a los desarrolladores."
    },
    {
     "key": "B",
     "text": "Hacer que los desarrolladores agreguen comentarios de supresión en línea en las líneas marcadas y preprocesar los diffs para excluir las líneas suprimidas antes de enviar el código al modelo."
    },
    {
     "key": "C",
     "text": "Configurar la revisión para analizar solo las líneas modificadas en el diff sin el contexto del archivo circundante, reduciendo la cantidad de código que el modelo evalúa por revisión."
    },
    {
     "key": "D",
     "text": "Documentar los patrones aceptados y las convenciones intencionales del equipo en el archivo CLAUDE.md del proyecto, para que el modelo reciba este contexto en cada revisión."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "`CLAUDE.md` es el mecanismo a nivel de proyecto para proporcionar a Claude Code contexto persistente, como convenciones de codificación, criterios de revisión, estándares de prueba y patrones arquitectónicos aceptados. Como el problema es que el modelo marca repetidamente decisiones intencionales específicas del proyecto, la solución correcta es proporcionar esas convenciones antes de que se genere la revisión. Los filtros de palabras clave, los comentarios de supresión o la reducción de contexto solo ocultan o limitan los hallazgos después de que el modelo ya ha malinterpretado el proyecto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Z8XWZA26WS3ZCV156R5G762016",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Ya en marcha, tu revision automatizada muestra alta precision pero recall bajo: se le escapan bugs reales. Al investigar descubres que el prompt le pide a Claude 'reportar solo problemas de alta confianza de los que este seguro' y 'errar del lado de no comentar'. Al equipo le gusta el bajo ruido, pero una race condition que provoco una caida en produccion estaba a la vista en un PR revisado y no se reporto. Debes elevar sustancialmente la deteccion de bugs sin disparar los falsos positivos a niveles inmanejables. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Agregar ejemplos few-shot detallados que demuestren las categorías de bugs que Claude debería marcar —race conditions, null dereferences, brechas en el manejo de errores— manteniendo la instrucción de filtrado de alta confianza para preservar los niveles actuales de precisión."
    },
    {
     "key": "B",
     "text": "Ampliar la ventana de contexto incluyendo archivos de prueba relacionados, historial de git reciente y el grafo de dependencias del módulo junto con el diff, dando a Claude señales más ricas para evaluar la severidad de los problemas."
    },
    {
     "key": "C",
     "text": "Dividir la revisión en una etapa de hallazgos donde el objetivo de Claude es la cobertura —marcando cada problema potencial con metadata de confianza y severidad— y una etapa separada que filtra esos hallazgos."
    },
    {
     "key": "D",
     "text": "Eliminar las instrucciones de filtrado conservadoras y pedirle a Claude que reporte todos los problemas potenciales, luego aplicar un filtro programático para deduplicar y suprimir las categorías que históricamente generan falsos positivos."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El prompt actual suprime problemas reales porque optimiza demasiado agresivamente para la certeza. Una revisión en dos etapas separa el recall de la publicación: primero, Claude identifica problemas potenciales de manera amplia y adjunta metadata estructurada de confianza y severidad; luego, un paso de umbral separado decide qué llega a los desarrolladores. Esto preserva la visibilidad de bugs graves como las race conditions, mientras gestiona los falsos positivos. Mantener la instrucción de alta confianza continuaría perdiendo bugs, y simplemente agregar más contexto o filtros post-procesamiento no resuelve directamente el problema de recall."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6DN5CYDE34SRDNTTPRY6YBR9V2",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revision automatizada emite muchos hallazgos por PR, pero los desarrolladores descartan cerca de la mitad como 'no vale la pena'. Al analizarlos ves que los descartados suelen ser tecnicamente correctos pero se refieren a preferencias de estilo menores o a patrones aceptables en tu codebase. Antes de sumar complejidad de infraestructura, ¿que ajuste en el diseño del prompt reduciria mas los descartes sin perder la deteccion de problemas reales?",
   "options": [
    {
     "key": "A",
     "text": "Agregar instrucciones pidiéndole a Claude que califique la confianza de cada hallazgo (1-10) e incluir solo los hallazgos con calificación 8 o superior"
    },
    {
     "key": "B",
     "text": "Implementar un modelo de clasificación secundario que filtre los hallazgos de Claude basándose en la aceptación predicha por los desarrolladores"
    },
    {
     "key": "C",
     "text": "Agregar criterios explícitos que definan qué problemas reportar (bugs, seguridad) versus cuáles omitir (estilo menor, patrones locales)"
    },
    {
     "key": "D",
     "text": "Agregar instrucciones para 'reportar solo los hallazgos de los que estés muy seguro de que son problemas reales'"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Los hallazgos descartados no son necesariamente incorrectos; simplemente son de bajo valor para esta codebase. El mejor cambio de prompt es definir categorías claras de qué debe reportarse y qué debe omitirse, como reportar bugs y problemas de seguridad mientras se excluyen preferencias de estilo menores o patrones locales aceptados. Las instrucciones basadas en confianza son demasiado vagas y pueden suprimir problemas importantes, mientras que agregar otro modelo introduce infraestructura innecesaria antes de corregir los criterios del prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "87X48AGC7TC5CRD83R3X64AGSC",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revisor usa un unico prompt que abarca seguridad, diseño de API y correccion de logica de negocio. Tu suite de evaluacion arroja recall alto en diseño de API (82%) pero bajo en casos borde de logica de negocio (34%). Al sumar ejemplos few-shot de bugs de logica, el recall de logica sube a 41% pero el de diseño de API baja a 68%. ¿Como resolver este trade-off para mejorar la deteccion en ambas categorias?",
   "options": [
    {
     "key": "A",
     "text": "Reemplazar los ejemplos few-shot por un checklist detallado de casos extremos de lógica específicos a verificar, como división por cero en cálculos de puntaje y condiciones de límite en umbrales de calificación."
    },
    {
     "key": "B",
     "text": "Dividir la revisión en prompts separados y enfocados —uno para seguridad y diseño de API, otro para lógica de negocio— cada uno con ejemplos dedicados, y luego consolidar los hallazgos antes de publicarlos."
    },
    {
     "key": "C",
     "text": "Actualizar a un tier de modelo más potente, ya que su razonamiento más sólido manejará ambos tipos de preocupaciones en un único prompt y eliminará el trade-off de recall."
    },
    {
     "key": "D",
     "text": "Proporcionar el repositorio completo como contexto en lugar de solo los archivos modificados y el código circundante, dando al modelo mayor visibilidad sobre los patrones de lógica de negocio."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La evaluación muestra interferencia entre prompts: agregar ejemplos para una preocupación mejora el recall de lógica de negocio pero perjudica el recall de diseño de API. Dividir la revisión en pasadas enfocadas permite que cada prompt use criterios y ejemplos adaptados a su categoría, y luego consolidar los resultados para los desarrolladores. Un checklist puede ayudar con los bugs de lógica pero no aborda la regresión en el diseño de API, y una actualización del modelo o más contexto del repositorio no resuelve directamente el conflicto creado al combinar objetivos de revisión distintos en un único prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RMQT60GGMBS5P1HW7FDS1PTFGH",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Al final de cada ciclo semanal de release, un paso de tu pipeline clasifica y resume unos 200 commits para generar las notas de version. Hoy cada commit se manda como una llamada separada a la Messages API con un modelo tier Sonnet. Las notas no hacen falta hasta la mañana siguiente (toleran ~12 horas de latencia). Necesitas bajar el costo de API por token de este paso conservando el mismo modelo y los mismos prompts (sin cambiar tier ni calidad de salida). ¿Que enfoque cumple todas estas restricciones?",
   "options": [
    {
     "key": "A",
     "text": "Emitir las 200 solicitudes de la Messages API en paralelo usando conexiones concurrentes, ya que la concurrencia reduce el precio por token que cobra la API."
    },
    {
     "key": "B",
     "text": "Cambiar las llamadas de resumen del modelo de tier Sonnet al modelo de tier Haiku para aprovechar las tarifas por token más bajas de Haiku."
    },
    {
     "key": "C",
     "text": "Concatenar los 200 mensajes de commit en una única solicitud de la Messages API y hacer que el modelo devuelva todos los resúmenes en una respuesta, ya que menos solicitudes siempre reduce el costo total de tokens."
    },
    {
     "key": "D",
     "text": "Enviar las 200 solicitudes a la Message Batches API con custom_ids únicos y recuperar los resultados una vez que termine el batch, lo que aplica un descuento del 50% a todos los tokens de entrada y salida."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Esta carga de trabajo tolera la latencia y no requiere resultados hasta la mañana siguiente, por lo que se adapta al procesamiento por lotes. La Message Batches API mantiene el mismo modelo y prompts mientras reduce el costo de tokens de entrada y salida, y los valores de `custom_id` permiten correlacionar el resultado de cada commit después del procesamiento. Las llamadas paralelas a la Messages API no reducen el precio por token, cambiar a Haiku viola el requisito de mismo modelo, y concatenar todos los commits cambia la estructura del prompt y puede perjudicar la correlación o la calidad del output."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "X57PN5WS5KBR0GXNPJ4ZHDXSM6",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revision de codigo automatizada deja pasar bugs reales en los PRs. Investigando, ves que el prompt contiene: 'Marca solo problemas criticos que definitivamente causarian fallas en produccion. Ignora lo menor y todo aquello de lo que no estes seguro.' Los desarrolladores confirman que varios bugs perdidos son errores logicos reales que el modelo si investigo pero decidio no reportar. El equipo exige que la salida siga siendo estructurada (cada hallazgo con metadata) y accionable. ¿Que cambio en el prompt elimina la causa de los hallazgos suprimidos y conserva la salida estructurada y etiquetada para filtrar despues?",
   "options": [
    {
     "key": "A",
     "text": "Agregar una segunda pasada de revisión que vuelva a leer el diff usando el mismo prompt, buscando cualquier cosa que la primera pasada pueda haber omitido."
    },
    {
     "key": "B",
     "text": "Instruir al modelo para que reporte todos los hallazgos con un nivel de confianza y una etiqueta de severidad, dejando el filtrado para un paso posterior."
    },
    {
     "key": "C",
     "text": "Eliminar todas las instrucciones relacionadas con severidad del prompt y dejar que el modelo use su criterio predeterminado sobre qué reportar."
    },
    {
     "key": "D",
     "text": "Habilitar el extended thinking e instruir al modelo para que razone paso a paso sobre cada cambio de código antes de producir su revisión."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Los bugs perdidos son causados por una instrucción que le indica al modelo no reportar nada incierto o por debajo de un umbral de severidad muy alto. Pedir todos los hallazgos con metadata de confianza y severidad elimina esa supresión mientras preserva el output estructurado para el filtrado posterior. Volver a ejecutar el mismo prompt conservador repetiría el mismo modo de fallo, eliminar toda la guía de severidad reduciría la estructura, y el extended thinking no aborda la instrucción que le indica al modelo retener hallazgos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "1ZW7B4F6FN4DRREWQAYMMAVPYP",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Con la revision automatizada activa, los desarrolladores reportan que ~35% de los hallazgos son falsos positivos con patrones consistentes: sugerencias de estilo que chocan con las convenciones del equipo, alertas de seguridad para patrones seguros en tu contexto de despliegue, y sugerencias de rendimiento que empeorarian tu caso de uso. Quieres bajar los falsos positivos sin perder la capacidad de detectar problemas reales. ¿Que enfoque le permite mejor al modelo generalizar su criterio a patrones de codigo nuevos que nunca vio?",
   "options": [
    {
     "key": "A",
     "text": "Incluir ejemplos few-shot en tu prompt mostrando fragmentos de código anotados que distingan los patrones aceptables de los problemas reales en cada categoría."
    },
    {
     "key": "B",
     "text": "Crear una especificación escrita completa de todos los patrones que no deben marcarse, luego incluir esta documentación completa en el system prompt."
    },
    {
     "key": "C",
     "text": "Implementar post-procesamiento que use coincidencia de palabras clave para filtrar hallazgos que contengan términos como 'convention', 'context-dependent' o 'trade-off'."
    },
    {
     "key": "D",
     "text": "Agregar instrucciones a tu system prompt para 'ser conservador', 'solo marcar problemas definitivos', y 'considerar que algunos patrones pueden ser intencionales'."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Los ejemplos few-shot son muy adecuados para juicios de revisión ambiguos porque muestran cómo distinguir patrones aceptables específicos del proyecto de problemas reales. Los ejemplos anotados para estilo, seguridad y rendimiento enseñan al modelo el límite de decisión subyacente para que pueda generalizar a código nuevo, en lugar de simplemente coincidir con una lista fija. Una lista de bloqueo completa es frágil, el filtrado por palabras clave ocurre demasiado tarde y puede ocultar problemas reales, y las instrucciones vagas como 'ser conservador' no proporcionan suficiente guía concreta."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Y96H1M9M3Y1C8DZ8TDN3GN78PF",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu pipeline de revision produce en promedio 18 hallazgos por PR. El feedback revela tres tipos de ruido: (1) estilo y formato que tu linter ya aplica en CI, (2) hallazgos sobre codigo de plantilla autogenerado bajo src/gen/, y (3) helpers de renderizado que son convenciones intencionales del proyecto pero se marcan por parecerse a anti-patrones. Apenas unos 4 hallazgos por PR son bugs logicos reales. ¿Cual es la forma mas efectiva de reducir este ruido sin perder la deteccion de problemas reales?",
   "options": [
    {
     "key": "A",
     "text": "Agregar el parámetro de prompt a la configuración de GitHub Action con instrucciones para suprimir hallazgos duplicados del linter, ignorar el código de plantilla generado, y aplicar requisitos de evidencia más estrictos para problemas relacionados con el renderizado."
    },
    {
     "key": "B",
     "text": "Agregar explicaciones detalladas al CLAUDE.md del proyecto describiendo qué patrones son intencionales, que el linting se maneja por separado en CI, y que el directorio src/gen/ contiene código de plantilla auto-generado."
    },
    {
     "key": "C",
     "text": "Crear un REVIEW.md en la raíz del repositorio con reglas de omisión para los checks aplicados por CI y los archivos generados, y un requisito de verificación de que los hallazgos relacionados con el renderizado deben citar una línea específica que demuestre comportamiento incorrecto."
    },
    {
     "key": "D",
     "text": "Configurar archivos de workflow de GitHub Action separados para cada área de código —uno para el código generado con hallazgos suprimidos, uno para el código de renderizado con instrucciones de revisión personalizadas, y un workflow general para todo lo demás."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El ruido proviene de la falta de contexto del proyecto: el modelo revisa el formato gestionado por el linter, los archivos generados y las convenciones de renderizado intencionales como si fueran defectos ordinarios. Poner esos detalles en `CLAUDE.md` proporciona a Claude Code guía persistente del proyecto durante la revisión, para que pueda evitar hallazgos de bajo valor mientras sigue detectando bugs lógicos reales. Dividir los workflows o filtrar de forma ad hoc agrega complejidad, y un parámetro de prompt puntual es menos mantenible que documentar las convenciones estables del repositorio donde Claude Code espera el contexto del proyecto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "BGED4HAR08KC0A1YNJQWVE9T98",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "En las pruebas iniciales del pipeline notas que revisar PRs grandes (50+ archivos) a veces supera los 20 minutos y cuesta $8-12 por corrida por los extensos bucles agenticos: Claude lee archivos, corre herramientas de analisis e itera muchas veces. Tu equipo necesita que cada invocacion se detenga al llegar a un numero fijo de iteraciones y a un monto fijo en dolares, aplicado por el propio Claude Code y no por el runner del job. ¿Que ajuste de configuracion impone directamente ambos limites por invocacion?",
   "options": [
    {
     "key": "A",
     "text": "Agregar --max-turns 10 --max-budget-usd 2.00 a la invocación de claude -p para limitar las iteraciones y el gasto."
    },
    {
     "key": "B",
     "text": "Configurar timeout-minutes: 5 en el paso del job de GitHub Actions y monitorear los costos por ejecución a través del dashboard de uso de la Anthropic Console."
    },
    {
     "key": "C",
     "text": "Cambiar el flag --model a un modelo más pequeño y económico para que cada iteración use menos tokens y tenga un costo por llamada menor."
    },
    {
     "key": "D",
     "text": "Configurar --permission-mode dontAsk para denegar automáticamente cualquier solicitud de permisos de herramientas que no esté en el conjunto explícitamente permitido."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El requisito es que Claude Code mismo detenga cada invocación después de un conteo de iteraciones fijo y una cantidad en dólares fija. El cap `--max-turns` limita las iteraciones agénticas, mientras que `--max-budget-usd` limita el gasto para esa ejecución. Un timeout de GitHub Actions y el dashboard de uso son controles externos en lugar de caps aplicados por Claude Code, cambiar modelos solo reduce el costo por token sin limitar los bucles, y el modo de permisos controla las aprobaciones de herramientas en lugar del conteo de iteraciones o el presupuesto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "TCWR4F9MX2YC5G4MXPV1TS7W4X",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu pipeline revisa unos 200 scripts de migracion de base de datos por dia via Message Batches API. Cada request del batch lleva un system prompt compartido de 8.000 tokens (guias de revision de migraciones mas documentacion de esquema) seguido del script individual. Ya pusiste breakpoints de cache_control en ese system prompt compartido en cada request, pero el monitoreo muestra solo 32% de cache hits, con los misses concentrados en las requests procesadas mas tarde dentro de la ventana del batch. ¿Que cambio ataca la causa raiz de esos misses sin agregar latencia de procesamiento secuencial?",
   "options": [
    {
     "key": "A",
     "text": "Mover los breakpoints de cache_control del system prompt al contenido del script de migración individual para cachear patrones de código similares entre revisiones."
    },
    {
     "key": "B",
     "text": "Agregar solicitudes de pre-calentamiento con max_tokens: 0 al inicio de cada batch para cargar el cache antes de que se ejecuten las solicitudes de revisión."
    },
    {
     "key": "C",
     "text": "Dividir las 200 solicitudes en 10 batches secuenciales de 20, enviando cada uno solo después de que el anterior termine, para mantener las solicitudes suficientemente cercanas en el tiempo para la reutilización del cache."
    },
    {
     "key": "D",
     "text": "Usar el TTL de cache extendido de 1 hora en lugar del TTL predeterminado de 5 minutos en tus breakpoints de cache."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El system prompt compartido es idéntico y ya tiene breakpoints de cache, por lo que las cache misses no son causadas por la ubicación del contenido. Se concentran en solicitudes procesadas más tarde en la ventana del batch, lo que apunta al cache que expira antes de que las solicitudes posteriores puedan reutilizarlo. Usar el TTL extendido de 1 hora aborda esa causa raíz mientras preserva el procesamiento paralelo del batch. Mover los breakpoints a scripts de migración variables reduciría la reutilización, el pre-calentamiento no previene la expiración posterior, y los batches secuenciales agregarían latencia innecesaria."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "DV3GR7KZ98MWBCB7750DE1AHAY",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu CI hace revisiones de codigo con foco en seguridad sobre unos 50 PRs diarios, hoy a $150/dia con la API sincrona. Las revisiones no son bloqueantes: los devs mergean cuando pasan los tests y atienden los hallazgos en commits posteriores. Evaluas la Message Batches API por su 50% de ahorro. ¿Que factor determina principalmente si el procesamiento por lotes es apropiado para este caso?",
   "options": [
    {
     "key": "A",
     "text": "Si puedes estructurar cada revisión como una única solicitud sin refinamiento multi-turno."
    },
    {
     "key": "B",
     "text": "Si tu procesamiento de resultados puede manejar revisiones que llegan en un orden diferente al enviado."
    },
    {
     "key": "C",
     "text": "Si el feedback de revisión que llega hasta 24 horas después de la creación del PR sigue siendo accionable."
    },
    {
     "key": "D",
     "text": "Si reducir la latencia por revisión de 30-60 segundos a casi instantánea importa para tu flujo de trabajo."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La Message Batches API es apropiada para trabajo no bloqueante y tolerante a la latencia porque intercambia garantías de latencia por menor costo. Dado que estas revisiones no bloquean los merges, la pregunta clave es si los hallazgos entregados más tarde, potencialmente hasta 24 horas después de la presentación, siguen siendo lo suficientemente útiles para commits posteriores. El orden de los resultados puede manejarse con identificadores, y la latencia casi instantánea no es la propuesta de valor del procesamiento por lotes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "04B32WWJ6TQSTJAXTHYGH78X7P",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tu revision automatizada llama a la API por cada PR usando tool_use con una herramienta report_findings que devuelve un array JSON de hallazgos (cada uno con file_path, line_number, severity, category y description). Probando con un PR grande que toca 30+ archivos, la respuesta llega al limite de max_tokens y el JSON se trunca a la mitad, haciendo fallar al parser del pipeline. ¿Cual es la forma mas efectiva de manejarlo?",
   "options": [
    {
     "key": "A",
     "text": "Dividir la revisión en múltiples llamadas a la API que analicen un subconjunto de los archivos modificados, luego combinar los arrays de hallazgos resultantes."
    },
    {
     "key": "B",
     "text": "Aumentar max_tokens al máximo del modelo e instruir a Claude para que mantenga las descripciones de hallazgos de menos de 50 palabras cada una."
    },
    {
     "key": "C",
     "text": "Agregar lógica de reintento que detecte JSON truncado y reenvíe la solicitud con instrucciones para reportar solo los hallazgos de severidad crítica y alta."
    },
    {
     "key": "D",
     "text": "Cambiar de tool_use a pedirle a Claude que devuelva los hallazgos como una lista en markdown."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El fallo es causado por una única revisión grande que produce más output estructurado del que cabe en `max_tokens`, resultando en JSON truncado. Dividir el PR en unidades de revisión más pequeñas mantiene cada respuesta de `tool_use` acotada y parseable mientras preserva el mismo esquema de hallazgos estructurado. Simplemente aumentar `max_tokens` puede seguir fallando en PRs muy grandes, reintentar con solo los hallazgos de alta severidad cambia el recall, y cambiar a Markdown elimina la estructura parseable por máquina de la que depende el pipeline."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JZ231XEBBNB26QY091WVZ2ND56",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "[ilegible]"
   },
   "prompt": "Tu pipeline ejecuta un `claude -p` con `--dangerously-skip-permissions` y un `--system-prompt` armado por concatenacion ('You are a code reviewer. Analyze the provided diff for bugs, security issues, and style violations.'), alimentando el diff por stdin. Las revisiones se completan y devuelven feedback, pero Claude solo comenta el texto del diff que recibe por pipe: nunca lee archivos vecinos del repo clonado para entender el contexto mas amplio, incluso cuando el diff toca una funcion llamada por muchos modulos. ¿Que cambio en la invocacion hara que Claude lea los archivos relacionados del repositorio sin perder tus instrucciones de revision personalizadas?",
   "options": [
    {
     "key": "A",
     "text": "Mantener --system-prompt y agregar --allowedTools \"Read,Glob,Grep\" para que el modo no interactivo -p permita las herramientas del sistema de archivos que de otro modo deshabilita."
    },
    {
     "key": "B",
     "text": "Eliminar --system-prompt por completo y colocar las instrucciones de revisión en un archivo CLAUDE.md en la raíz del repositorio, ya que --system-prompt es incompatible con el uso de herramientas bajo -p."
    },
    {
     "key": "C",
     "text": "Dejar de enviar el diff por stdin e incorporar el contenido del diff dentro del string del prompt, para que Claude Code trate la invocación como una sesión agéntica en lugar de un procesamiento de stream."
    },
    {
     "key": "D",
     "text": "Reemplazar --system-prompt con --append-system-prompt para que las instrucciones de revisión se agreguen al prompt predeterminado de Claude Code en lugar de sobrescribir la guía incorporada para usar herramientas de lectura de archivos y navegación de código."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "La invocación está reemplazando la guía predeterminada del sistema de Claude Code con un prompt personalizado mínimo, por lo que la ejecución se comporta como si solo debiera analizar el texto del diff enviado por stdin. Usar `--append-system-prompt` preserva las instrucciones incorporadas de Claude Code para navegar el repositorio con herramientas, mientras agrega los criterios de revisión personalizados. Simplemente permitir herramientas o mover el diff al prompt no soluciona la guía predeterminada sobrescrita, y `CLAUDE.md` es contexto del proyecto, no un reemplazo para las instrucciones de revisión a nivel de invocación."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KVHWCQRPM5QA9YW98NSCDV0ZRV",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Construiste una herramienta de revision basada en LLM que analiza PRs y emite hallazgos estructurados. Cada hallazgo es un objeto JSON con file_path, line_number, issue_category (p. ej. 'security', 'style') y description. Los desarrolladores pueden hacer 'dismiss' en cualquier hallazgo poco util; hoy se descarta el 35%. Quieres analizar esos descartes para entender que falla en tu sistema y mejorar tus prompts. ¿Que cambio en la estructura de salida seria mas util para ese analisis?",
   "options": [
    {
     "key": "A",
     "text": "Eliminar el campo issue_category y rastrear las tasas de descarte solo a nivel de hallazgo individual."
    },
    {
     "key": "B",
     "text": "Ampliar el campo description para incluir explicaciones más detalladas de por qué cada problema importa y cómo corregirlo."
    },
    {
     "key": "C",
     "text": "Agregar un campo model_confidence (0.0-1.0) y filtrar los hallazgos por debajo de un umbral calibrado contra las tasas históricas de descarte."
    },
    {
     "key": "D",
     "text": "Agregar un campo detected_pattern que registre la construcción de código (por ejemplo, \"single-letter loop variable\") que disparó cada hallazgo."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Para mejorar los prompts, el equipo necesita saber qué patrones de código recurrentes generan hallazgos descartados. `issue_category` es demasiado amplio, y el rastreo a nivel de hallazgo individual es demasiado granular para revelar fallas sistemáticas del prompt. Un campo `detected_pattern` permite segmentar los descartados por la construcción real que disparó el comentario de revisión, identificar patrones con alto índice de falsos positivos y refinar criterios o ejemplos para esos casos. El filtrado por confianza puede reducir el volumen, pero no explica qué está fallando en el sistema."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7N31V6D01ZK3XSTG82CV54EA93",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "scenario": {
    "title": "Claude Code para Integración Continua",
    "body": "Estás integrando Claude Code en tu pipeline de Integración Continua/Despliegue Continuo (CI/CD). El sistema ejecuta revisiones de código automatizadas, genera casos de prueba y proporciona feedback sobre pull requests. Debes diseñar prompts que brinden feedback accionable y minimicen los falsos positivos."
   },
   "prompt": "Tus prompts de revision incluyen tanto el cambio de implementacion como su archivo de tests, pero los comentarios del LLM no señalan caminos de codigo sin pruebas. El analisis muestra que el modelo detecta bien las funciones que no tienen ningun test, pero no identifica cuando ramas condicionales o caminos de manejo de errores dentro de funciones ya testeadas carecen de cobertura. ¿Cual es la forma mas efectiva de mejorar la deteccion de gaps de cobertura a nivel de ramas sin sobrecomplicar el pipeline?",
   "options": [
    {
     "key": "A",
     "text": "Agregar instrucciones explícitas que dirijan al modelo a enumerar cada rama condicional y camino de excepción, luego verificar que cada uno tenga una aserción de test correspondiente"
    },
    {
     "key": "B",
     "text": "Incluir ejemplos few-shot que muestren código con una rama sin cobertura junto al comentario de revisión que identifica el caso de test faltante específico"
    },
    {
     "key": "C",
     "text": "Implementar un pipeline multi-paso donde llamadas separadas al LLM primero extraigan todas las ramas condicionales, luego crucen cada una con las aserciones de test en un segundo paso"
    },
    {
     "key": "D",
     "text": "Reestructurar el prompt para intercalar implementación y tests, presentando cada función seguida inmediatamente de sus casos de test"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El modelo ya detecta funciones completamente sin tests, pero falla en el juicio más ambiguo de si ramas específicas y caminos de error están cubiertos. Los ejemplos few-shot demuestran directamente ese patrón de decisión: una función con tests puede tener igualmente una rama condicional o un camino de excepción sin cobertura, y la revisión debe nombrar el caso de test faltante. Esto mejora la detección a nivel de ramas sin agregar una arquitectura multi-paso. Un checklist o prompt reordenado puede ayudar, pero los ejemplos son más efectivos para enseñar el comportamiento de revisión matizado."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RQ2PHYH4QMF7Z5BCQ3DSJ26PXS",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Los usuarios reportan que los reportes finales a veces les falta profundidad en ciertos subtemas. Ves que el agente de analisis de documentos suele detectar brechas (por ejemplo, 'las fuentes hablan de autenticacion de API pero no de patrones de token refresh'), pero con el pipeline estricto actual ese insight no es accionable porque la busqueda ya termino. ¿Cual es el cambio arquitectonico mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador revise la salida del análisis en busca de indicadores de brecha y vuelva a invocar la búsqueda con consultas informadas por las brechas cuando se detecten."
    },
    {
     "key": "B",
     "text": "Hacer que el agente de síntesis adjunte puntajes de confianza a cada sección y marque las áreas con cobertura insuficiente para revisión manual."
    },
    {
     "key": "C",
     "text": "Agregar un agente de planificación de investigación antes de la fase de búsqueda que descomponga los temas en sub-preguntas específicas."
    },
    {
     "key": "D",
     "text": "Hacer que el agente de análisis reporte brechas específicas al coordinador, que dispara búsquedas dirigidas y vuelve a invocar el análisis hasta que sea suficiente."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El problema no es solo la planificación inicial; el agente de análisis está descubriendo brechas de cobertura concretas después de ver el material recuperado. Esas brechas necesitan convertirse en señales accionables en la arquitectura. Que el agente de análisis devuelva subtemas específicos faltantes al coordinador permite que este realice búsquedas dirigidas, pase las nuevas fuentes de vuelta por el análisis e itere hasta que la cobertura sea adecuada. Las marcas de confianza o la revisión manual solo exponen la debilidad después del hecho, y un paso solo de planificación no puede reaccionar a brechas descubiertas durante el análisis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "X9P1CYWHFRREQ9BSAHAAX4MQ4H",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de sintesis termina su paso inicial pero avisa que tres preguntas clave de investigacion quedan sin responder porque los agentes de busqueda web y analisis de documentos no hallaron informacion relevante sobre esos subtemas. Hoy el coordinador pasa directo a generar el reporte, produciendo reportes con cobertura incompleta. ¿Que cambio mejoraria mas la completitud de la investigacion?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador evalúe la salida de síntesis en busca de brechas, luego vuelva a delegar en la búsqueda web y el análisis de documentos con consultas dirigidas antes de invocar la síntesis nuevamente."
    },
    {
     "key": "B",
     "text": "Dar al agente de síntesis acceso directo a herramientas de búsqueda web para que pueda llenar de forma autónoma las brechas de conocimiento sin devolver el control al coordinador."
    },
    {
     "key": "C",
     "text": "Hacer que el agente de generación de reportes anote qué preguntas de investigación no pudieron responderse, para que los usuarios entiendan las limitaciones del resultado final."
    },
    {
     "key": "D",
     "text": "Aumentar la amplitud inicial de las consultas enviadas a la búsqueda web y análisis de documentos para reducir la probabilidad de omitir información relevante."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El agente de síntesis identificó preguntas de investigación sin respuesta específicas, por lo que el coordinador debería usar esas brechas para impulsar otro paso de investigación dirigida. Esto preserva la arquitectura liderada por el coordinador mientras permite que el pipeline mejore iterativamente la cobertura antes de la generación del reporte. Dar a síntesis acceso amplio de búsqueda debilita la separación de responsabilidades, solo anotar las limitaciones no mejora la completitud, y ampliar la búsqueda inicial es menos eficiente que usar las brechas concretas descubiertas durante la síntesis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "AY2QMDRTAYYPX46T34NTKNX3V4",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Terminadas las tareas de los subagentes de busqueda web y analisis de documentos, el coordinador debe poner en marcha al subagente de sintesis para que combine los hallazgos. ¿Cual es la forma correcta de proveerle al subagente de sintesis la informacion que necesita?",
   "options": [
    {
     "key": "A",
     "text": "Pasar identificadores de referencia y configurar el subagente con acceso de lectura a un almacén de memoria compartida donde otros subagentes depositaron sus resultados"
    },
    {
     "key": "B",
     "text": "Incluir los hallazgos completos de ambos subagentes directamente en el prompt del subagente de síntesis"
    },
    {
     "key": "C",
     "text": "Proveer al subagente con definiciones de herramientas que le permitan solicitar salidas de otros subagentes a través de callbacks"
    },
    {
     "key": "D",
     "text": "Iniciar el subagente con solo una breve descripción de tarea, confiando en la herencia automática de contexto del coordinador"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Los subagentes operan con su propio contexto, por lo que el subagente de síntesis no debe depender de la herencia automática de la conversación del coordinador. El coordinador necesita pasar directamente las salidas de búsqueda web y análisis de documentos, idealmente en una forma estructurada que preserve las afirmaciones, evidencia, metadatos de fuente y atribución. Las referencias a memoria compartida o los mecanismos de callback agregan indirección innecesaria, mientras que una breve descripción de tarea dejaría al agente de síntesis sin la evidencia que debe combinar."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "PRV2D002T4KCDVSBCJQZ2Z7701",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de busqueda web reunio varias fuentes relevantes para un tema. Ahora el agente de analisis de documentos necesita examinarlas. ¿Como fluye tipicamente la informacion entre estos dos subagentes especializados?",
   "options": [
    {
     "key": "A",
     "text": "El agente de búsqueda web invoca directamente al agente de análisis de documentos, pasando las fuentes descubiertas como parámetros."
    },
    {
     "key": "B",
     "text": "Ambos agentes acceden a un almacén de memoria compartida donde el agente de búsqueda web escribe los hallazgos y el agente de análisis de documentos los lee."
    },
    {
     "key": "C",
     "text": "El agente coordinador recibe la salida del agente de búsqueda web e incluye los hallazgos relevantes en el prompt al invocar al agente de análisis de documentos."
    },
    {
     "key": "D",
     "text": "Los agentes se comunican a través de una cola de mensajes basada en eventos, con el agente de análisis de documentos suscripto a los eventos de finalización de búsqueda web."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "En una arquitectura coordinador-subagente, los agentes especializados típicamente no se comunican directamente entre sí ni dependen de contexto compartido implícito. El coordinador gestiona la descomposición de tareas, la agregación de resultados y el enrutamiento de información. Después de que la búsqueda web se completa, el coordinador debe tomar los hallazgos de fuentes relevantes e incluirlos explícitamente al invocar al agente de análisis de documentos. Esto mantiene la comunicación observable y controlada mientras asegura que el siguiente subagente tenga el contexto que necesita."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JSM88JGAZNG8RNXS9MJ0CN135Y",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Al analizar casos legales complejos que citan multiples precedentes, el subagente de analisis de documentos los procesa de a uno. Un fallo emblematico con 12 precedentes tarda mas de 3 minutos en analizarse por completo. ¿Cual es la forma mas efectiva de bajar esa latencia sin perder la capacidad del coordinador de monitorear y depurar el sistema?",
   "options": [
    {
     "key": "A",
     "text": "Implementar una cola de mensajes donde las tareas de análisis de precedentes sean procesadas asíncronamente por un pool de agentes trabajadores"
    },
    {
     "key": "B",
     "text": "Crear una jerarquía de agentes recursiva donde los agentes de análisis subdividan el trabajo entre agentes hijos hasta alcanzar la granularidad de un solo precedente"
    },
    {
     "key": "C",
     "text": "Habilitar al subagente de análisis de documentos para que genere dinámicamente sus propios subagentes especializados cuando encuentre casos con muchas citas"
    },
    {
     "key": "D",
     "text": "Hacer que el coordinador genere subagentes de análisis de documentos en paralelo, cada uno manejando un subconjunto de precedentes, luego agregar los resultados antes de la síntesis"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El trabajo es naturalmente particionable por precedente, por lo que ejecutar múltiples subagentes de análisis de documentos en paralelo reduce la latencia. Mantener la generación y agregación en el coordinador preserva la observabilidad, el manejo de errores y la depurabilidad, porque el coordinador puede rastrear qué subconjunto analizó cada subagente y combinar los resultados antes de la síntesis. Las colas de mensajes, las jerarquías recursivas o los subagentes que generan sus propios subagentes agregan complejidad y hacen que el flujo de control sea más difícil de monitorear."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RHA2NS0FAFHZ1HVAVRGN4ZNC11",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Concluidas las tareas del agente de busqueda web y del de analisis de documentos, el coordinador invoca al agente de sintesis. Pero este responde que no puede completar la tarea porque no se le entregaron hallazgos de investigacion. ¿Cual es la causa mas probable?",
   "options": [
    {
     "key": "A",
     "text": "El agente de síntesis necesita herramientas que puedan obtener resultados directamente del historial de conversaciones de los otros agentes."
    },
    {
     "key": "B",
     "text": "La ventana de contexto del agente de síntesis no es lo suficientemente grande para contener las salidas combinadas de ambos agentes anteriores."
    },
    {
     "key": "C",
     "text": "Los subagentes necesitan compartir una única conexión a la API para habilitar el compartido automático de contexto entre invocaciones."
    },
    {
     "key": "D",
     "text": "El coordinador no incluyó las salidas de los agentes anteriores en el prompt del agente de síntesis."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los subagentes no heredan automáticamente el historial completo de conversación del coordinador ni las salidas de otros subagentes. Si el agente de síntesis dice que no se proporcionaron hallazgos, el problema probable es que el coordinador lo invocó solo con la solicitud de tarea y omitió los resultados de búsqueda web y análisis de documentos. La solución es incluir esas salidas previas directamente en el prompt de síntesis, preferiblemente en una forma estructurada que preserve los metadatos de fuente y la evidencia."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "S0H2Z3BPGHH7NG1QW4GYH5TDWT",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "En produccion observas que consultas simples de verificacion de hechos (p. ej. '¿en que año se firmo el Acuerdo de Paris sobre el Clima?') recorren los cuatro subagentes en secuencia, gastando mas de 40 segundos y muchos tokens por consulta. La investigacion comparativa compleja si aprovecha el pipeline completo. La distribucion de consultas es diversa y cambia a medida que los usuarios descubren usos nuevos. ¿Cual es el enfoque mas efectivo para optimizar frente a esa variedad de complejidad?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador analice cada consulta y decida dinámicamente qué subagentes invocar basándose en su evaluación de los requisitos de la consulta."
    },
    {
     "key": "B",
     "text": "Crear un camino rápido para preguntas fácticas que omita los subagentes por completo, enrutando todas las demás consultas a través del pipeline completo para garantizar la exhaustividad de la investigación."
    },
    {
     "key": "C",
     "text": "Implementar enrutamiento basado en patrones que categorice las consultas por estructura (hecho único vs. comparativa vs. analítica) y mapee cada categoría a una combinación predefinida de subagentes."
    },
    {
     "key": "D",
     "text": "Entrenar un clasificador de complejidad de consultas con datos históricos etiquetados para predecir combinaciones óptimas de subagentes, reentrenando periódicamente a medida que los patrones de consulta evolucionan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "La carga de trabajo tiene tipos de consultas diversas y en evolución, por lo que un pipeline fijo desperdicia tiempo en preguntas simples y el enrutamiento rígido se volverá frágil. El rol del coordinador es evaluar la complejidad de las consultas, descomponer tareas e invocar solo los subagentes necesarios para esa solicitud. Esto permite que las verificaciones de hechos simples tomen un camino más ligero mientras la investigación comparativa compleja sigue usando el flujo de trabajo multi-agente completo. Un camino rápido estático o una tabla de patrones maneja solo categorías conocidas, y un clasificador separado agrega sobrecarga de mantenimiento sin aprovechar el rol de orquestación existente del coordinador."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7DPTY76Y0E8YRSGAN1EM6YTE8V",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Las revisiones de produccion muestran un manejo inconsistente de la incertidumbre en los reportes finales. A veces hallazgos contradictorios de los subagentes se funden en una unica afirmacion confiada (se pierde el matiz), y otras veces el reporte se llena de salvedades hasta volverse inutil. Cuando busqueda web devuelve 'analistas estiman un mercado de $50B (metodologia varia)' y analisis de documentos devuelve 'estudio revisado por pares estima $35B (±$7B, IC 95%)', el coordinador elige uno al azar o produce frases vagas como 'el mercado podria ser $35B-$50B segun factores'. ¿Que enfoque sistematico lo resuelve mejor?",
   "options": [
    {
     "key": "A",
     "text": "Implementar una capa de calibración de confianza que normalice las expresiones de incertidumbre de los subagentes a puntajes de probabilidad estandarizados (0.0-1.0), luego promediar ponderadamente los hallazgos por su confianza calibrada."
    },
    {
     "key": "B",
     "text": "Configurar los subagentes para que solo reporten hallazgos que cumplan un umbral de alta confianza, filtrando la información incierta antes de que llegue al coordinador."
    },
    {
     "key": "C",
     "text": "Instruir al agente de síntesis para que estructure los reportes con secciones explícitas que distingan los hallazgos bien establecidos de los controvertidos, preservando las caracterizaciones originales de las fuentes y el contexto metodológico."
    },
    {
     "key": "D",
     "text": "Agregar un subagente de verificación que cruce los hallazgos entre fuentes, pasando a síntesis solo las afirmaciones corroboradas por al menos dos fuentes independientes."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El problema es la síntesis inconsistente de la incertidumbre, no la falta de un único puntaje de confianza numérico. Los hallazgos contradictorios pero creíbles deben preservarse con atribución, caracterización de la fuente, intervalos de confianza y contexto metodológico. Estructurar el reporte para separar los hallazgos bien establecidos de los controvertidos evita la selección arbitraria sin caer en el sobre-precavido vago. Filtrar afirmaciones inciertas o requerir corroboración de dos fuentes descartaría matices útiles, y el promedio ponderado puede ocultar diferencias metodológicas importantes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "4PJQ32TMRWGWVZ407V3ASNBPBA",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El coordinador le da al subagente de busqueda web instrucciones paso a paso muy detalladas: consultas exactas, prioridades de fuente y filtros de fecha. El monitoreo de produccion revela tres problemas: (1) el subagente reporta 'resultados insuficientes' en vez de probar enfoques alternativos cuando las busquedas prefijadas fallan, (2) la calidad cae para temas emergentes que no encajan con los patrones esperados, y (3) casi nunca encuentra fuentes tangenciales valiosas. ¿Cual es la forma mas efectiva de mejorar la adaptabilidad del subagente?",
   "options": [
    {
     "key": "A",
     "text": "Eliminar los detalles procedimentales por completo, delegando con objetivos simples como \"investigá X a fondo\" y confiando en las capacidades generales del subagente."
    },
    {
     "key": "B",
     "text": "Implementar un paso de clasificación de temas donde el coordinador categorice las solicitudes como \"bien definidas\" o \"exploratorias\" y use diferentes estilos de instrucción para cada categoría."
    },
    {
     "key": "C",
     "text": "Especificar objetivos de investigación y criterios de calidad (amplitud de cobertura, diversidad de fuentes, actualidad) en lugar de pasos procedimentales, dejando que el subagente determine su estrategia de búsqueda."
    },
    {
     "key": "D",
     "text": "Agregar directivas de respaldo explícitas a las instrucciones detalladas: \"Si las búsquedas especificadas arrojan menos de N resultados, intentar formulaciones de consulta alternativas antes de reportar el fallo\"."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Los fallos provienen de sobre-restringir al subagente de búsqueda web con consultas y procedimientos fijos. Para temas emergentes o exploratorios, el subagente necesita espacio para adaptar su estrategia de búsqueda mientras se le sigue exigiendo estándares de calidad claros. Los objetivos y criterios como la amplitud, la diversidad de fuentes y la actualidad definen cómo es una buena investigación sin dictar pasos frágiles. Eliminar la guía por completo es demasiado vago, las cláusulas de respaldo solo parchean un modo de fallo, y la clasificación agrega complejidad mientras sigue dependiendo de estilos de instrucción predefinidos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RRB2G0P67JBQ7AYWBD5NJCX6MB",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Tu pipeline de investigacion multi-agente fallo tras procesar 12 de 28 documentos. El agente de busqueda web ya habia identificado fuentes relevantes, el analizador de documentos habia completado parcialmente la extraccion y el sintetizador habia empezado a identificar patrones. Necesitas reanudar sin rehacer trabajo ni perder la fidelidad de los hallazgos previos. ¿Que enfoque de gestion de estado equilibra mejor la fidelidad de la informacion y la eficiencia de contexto al restaurar el estado de los agentes?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que cada agente persista una exportación estructurada en una ubicación conocida. Al reanudar, el coordinador carga el manifiesto e inyecta el estado relevante en los prompts de los agentes."
    },
    {
     "key": "B",
     "text": "Hacer que cada agente mantenga su propio archivo de estado persistente y lo recargue de forma independiente al inicio de cada sesión."
    },
    {
     "key": "C",
     "text": "Persistir el log de conversación del coordinador que contiene todas las delegaciones de tareas y respuestas, proveyéndolo a los agentes al reanudar."
    },
    {
     "key": "D",
     "text": "Indexar todas las salidas de los agentes en un almacén vectorial compartido. Al reanudar, cada agente consulta el almacén usando búsqueda semántica para recuperar hallazgos previos relevantes."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Las exportaciones de estado estructuradas preservan el progreso con alta fidelidad sin reproducir cada turno de conversación. Un manifiesto le da al coordinador un mapa confiable de qué fuentes fueron encontradas, qué documentos fueron procesados, qué extracciones están completas y qué trabajo de síntesis había comenzado. El coordinador puede entonces inyectar solo el estado relevante en cada prompt de agente reanudado. Los archivos de estado independientes de los agentes arriesgan una restauración inconsistente, los logs completos desperdician contexto, y la recuperación semántica puede omitir o distorsionar hallazgos previos exactos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "44AEQZ45E9TTR8T0KQSY5P4TXT",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El coordinador tiene AgentDefinitions para los cuatro subagentes, cada una con descripcion, prompt y restricciones de herramientas adecuadas. Probando, notas que el coordinador razona bien cuando corresponde delegar (emite mensajes como 'Le pedire al agente de busqueda web que encuentre fuentes sobre esto') pero nunca se ejecuta ningun subagente. Luego sigue como si la delegacion hubiera ocurrido y continua con informacion incompleta. Los logs no muestran errores. ¿Cual es la causa mas probable?",
   "options": [
    {
     "key": "A",
     "text": "Las AgentDefinitions están configuradas correctamente, pero el system prompt del coordinador no lista explícitamente los tipos de subagentes disponibles, impidiendo que el modelo sepa que pueden ser invocados."
    },
    {
     "key": "B",
     "text": "La configuración max_tokens del coordinador es demasiado baja, causando que la invocación de la herramienta Task sea truncada antes de que se pueda especificar el parámetro del tipo de subagente."
    },
    {
     "key": "C",
     "text": "La configuración allowedTools del coordinador no incluye \"Task\", por lo que aunque puede razonar sobre la delegación, no puede invocar la herramienta necesaria para generar subagentes."
    },
    {
     "key": "D",
     "text": "El aislamiento de contexto de los subagentes significa que las descripciones de tareas del coordinador no llegan automáticamente a los subagentes; necesitás configurar el reenvío explícito de contexto en ClaudeAgentOptions."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Las entradas `AgentDefinition` describen los tipos de subagentes disponibles, pero el coordinador aún necesita permiso para usar el mecanismo que los genera. La herramienta `Task` es necesaria para la invocación de subagentes, por lo que si falta en `allowedTools`, el coordinador puede razonar sobre la delegación en lenguaje natural pero nunca ejecutar una llamada de subagente. El aislamiento de contexto afecta lo que los subagentes reciben después de ser generados; no explica por qué no ocurre ninguna ejecución de subagente en absoluto."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6ECV0ZJCEVDW2V0TWR5F1YD3A5",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El agente de sintesis recibe hallazgos resumidos de busqueda web y analisis de documentos y luego pasa un resumen consolidado al generador de reportes. Probando, descubres que los reportes hacen afirmaciones factuales sin las citas correctas: el generador no puede atribuir las frases a sus fuentes originales porque esos metadatos se perdieron durante los pasos de resumen. ¿Cual es el enfoque mas efectivo para asegurar una atribucion de fuentes adecuada en los reportes finales?",
   "options": [
    {
     "key": "A",
     "text": "Omitir el resumen y pasar las salidas crudas completas de la búsqueda web y análisis de documentos directamente al generador de reportes."
    },
    {
     "key": "B",
     "text": "Hacer que el generador de reportes consulte al agente de búsqueda web para re-localizar fuentes de las afirmaciones en el reporte final."
    },
    {
     "key": "C",
     "text": "Hacer que cada agente genere datos estructurados separando los resúmenes de contenido de los metadatos de fuente (URLs, nombres de documentos, números de página)."
    },
    {
     "key": "D",
     "text": "Instruir al agente de síntesis para que incorpore referencias de fuentes en línea dentro del texto de su resumen usando un formato de cita consistente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La atribución de fuentes se pierde porque el resumen comprime las afirmaciones sin preservar su procedencia. Las salidas estructuradas que mantienen los resúmenes separados de los metadatos de fuente permiten que los agentes posteriores preserven y fusionen los mapeos afirmación-fuente durante la síntesis y generación de reportes. Pasar las salidas crudas desperdicia contexto, relocalizar fuentes después es poco confiable, y las citas en línea dentro del texto son más fáciles de omitir o distorsionar que los metadatos estructurados explícitos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "E05T4HT7YN34CJQDP7V4S2THE0",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "Configuraste el sistema de modo que los cuatro subagentes tengan acceso al conjunto completo de 18 herramientas. Probando, los agentes suelen llamar a herramientas fuera de su especialidad: el de sintesis intenta busquedas web y el generador de reportes intenta analizar documentos. ¿Cual es la causa principal de esta mala seleccion de herramientas?",
   "options": [
    {
     "key": "A",
     "text": "Elegir entre 18 herramientas en lugar de 4-5 relevantes aumenta la complejidad de la decisión más allá de los umbrales de selección confiable."
    },
    {
     "key": "B",
     "text": "El coordinador no puede rastrear qué capacidades tiene cada subagente, lo que lleva a tareas mal enrutadas."
    },
    {
     "key": "C",
     "text": "Las descripciones de rol de los agentes en sus system prompts entran en conflicto con tener acceso a herramientas fuera de ese rol."
    },
    {
     "key": "D",
     "text": "Las definiciones de herramientas consumen demasiado espacio de la ventana de contexto, dejando espacio insuficiente para el contenido de la tarea."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Darle a cada subagente las 18 herramientas hace que la selección de herramientas sea más difícil y alienta el mal uso entre roles. Un agente de síntesis con herramientas de búsqueda web y un generador de reportes con herramientas de análisis de documentos pueden elegir capacidades fuera de su especialización porque el conjunto de herramientas disponibles es demasiado amplio. El mejor diseño es el acceso acotado a herramientas: cada subagente debe recibir solo las herramientas necesarias para su rol, con herramientas entre roles limitadas solo para necesidades específicas de alta frecuencia."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6MX5P2G7GFFQ9BFVG5NMCJK10J",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "En produccion, los reportes finales suelen contener afirmaciones sin la atribucion de fuente adecuada. El analisis muestra que, mientras los agentes de busqueda web y analisis de documentos si adjuntan bien las citas a sus salidas, el agente de sintesis pierde el rastro de que fuentes respaldan que conclusiones al combinar los hallazgos. ¿Cual es el cambio arquitectonico mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Agregar un paso de verificación donde el generador de reportes use coincidencia de similitud semántica contra las fuentes originales para reconstruir qué afirmaciones provienen de qué documentos."
    },
    {
     "key": "B",
     "text": "Hacer que el coordinador inyecte prefijos de identificador de fuente en el texto antes de cada traspaso, luego analice estos prefijos en la generación del reporte para reconstruir las citas."
    },
    {
     "key": "C",
     "text": "Mantener transcriptos completos de todas las interacciones de subagentes y agregar un agente de resolución de citas para analizar los logs y determinar las atribuciones antes de la generación del reporte."
    },
    {
     "key": "D",
     "text": "Requerir que todos los subagentes generen mapeos estructurados afirmación-fuente que el agente de síntesis debe preservar y fusionar al combinar hallazgos de múltiples fuentes."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El paso de síntesis es donde se pierde la atribución, por lo que la arquitectura debe hacer la procedencia explícita y duradera antes de que ocurra la síntesis. Los mapeos estructurados afirmación-fuente permiten que el agente de síntesis fusione conclusiones mientras retiene qué fuentes respaldan cada afirmación. Reconstruir citas después del hecho mediante similitud semántica, logs o prefijos de texto es frágil y puede hacer atribuciones incorrectas; preservar los mapeos a través del pipeline es más confiable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "H2SPR9T6VVHXS0EB4Z1AC3RMFW",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "scenario": {
    "title": "Sistema de Investigación Multi-Agente",
    "body": "Estás construyendo un sistema de investigación multi-agente usando el Claude Agent SDK. Un agente coordinador delega en subagentes especializados: uno busca en la web, uno analiza documentos, uno sintetiza hallazgos y uno genera reportes. El sistema investiga temas y produce reportes completos con citas."
   },
   "prompt": "El monitoreo de produccion muestra que las consultas de seguimiento como 'resumi lo que aprendimos sobre tendencias de mercado' tardan sistematicamente mas de 40 segundos. Investigando, ves que el coordinador genera el subagente de sintesis para cada pedido de resumen, pasandole mas de 80K tokens de hallazgos acumulados que el coordinador ya tiene en su propio contexto de la orquestacion. ¿Cual es la forma mas efectiva de mejorar el tiempo de respuesta de estos resumenes de seguimiento?",
   "options": [
    {
     "key": "A",
     "text": "Hacer que el coordinador maneje las solicitudes de resumen directas usando su contexto existente, reservando la generación de subagentes para el análisis complejo."
    },
    {
     "key": "B",
     "text": "Pre-generar y cachear resúmenes con múltiples granularidades cada vez que se acumulen nuevos hallazgos."
    },
    {
     "key": "C",
     "text": "Generar el subagente de síntesis con contexto reducido y hacer que solicite hallazgos específicos al coordinador bajo demanda."
    },
    {
     "key": "D",
     "text": "Habilitar el caché de prompts en el subagente de síntesis para reducir la sobrecarga de transferir repetidamente los mismos hallazgos de investigación."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "El coordinador ya tiene los hallazgos acumulados en contexto, por lo que generar un subagente de síntesis y pasar más de 80K tokens para un resumen de seguimiento simple agrega latencia y costo evitables. El coordinador debe decidir dinámicamente si una solicitud necesita un subagente especialista; los resúmenes directos pueden responderse directamente, mientras que la síntesis compleja o el nuevo análisis aún pueden delegarse. El caché o la pre-generación de resúmenes puede ayudar en casos específicos, pero la mejora más directa es evitar la invocación innecesaria de subagentes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3QNG3A8WGPYAK4YCK59P49XQYM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu agente paso 25 minutos explorando el subsistema de renderizado de un motor de juegos (codigo de shaders, gestion de buffers, logica de sincronizacion de frames). Ahora un ingeniero le pide entender como el motor de fisicas se integra con el renderizado para los overlays de debug de colisiones. Notas que las respuestas recientes hablan de 'patrones tipicos de renderizado' en lugar de las clases concretas VulkanPipeline y FrameGraph que ya habia descubierto. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Continuar en el contexto actual con prompts más dirigidos que hagan referencia a las clases específicas por nombre."
    },
    {
     "key": "B",
     "text": "Resumir los hallazgos clave de renderizado, luego iniciar un sub-agente para la exploración de físicas con ese resumen en su contexto inicial."
    },
    {
     "key": "C",
     "text": "Usar /clear para resetear el contexto por completo, luego comenzar de cero con la exploración de físicas usando las rutas de archivo del CLAUDE.md del proyecto."
    },
    {
     "key": "D",
     "text": "Iniciar un sub-agente para explorar físicas de forma independiente, luego sintetizar manualmente sus hallazgos con el conocimiento de renderizado acumulado en la conversación principal."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La sesión actual muestra degradación de contexto: las respuestas están derivando hacia patrones de renderizado genéricos en lugar de usar las clases específicas ya descubiertas. Resumir los hallazgos concretos de renderizado preserva el estado importante, y darle ese resumen a un subagente enfocado en físicas aísla la siguiente exploración mientras mantiene el contexto de integración necesario. Continuar en el contexto degradado arriesga respuestas más genéricas, limpiar el contexto descartaría descubrimientos útiles, y explorar físicas de forma independiente haría la integración más difícil."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "PWBPT4FVTX0CEX71GSFN264K3J",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Configuraste tu agente Claude con tres servidores MCP: uno para operaciones git, uno para gestion de tickets Jira y uno para busqueda de documentacion. Cuando un usuario pide 'crea una rama para JIRA-123 y agrega links de documentacion al ticket', ¿como accede el agente a las herramientas de estos servidores?",
   "options": [
    {
     "key": "A",
     "text": "El agente selecciona automáticamente el servidor más relevante basándose en la solicitud y carga solo las herramientas de ese servidor."
    },
    {
     "key": "B",
     "text": "Las herramientas de todos los servidores MCP configurados se descubren en el momento de la conexión y están disponibles simultáneamente para el agente."
    },
    {
     "key": "C",
     "text": "El agente consulta cada servidor secuencialmente para determinar cuál maneja cada herramienta, enrutando las llamadas basándose en los prefijos del nombre de herramienta."
    },
    {
     "key": "D",
     "text": "Debés especificar qué servidor MCP usar en cada turno, y el agente solo puede acceder a las herramientas de un servidor a la vez."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Cuando se configuran múltiples servidores MCP, sus herramientas se descubren cuando el agente se conecta y se ponen disponibles juntas. El agente puede por lo tanto usar la herramienta git para la rama, la herramienta Jira para el ticket y la herramienta de búsqueda de documentación para los links en el mismo flujo de trabajo. No necesita seleccionar solo un servidor por turno ni consultar servidores secuencialmente para determinar la propiedad."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "SQ24SFW6412CBQC15SA77C7SYX",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Ayer un ingeniero uso el agente para analizar un modulo de autenticacion legado e identifico dos enfoques de refactor: extraer un microservicio o refactorizar en el lugar. Hoy quiere explorar ambos a fondo (que el agente proponga cambios de codigo concretos para cada uno) antes de decidir cual implementar. ¿Cual es la forma mas efectiva de estructurar esa exploracion?",
   "options": [
    {
     "key": "A",
     "text": "Iniciar dos sesiones nuevas, proveyendo manualmente un resumen de los hallazgos del análisis de ayer para establecer el contexto."
    },
    {
     "key": "B",
     "text": "Usar fork_session para crear dos ramas desde el análisis de ayer, explorando un enfoque en cada fork."
    },
    {
     "key": "C",
     "text": "Reanudar la sesión de ayer para explorar el primer enfoque, luego iniciar una nueva sesión para el segundo, recreando manualmente el contexto original."
    },
    {
     "key": "D",
     "text": "Reanudar la sesión de ayer y explorar ambos enfoques secuencialmente dentro del mismo hilo de conversación."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "El ingeniero quiere comparar dos enfoques de refactoring divergentes que comparten la misma base de análisis previo. `fork_session` está diseñado para esto: crea ramas independientes desde el contexto existente para que cada enfoque pueda explorarse en profundidad sin contaminar al otro. Comenzar de cero o recrear el contexto manualmente arriesga perder detalles, mientras que explorar ambos secuencialmente en una conversación puede mezclar suposiciones y recomendaciones entre las dos estrategias."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VK8MPMBAG260582297AC6VS1BZ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu herramienta de exploracion de codebase guarda IDs de sesion para que los ingenieros retomen investigaciones entre jornadas. Un ingeniero paso una hora ayer analizando un modulo de autenticacion legado, acumulando contexto sobre su arquitectura y dependencias, y quiere seguir hoy. El ID de sesion es valido, pero el control de versiones muestra que 3 de los 12 archivos que el agente habia leido fueron modificados durante la noche por el merge de un compañero. ¿Que enfoque equilibra mejor eficiencia y precision?",
   "options": [
    {
     "key": "A",
     "text": "Iniciar una sesión nueva para asegurar que el agente trabaje con el estado actual del codebase sin suposiciones desactualizadas"
    },
    {
     "key": "B",
     "text": "Reanudar la sesión y de inmediato hacer que el agente vuelva a leer los 12 archivos analizados anteriormente"
    },
    {
     "key": "C",
     "text": "Reanudar la sesión e informar al agente qué archivos específicos cambiaron para un re-análisis dirigido"
    },
    {
     "key": "D",
     "text": "Reanudar la sesión sin informar al agente sobre los archivos modificados"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La mayor parte del contexto de la sesión anterior sigue siendo útil, pero algunas observaciones a nivel de archivo pueden estar desactualizadas. Reanudar la sesión preserva la hora de comprensión arquitectónica acumulada, mientras que identificar explícitamente los tres archivos modificados permite al agente volver a leer y actualizar solo las suposiciones afectadas. Comenzar de cero o volver a leer los doce archivos desperdicia trabajo, y reanudar sin mencionar los cambios arriesga conclusiones inexactas basadas en contenidos de archivos desactualizados."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3GG64A44MDWZ45J1CN8VYYZ7VB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Probando, ves que en sesiones de exploracion largas (mas de 30 minutos) el agente empieza a dar respuestas inconsistentes sobre la estructura de codigo que ya habia discutido. Los ingenieros dicen tener que repetir el contexto de modulos que ya exploraron. ¿Cual es el enfoque mas efectivo para resolverlo?",
   "options": [
    {
     "key": "A",
     "text": "Crear resúmenes de todos los archivos fuente antes de que comience la exploración, cargando solo estas representaciones comprimidas en el contexto."
    },
    {
     "key": "B",
     "text": "Implementar limpieza automática del contexto cada 15 minutos para asegurar que el agente comience con contexto fresco y no contaminado."
    },
    {
     "key": "C",
     "text": "Cambiar a un nivel de modelo de mayor capacidad para proporcionar más espacio de ventana de contexto para los datos de exploración acumulados."
    },
    {
     "key": "D",
     "text": "Hacer que el agente mantenga un archivo de notas que registre los hallazgos clave, referenciándolo para preguntas posteriores."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "La exploración extendida de codebase puede degradarse cuando el contexto se llena de salidas verbosas de herramientas y los detalles más antiguos se vuelven menos confiables. Un archivo de notas preserva los hallazgos clave fuera del contexto de conversación transitorio, dando al agente una referencia estable para módulos, clases, dependencias y conclusiones ya descubiertas. Limpiar el contexto descarta trabajo útil, pre-resumir todos los archivos es costoso y superficial, y un modelo más grande no garantiza por sí mismo que los hallazgos importantes permanezcan organizados y referenciados de forma consistente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "CACNQETDH3RRS2S4HYW2ZT1TJM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide a tu agente agregar tests exhaustivos a un codebase legado de 200 archivos con cobertura minima existente. No indico que modulos priorizar. ¿Como deberia el agente descomponer esta tarea abierta?",
   "options": [
    {
     "key": "A",
     "text": "Crear un cronograma de tests fijo de antemano basado en la estructura de directorios, asignando igual esfuerzo a cada directorio de nivel superior sin importar la complejidad del código o la importancia para el negocio."
    },
    {
     "key": "B",
     "text": "Leer sistemáticamente los 200 archivos para crear un inventario completo de funciones antes de escribir cualquier test, asegurando que el plan de testing tenga en cuenta cada función antes de comenzar."
    },
    {
     "key": "C",
     "text": "Empezar a escribir tests para el primer módulo alfabéticamente, usando los fallos de tests e imports para descubrir archivos relacionados de forma orgánica."
    },
    {
     "key": "D",
     "text": "Usar Glob y Grep para mapear la estructura del codebase, identificar módulos fuertemente acoplados, crear un plan priorizado para áreas de alto impacto y revisar a medida que se descubren dependencias."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Para una tarea abierta en un gran codebase legado, el agente primero debe construir un mapa incremental del sistema en lugar de leer cada archivo o comenzar arbitrariamente. `Glob` puede identificar la estructura de archivos y los tests existentes, mientras que `Grep` puede revelar puntos de entrada, imports, sitios de llamada y acoplamiento. Esa información respalda un plan de testing priorizado enfocado en los módulos de alto impacto, y el plan puede adaptarse a medida que las dependencias y áreas de riesgo se vuelven más claras."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "B81QWNJDYKEVXTT11NTX69A7P9",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu agente necesita insertar una nueva funcion helper en el medio de un modulo utilitario de 150 lineas, entre dos funciones existentes. La herramienta Edit falla porque su old_string no encuentra texto unico para coincidir: el archivo tiene docstrings, nombres de variables y patrones estructurales repetidos. ¿Cual es la forma mas confiable de completar la insercion?",
   "options": [
    {
     "key": "A",
     "text": "Usar Bash para agregar la definición de la función al final del archivo usando sintaxis heredoc"
    },
    {
     "key": "B",
     "text": "Usar Edit con un old_string extremadamente largo que capture más de 30 líneas de contexto para garantizar la unicidad"
    },
    {
     "key": "C",
     "text": "Usar el parámetro replace_all de Edit para apuntar a un patrón común e incorporar la nueva función en el texto de reemplazo"
    },
    {
     "key": "D",
     "text": "Usar Read para cargar el archivo, agregar la función en la ubicación apropiada, luego usar Write para escribir el archivo actualizado"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Cuando `Edit` no puede encontrar un `old_string` único, seguir forzando un reemplazo arriesga modificar la ubicación incorrecta o fallar nuevamente. Leer el archivo completo, insertar la función helper en la ubicación correcta en el contenido completo y escribir el archivo actualizado es la alternativa confiable para texto ambiguo o repetitivo. Agregar con Bash colocaría la función incorrectamente, los strings de coincidencia muy largos son frágiles, y `replace_all` contra un patrón común no es seguro."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6VSH4BXFXNBSRZGY1T65W7H89D",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide a tu agente identificar los caminos de codigo sin tests en un modulo de procesamiento de pagos legado de 45 archivos. Tras leer los primeros 8 archivos fuente, las respuestas del agente se vuelven bastante menos precisas: olvida patrones ya discutidos y aun no localizo todos los archivos de test ni trazo los flujos de pago criticos. ¿Cual es el enfoque mas efectivo para completar esta investigacion?",
   "options": [
    {
     "key": "A",
     "text": "Limpiar el contexto con /clear, luego releer selectivamente solo los archivos más críticos descubiertos hasta ahora, escribiendo los hallazgos clave en un archivo de notas que persiste entre reinicios de contexto."
    },
    {
     "key": "B",
     "text": "Documentar todos los hallazgos actuales en un reporte de resumen, limpiar el contexto por completo, luego usar ese reporte como única referencia para continuar la investigación."
    },
    {
     "key": "C",
     "text": "Iniciar subagentes para investigar preguntas específicas (por ejemplo, \"encontrar todos los archivos de test para el procesamiento de pagos\", \"rastrear las dependencias del flujo de reembolso\") mientras el agente principal coordina los hallazgos y preserva la comprensión de alto nivel."
    },
    {
     "key": "D",
     "text": "Cambiar a usar Grep para buscar nombres de funciones específicos en lugar de leer archivos completos, reduciendo el contenido cargado en el contexto para la exploración restante."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La investigación es amplia y el contexto ya está degradado. Iniciar subagentes enfocados permite que cada uno maneje una tarea de descubrimiento acotada, como localizar tests de pagos o rastrear dependencias de reembolso, sin inundar el contexto principal con cada lectura de archivo. El agente principal puede coordinar y sintetizar los resultados. Limpiar el contexto o depender de un único resumen arriesga perder detalles, y usar solo `Grep` ayuda a buscar pero no resuelve la necesidad más amplia de dividir y coordinar la investigación."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "28W69EYK5QX2C5HHFJ9EA2GCG8",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente encontrar todos los callers de una funcion antes de eliminarla. La funcion se define en una biblioteca central pero tambien se expone via modulos wrapper que la renombran para uso del dominio (por ejemplo, calculateTax en la biblioteca pasa a computeOrderTax en el modulo de ordenes). ¿Que estrategia de exploracion identificara de forma mas confiable todos los callers?",
   "options": [
    {
     "key": "A",
     "text": "Usar Grep para buscar el nombre original de la función en todo el codebase."
    },
    {
     "key": "B",
     "text": "Leer la biblioteca y los módulos wrapper para identificar todos los nombres expuestos de la función, luego usar Grep para cada nombre en todo el codebase."
    },
    {
     "key": "C",
     "text": "Usar Grep para encontrar todos los archivos que importan desde la biblioteca o los módulos wrapper, luego leer cada archivo para verificar si usa la función."
    },
    {
     "key": "D",
     "text": "Buscar el nombre de la función en la documentación del proyecto para entender los patrones de uso previstos y navegar a los puntos de integración documentados."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Buscar solo el nombre original de la función omitirá los callers que usen alias a nivel de wrapper como `computeOrderTax`. La estrategia confiable es entender cómo se exporta y renombra la función a través de los módulos wrapper, recopilar todos los nombres expuestos y luego buscar cada nombre en todo el codebase. Las búsquedas solo de imports aún pueden omitir el uso indirecto o con alias, y la documentación no es una fuente completa de los sitios de llamada reales."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "D35TVPR4ZG0BB26WK24DA0MAAM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Una ingeniera uso Claude Code ayer para investigar los flujos de autenticacion de un monolito legado, acumulando bastante contexto en una sesion de 2 horas. Hoy quiere continuar esa investigacion especifica. Desde entonces trabajo en otros tres codebases y sabe que la sesion se llamaba 'auth-deep-dive'. ¿Como deberia reanudarla?",
   "options": [
    {
     "key": "A",
     "text": "Usar --session-id con el UUID del archivo de transcripción de la sesión de ayer"
    },
    {
     "key": "B",
     "text": "Usar --resume auth-deep-dive para cargar esa sesión específica por nombre"
    },
    {
     "key": "C",
     "text": "Usar --continue para retomar donde dejó la conversación más reciente"
    },
    {
     "key": "D",
     "text": "Comenzar de cero y volver a leer los mismos archivos"
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "La ingeniera quiere continuar una investigación específica con nombre, no simplemente la conversación más reciente. `--resume auth-deep-dive` carga esa sesión nombrada y preserva el contexto acumulado del análisis de autenticación previo. `--continue` arriesgaría reanudar una de las otras sesiones de codebase en las que trabajó después, y comenzar de cero desperdiciaría las dos horas de exploración previa."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "T4XK0YYZTHR6D93GC9WY74YZ5G",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Tu asistente de revision debe analizar PRs y dar feedback sobre tres aspectos: cumplimiento del estilo de codigo, posibles problemas de seguridad y completitud de la documentacion. Cada aspecto requiere leer archivos, correr herramientas de analisis y generar una seccion del reporte. El proceso sigue el mismo flujo de tres pasos en cada PR. ¿Que patron de descomposicion de tareas es el mas apropiado para este flujo?",
   "options": [
    {
     "key": "A",
     "text": "Orquestador-trabajadores—tener un LLM central que analice cada PR para determinar dinámicamente qué verificaciones son necesarias, luego delegar en LLMs trabajadores especializados para cada subtarea identificada."
    },
    {
     "key": "B",
     "text": "Enrutamiento—clasificar cada PR por tipo (feature, bugfix, refactor) primero, luego enrutar a diferentes prompts de revisión optimizados para esa categoría."
    },
    {
     "key": "C",
     "text": "Encadenamiento de prompts—dividir la revisión en pasos secuenciales donde cada aspecto (estilo, seguridad, documentación) se analiza por separado, con las salidas combinadas en un paso final de síntesis."
    },
    {
     "key": "D",
     "text": "Prompt único integral—incluir todas las instrucciones en un prompt y dejar que el modelo maneje los tres aspectos simultáneamente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La revisión tiene los mismos pasos conocidos para cada PR, y cada aspecto se beneficia de atención enfocada. El encadenamiento de prompts se adapta a flujos de trabajo multi-paso predecibles: ejecutar pasadas separadas para estilo, seguridad y documentación, luego combinar las salidas en una síntesis final. Los patrones orquestador-trabajador son mejores cuando las subtareas necesarias son dinámicas, el enrutamiento es para elegir entre diferentes flujos de trabajo, y un único prompt integral arriesga la dilución de atención en las tres dimensiones de revisión."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "XWC94CWDKSJFCWA7J58W47H2BV",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente encontrar todos los archivos del monorepo que importan el paquete @company/auth para entender como se usa la autenticacion en los servicios. ¿Que herramienta integrada es la mas apropiada para esta tarea?",
   "options": [
    {
     "key": "A",
     "text": "Glob, para encontrar archivos con \"auth\" en su nombre o ruta"
    },
    {
     "key": "B",
     "text": "Bash, para ejecutar find . -type d -name \"*auth*\" y explorar los directorios coincidentes"
    },
    {
     "key": "C",
     "text": "Read, comenzando con los archivos package.json para rastrear las declaraciones de dependencias"
    },
    {
     "key": "D",
     "text": "Grep, para buscar el patrón de declaración de importación en los contenidos de los archivos"
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El ingeniero necesita encontrar archivos cuyos contenidos importen `@company/auth`. `Grep` es la herramienta integrada apropiada para buscar en los contenidos de los archivos patrones como declaraciones de importación, nombres de funciones o mensajes de error. `Glob` busca rutas de archivo, `Read` es demasiado manual como primer paso, y usar `Bash` para inspeccionar directorios omitirá las importaciones en archivos cuyas rutas no incluyen `auth`."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "DJFZ59ERH4BXBH7MXX6CB5F38F",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero recien incorporado le pide al agente ayuda para entender la arquitectura de autenticacion y autorizacion antes de hacer mejoras de seguridad. El codebase tiene mas de 800 archivos repartidos en varios servicios. ¿Que estrategia de exploracion construira la comprension mas efectivamente, dadas las herramientas integradas de Claude y los limites de contexto?",
   "options": [
    {
     "key": "A",
     "text": "Leer todos los archivos que contengan \"auth\", \"login\", \"permission\" o \"token\" en su contenido o nombre de archivo."
    },
    {
     "key": "B",
     "text": "Leer primero los archivos CLAUDE.md y README, luego pedirle al ingeniero que especifique qué 10-15 archivos son más importantes para entender el sistema de auth."
    },
    {
     "key": "C",
     "text": "Usar Grep para encontrar los puntos de entrada de autenticación, leer esos archivos, luego seguir las importaciones y llamadas de funciones para mapear el flujo de autenticación de forma incremental."
    },
    {
     "key": "D",
     "text": "Lanzar subagentes en paralelo para explorar diferentes servicios simultáneamente, luego sintetizar sus hallazgos en una descripción arquitectónica."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Con más de 800 archivos, leer todos los archivos relacionados con auth de antemano inundaría el contexto y aún así podría no revelar el flujo. El mejor enfoque es incremental: usar `Grep` para encontrar puntos de entrada concretos de autenticación y autorización, `Read` los archivos relevantes, luego seguir las importaciones, los sitios de llamada y las dependencias para construir el mapa de arquitectura. Esto mantiene el contexto enfocado y basado en caminos de código reales. Los subagentes en paralelo pueden ayudar después, pero el primer paso debe establecer los puntos de entrada y el flujo reales."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "EKRHN11788RHGXYAETAG3WKQ34",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "Un ingeniero le pide al agente entender como funciona la capa de cache antes de agregar un nuevo disparador de invalidacion. Tras busquedas iniciales con Grep, el agente determino que la logica de cache abarca 15 archivos entre decoradores, middleware y clases de servicio (~8.000 lineas en total). ¿Cual es el siguiente paso mas efectivo para construir comprension gestionando las restricciones de contexto?",
   "options": [
    {
     "key": "A",
     "text": "Usar la herramienta Read para cargar secuencialmente los 15 archivos, construyendo comprensión completa de toda la implementación de caché."
    },
    {
     "key": "B",
     "text": "Analizar las importaciones y las jerarquías de clases para identificar la clase base de caché, leer ese archivo para entender la interfaz, luego rastrear las implementaciones de invalidación específicas."
    },
    {
     "key": "C",
     "text": "Usar Grep para buscar patrones \"invalidate\" y \"expire\" en todos los archivos, luego leer solo esos rangos de líneas específicos con contexto circundante mínimo."
    },
    {
     "key": "D",
     "text": "Usar Glob para encontrar archivos que coincidan con patrones comunes de caché (cache.py, caching/), priorizar los archivos más grandes leyéndolos primero, luego verificar los archivos más pequeños para detectar brechas."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Después de encontrar un amplio conjunto de archivos relacionados con caché, el siguiente paso debe reducir el problema a la estructura del sistema. Identificar la abstracción de caché base y leer su interfaz da un modelo mental estable, luego rastrear las implementaciones de invalidación sigue la arquitectura real. Leer los 15 archivos sobrecargaría el contexto, las búsquedas solo de palabras clave para `invalidate` y `expire` pueden omitir el flujo de control importante, y priorizar por tamaño de archivo no es un indicador confiable de importancia arquitectónica."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "W7SN466G5GP76EYA8C2TKKC5EP",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "scenario": {
    "title": "Productividad del Desarrollador con Claude",
    "body": "Estás construyendo herramientas de productividad para desarrolladores usando el Claude Agent SDK. El agente ayuda a los ingenieros a explorar codebases desconocidas, entender sistemas legados, generar código boilerplate y automatizar tareas repetitivas. Utiliza las herramientas integradas (Read, Write, Bash, Grep, Glob) y se integra con servidores de Model Context Protocol (MCP)."
   },
   "prompt": "El subagente de exploracion de un ingeniero paso 30 minutos analizando un sistema de pagos legado, leyendo 47 archivos y documentando flujos de datos. La sesion se corto cuando cayo la conexion del ingeniero. Mientras estuvo fuera, un compañero mergeo un PR que renombro dos funciones utilitarias. El ingeniero quiere continuar la misma exploracion. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Reanudar el subagente desde su transcripción anterior sin mencionar los cambios—la comprensión de la arquitectura sigue siendo válida."
    },
    {
     "key": "B",
     "text": "Lanzar un subagente nuevo con un resumen de los hallazgos previos."
    },
    {
     "key": "C",
     "text": "Reanudar el subagente desde su transcripción anterior e informarle sobre las funciones renombradas."
    },
    {
     "key": "D",
     "text": "Lanzar un subagente nuevo e incluir la transcripción anterior en el prompt inicial como contexto."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "La exploración anterior contiene contexto útil sustancial, por lo que reiniciar desperdiciaría trabajo. Sin embargo, el merge del compañero significa que algunas observaciones previas pueden estar desactualizadas. Reanudar la sesión mientras se le dice explícitamente al agente qué funciones utilitarias fueron renombradas le permite preservar los 30 minutos de análisis y realizar un re-análisis dirigido alrededor de los símbolos cambiados. Reanudar silenciosamente arriesga suposiciones desactualizadas, y pasar una transcripción previa completa a un subagente nuevo es ineficiente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "K2R8D2ZXSRHVQ5TMKDTBH2F4TD",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Te asignaron agregar actualizaciones en tiempo real a la aplicacion. Se podria implementar con WebSockets, Server-Sent Events o polling, cada uno con distinta complejidad, soporte de navegador y requisitos de infraestructura. ¿Cual es la forma mas efectiva de arrancar esta tarea?",
   "options": [
    {
     "key": "A",
     "text": "Comenzar la ejecución directa con WebSockets, luego refactorizar si surgen problemas de infraestructura."
    },
    {
     "key": "B",
     "text": "Entrar en modo plan para explorar la arquitectura, evaluar los trade-offs y presentar opciones para la aprobación del equipo antes de implementar."
    },
    {
     "key": "C",
     "text": "Usar ejecución directa con un prompt pidiendo a Claude que analice todos los enfoques e implemente el que determine como mejor."
    },
    {
     "key": "D",
     "text": "Usar ejecución directa para implementar polling primero, luego evaluar si actualizar a WebSockets después."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Las actualizaciones en tiempo real implican trade-offs arquitectónicos entre WebSockets, Server-Sent Events y polling, incluyendo requisitos de infraestructura, soporte de navegador, complejidad operacional y necesidades del producto. El modo plan es apropiado antes de la implementación porque permite que Claude investigue la arquitectura existente, compare las opciones y produzca una propuesta de decisión para el equipo. La ejecución directa comprometería prematuramente un enfoque antes de entender los trade-offs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7JGMQMN235S7GD8QC4NMWPSHN3",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "El CLAUDE.md de tu equipo incluye la regla: 'Usar indentacion de 4 espacios y siempre correr el formato Prettier.' Aun asi, las revisiones muestran que ~30% de los archivos que genera Claude Code quedan con formato inconsistente: a veces 2 espacios, a veces sin trailing commas. Agregar enfasis ('IMPORTANTE: DEBES usar el formato Prettier') baja las violaciones a ~15% pero no las elimina. ¿Cual es la forma mas efectiva de garantizar que todo el codigo generado quede con formato consistente?",
   "options": [
    {
     "key": "A",
     "text": "Agregar un hook Stop con una verificación basada en prompts que evalúe si el código generado sigue los estándares de formato y solicite a Claude que corrija las violaciones."
    },
    {
     "key": "B",
     "text": "Dividir las reglas de formato en archivos .claude/rules/ con alcance de ruta que se cargan cuando Claude trabaja en tipos de archivos coincidentes."
    },
    {
     "key": "C",
     "text": "Extraer las reglas de formato en un skill dedicado que Claude carga automáticamente al generar código, con ejemplos más detallados del formato correcto."
    },
    {
     "key": "D",
     "text": "Configurar un hook PostToolUse con un matcher Edit|Write que ejecute automáticamente Prettier en cada archivo que Claude modifica."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El formato es una preocupación de post-procesamiento determinista, por lo que debe ser aplicado por herramientas en lugar de depender del cumplimiento del prompt. Un hook `PostToolUse` que coincida con `Edit` y `Write` puede ejecutar automáticamente Prettier en los archivos modificados, eliminando la indentación inconsistente y los problemas de trailing comma sin importar lo que Claude generó inicialmente. Más énfasis en las instrucciones, reglas con alcance de ruta o skills pueden mejorar el comportamiento, pero aún dependen de que el modelo siga la guía de formato."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3ZC76BJEC7W889HREJ2T7MSRN3",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Necesitas agregar una validacion de fechas que asegure que las fechas de los eventos sean futuras. Requiere sumar una condicional a una funcion existente en un unico archivo. ¿Cual es el enfoque mas apropiado?",
   "options": [
    {
     "key": "A",
     "text": "Comenzar con el modo de pensamiento extendido habilitado para asegurar un razonamiento exhaustivo sobre la lógica de validación"
    },
    {
     "key": "B",
     "text": "Entrar en modo plan para analizar cómo la validación podría impactar otras partes del flujo de reservas"
    },
    {
     "key": "C",
     "text": "Usar ejecución directa para hacer el cambio"
    },
    {
     "key": "D",
     "text": "Entrar primero en modo plan para crear una estrategia de implementación detallada antes de hacer el cambio"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Esta es una modificación simple y bien delimitada: agregar un condicional de validación a una función existente en un único archivo. La ejecución directa es apropiada para cambios con alcance claro y bajo riesgo arquitectónico. El modo plan es mejor para cambios en múltiples archivos, decisiones arquitectónicas o tareas con múltiples enfoques viables, y el pensamiento extendido es innecesario para una verificación de validación directa."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KYZQ8K6Z08RX6TV7BEQXV3C7MV",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo migra seguido componentes de React a Vue. Escribiste un flujo paso a paso para que Claude Code lo siga en cada migracion y quieres que todos lo invoquen escribiendo /migrate-component. El flujo debe mantenerse sincronizado a medida que el equipo lo itera. ¿Donde deberias colocar el archivo del skill?",
   "options": [
    {
     "key": "A",
     "text": "En .claude/skills/migrate-component/SKILL.md en la raíz del proyecto, comprometido en el control de versiones"
    },
    {
     "key": "B",
     "text": "En el .claude/settings.json del proyecto usando una entrada skillOverrides para registrar y definir el flujo de trabajo"
    },
    {
     "key": "C",
     "text": "Como un bloque de instrucciones detallado en el archivo CLAUDE.md de la raíz del proyecto"
    },
    {
     "key": "D",
     "text": "En ~/.claude/skills/migrate-component/SKILL.md en la máquina de cada desarrollador"
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Un flujo de trabajo que debe ser compartido por todos los desarrolladores y mantenerse sincronizado a medida que el equipo lo mejora pertenece al repositorio, no a la configuración personal de cada desarrollador. Un skill de proyecto en `.claude/skills/migrate-component/SKILL.md` puede versionarse, revisarse y actualizarse con el codebase. `CLAUDE.md` cargaría el flujo de trabajo en cada conversación de forma innecesaria, y los archivos de skill por usuario irían divergiendo entre máquinas."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "NJ4W4T0TFS5BXT42V3Z8ZTRKFB",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo conecto un servidor MCP propio que ofrece plantillas de flujo de trabajo DevOps. El servidor expone varios prompts MCP (como deploy_checklist e incident_response) ademas de herramientas. ¿Como se vuelven accesibles esos prompts MCP dentro de Claude Code?",
   "options": [
    {
     "key": "A",
     "text": "Se agregan al registro de herramientas de Claude Code junto con las herramientas del servidor, invocados automáticamente por el modelo cuando son relevantes para la tarea."
    },
    {
     "key": "B",
     "text": "Se anteponen automáticamente a cada conversación como contexto adicional de nivel de sistema, influyendo en el comportamiento de Claude durante toda la sesión."
    },
    {
     "key": "C",
     "text": "Se exponen como recursos mencionables con @ junto a los archivos, obtenidos y adjuntados a tu mensaje cuando se los referencia."
    },
    {
     "key": "D",
     "text": "Aparecen como slash commands (por ejemplo, /mcp__servername__deploy_checklist) que podés invocar, con argumentos pasados después del nombre del comando."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los prompts MCP son plantillas de prompt reutilizables expuestas por el servidor. En Claude Code, se exponen para invocación explícita como slash commands, usando una forma con namespace que identifica el servidor MCP y el nombre del prompt. No son herramientas seleccionadas automáticamente por el modelo, no son contexto de sistema antepuesto a cada conversación, y no son recursos mencionables con `@` como archivos o catálogos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "8DPBEDBQKKX7M54DVZXEXM9P47",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu monorepo guarda estandares compartidos en /docs/standards/: security-rules.md (para servicios que manejan datos de usuario), testing-patterns.md (para todos los paquetes) y api-conventions.md (para servicios expuestos como API). Tus 15 paquetes se organizan por dominio de feature (/packages/auth/, /packages/billing/, etc.) sin convenciones de nombre que indiquen cuales manejan datos de usuario o exponen APIs. Se espera que cada mantenedor configure sus ajustes locales, ya que conoce los requisitos de su paquete. Hoy todos los CLAUDE.md de paquete duplican los tres estandares, aplicando guia irrelevante. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Poner todos los estándares en el CLAUDE.md raíz con instrucciones de anulación como \"ignorar security-rules.md al trabajar en paquetes que no manejan datos de usuario\"."
    },
    {
     "key": "B",
     "text": "Crear un shared-standards.md que use @imports para combinar los tres estándares, luego hacer que el CLAUDE.md de cada paquete importe ese archivo combinado."
    },
    {
     "key": "C",
     "text": "Crear archivos .claude/rules/ para cada estándar con rutas en frontmatter YAML que listen cada directorio de paquete donde ese estándar debe aplicarse."
    },
    {
     "key": "D",
     "text": "Usar @imports en el CLAUDE.md de cada paquete para referenciar solo los archivos de estándares relevantes para ese paquete, basándose en el conocimiento de dominio del mantenedor."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los estándares son modulares, pero la aplicabilidad depende del conocimiento de dominio que no puede inferirse de las rutas o nombres de los paquetes. Usar `@import` en el `CLAUDE.md` de cada paquete permite que los mantenedores incluyan solo los estándares que realmente aplican a su paquete mientras los archivos fuente permanecen centralizados en `/docs/standards/`. Las instrucciones de ignorar a nivel raíz y las importaciones combinadas seguirían cargando guía irrelevante, mientras que las reglas con alcance de ruta requieren mantener listas explícitas de paquetes para criterios que no son obvios a partir de las rutas."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "QNZS5WHAF16K3HZCBDP5HM1J66",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Documentaste las convenciones de manejo de errores de API en un CLAUDE.md en la raiz del proyecto, indicando que los handlers de endpoints deben usar una clase ApiError propia. Tras varias sesiones, notas que Claude Code a veces sigue esa convencion y a veces usa try/catch genericos con mensajes de texto. La inconsistencia parece aleatoria entre sesiones. ¿Cual es el primer paso diagnostico mas eficiente?",
   "options": [
    {
     "key": "A",
     "text": "Buscar instrucciones conflictivas en ~/.claude/CLAUDE.md o ~/.claude/rules/ que puedan estar anulando las convenciones del proyecto."
    },
    {
     "key": "B",
     "text": "Crear reglas específicas de ruta en .claude/rules/handlers.md con frontmatter YAML que delimite las instrucciones de manejo de errores a los archivos de handlers de API."
    },
    {
     "key": "C",
     "text": "Agregar ejemplos de código más detallados a tu CLAUDE.md que muestren el patrón exacto de uso de ApiError para diferentes tipos de endpoints."
    },
    {
     "key": "D",
     "text": "Ejecutar /memory para verificar qué archivos de memoria están cargados y confirmar que tu CLAUDE.md está incluido."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Antes de cambiar la configuración, el paso diagnóstico más rápido es confirmar si Claude Code está realmente cargando el archivo de memoria del proyecto esperado en las sesiones donde el comportamiento es inconsistente. `/memory` muestra qué archivos de memoria están activos, ayudando a identificar problemas de jerarquía o carga. Agregar ejemplos o reglas específicas de ruta puede ser útil después, pero primero no verifica que el `CLAUDE.md` existente esté siendo aplicado."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JVB9X4M5EH6EE9WYNXYP20NPF8",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo tiene tres requisitos para el comportamiento de Claude Code en el proyecto: (1) Claude nunca debe modificar archivos en db/migrations/; (2) Claude deberia preferir tu modulo de logging propio sobre console.log; (3) todos los archivos TypeScript deben formatearse automaticamente con Prettier despues de cada edicion. Hoy los tres estan escritos como instrucciones en el CLAUDE.md del proyecto. Durante un refactor complejo, un desarrollador descubre que Claude edito un archivo de migracion, violando el requisito #1. ¿Como deberias reestructurar estos requisitos en los mecanismos de configuracion de Claude Code?",
   "options": [
    {
     "key": "A",
     "text": "Reescribir los tres requisitos en CLAUDE.md usando lenguaje directivo más fuerte y agregar ejemplos few-shot que demuestren a Claude rechazando editar archivos de migración y ejecutando Prettier después de las ediciones."
    },
    {
     "key": "B",
     "text": "Agregar Edit(./db/migrations/**) a permissions.deny en la configuración del proyecto, mantener la preferencia de logging en CLAUDE.md y agregar un hook PostToolUse en la herramienta Edit que ejecute Prettier en los archivos TypeScript modificados."
    },
    {
     "key": "C",
     "text": "Mover los tres requisitos a .claude/rules/ como reglas con alcance de ruta: una apuntando a db/migrations/** que prohíbe editar esos archivos, y otras apuntando a **/*.ts para la convención de logging y la instrucción de formato."
    },
    {
     "key": "D",
     "text": "Configurar hooks para los tres: un script de hook PreToolUse que bloquee las llamadas Edit dirigidas a db/migrations/, un script de hook PreToolUse que agregue contexto de convención de logging antes de las ediciones, y un hook PostToolUse que ejecute Prettier después de ediciones de TypeScript."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Estos requisitos tienen diferentes necesidades de aplicación. “Nunca modificar migraciones” es una regla de seguridad estricta y debe ser aplicada por permisos en lugar de instrucciones de prompt. Preferir un módulo de logging personalizado es una convención de código de todo el proyecto, por lo que `CLAUDE.md` es apropiado. El formato después de las ediciones es automatización determinista, por lo que un hook `PostToolUse` debe ejecutar Prettier en los archivos TypeScript modificados. Una redacción más fuerte o reglas de prompt con alcance de ruta aún dependen del cumplimiento del modelo para requisitos que deben aplicarse mecánicamente."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "34CJXAF0K4SEFKAQQTWFY7WFD8",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Una auditoria de seguridad exige actualizar tu biblioteca de autenticacion de v2 a v3. La guia de migracion documenta cambios que rompen compatibilidad: authenticate() ahora devuelve una Promise en vez de aceptar un callback, el tipo User tiene campos reestructurados y se eliminaron tres metodos deprecados. Grep muestra que la biblioteca se importa en 45 archivos de varios modulos. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Pegar los cambios que rompen compatibilidad de la guía de migración en tu prompt y usar ejecución directa para actualizar todos los usos en los 45 archivos."
    },
    {
     "key": "B",
     "text": "Actualizar la versión de la dependencia, ejecutar el conjunto de tests y usar Claude Code para corregir cada fallo a medida que aparece."
    },
    {
     "key": "C",
     "text": "Crear un comando slash personalizado que encapsule las transformaciones de migración y ejecutarlo contra cada archivo sin exploración previa del código."
    },
    {
     "key": "D",
     "text": "Entrar en plan mode para explorar el uso de la librería en todos los módulos, mapear los caminos de código afectados y luego crear una estrategia de migración antes de implementar."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Esta es una migración multi-archivo con cambios de API que rompen compatibilidad en 45 archivos. El plan mode es apropiado porque Claude Code debe primero mapear los diferentes patrones de uso, entender los cambios de callback a Promise, identificar los supuestos del tipo `User` afectados y planificar cómo reemplazar los métodos eliminados antes de editar. La ejecución directa o las correcciones basadas en fallos de tests probablemente producirían cambios fragmentados y perderían los patrones entre módulos."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VFTSV8C3577X1X2ZHJZVMTXWKQ",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Estas implementando una capa de cache para respuestas de API para acelerar el endpoint /products. Tienes una idea aproximada (Redis con TTL de 5 minutos) pero sos nuevo en caching en produccion y no estas seguro de que otras consideraciones exige una implementacion robusta. ¿Cual es la forma mas efectiva de iniciar tu flujo de trabajo iterativo?",
   "options": [
    {
     "key": "A",
     "text": "Empezar con una solicitud mínima: 'Agregar caché Redis a /products con TTL de 5 minutos.' Agregar funcionalidades y corregir problemas a través de prompts de seguimiento a medida que surjan durante las pruebas."
    },
    {
     "key": "B",
     "text": "Usar plan mode para analizar la implementación actual del endpoint /products y luego proporcionar los requisitos de caché una vez que Claude explique cómo está estructurado el código existente."
    },
    {
     "key": "C",
     "text": "Escribir una especificación con los requisitos conocidos y marcadores 'TBD' para las áreas inciertas, haciendo que Claude proponga soluciones para cada TBD mientras implementa."
    },
    {
     "key": "D",
     "text": "Pedirle a Claude que te entreviste sobre los requisitos de caché antes de implementar, identificando consideraciones como estrategias de invalidación, capas de caché, garantías de consistencia y modos de fallo."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "El usuario tiene una idea de implementación aproximada pero le falta claridad sobre los requisitos de producción. El patrón de entrevista es apropiado porque ayuda a identificar consideraciones de diseño que el desarrollador puede no haber anticipado, como invalidación, consistencia, comportamiento de fallback, cache stampedes, observabilidad y modos de fallo. Empezar con una implementación mínima o completar marcadores `TBD` probablemente perdería decisiones importantes, mientras que el plan mode solo puede analizar la estructura del código sin obtener los requisitos de producto y operacionales faltantes."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "J8YMR3SYPSKR8728WTBTH5ZKYH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Estas implementando un algoritmo de recorrido de grafos complejo con requisitos de rendimiento especificos y casos borde a manejar (nodos desconectados, ciclos, aristas ponderadas). Quieres estructurar tu flujo para refinar de forma iterativa y eficiente con Claude. ¿Que enfoque habilitara mejor la mejora progresiva a lo largo de varias iteraciones?",
   "options": [
    {
     "key": "A",
     "text": "Escribir un conjunto de tests que cubra el comportamiento esperado, los casos borde y los requisitos de rendimiento antes de la implementación. Pedirle a Claude que escriba código que pase los tests, luego iterar compartiendo los fallos de tests con cada solicitud de refinamiento."
    },
    {
     "key": "B",
     "text": "Proporcionarle a Claude una implementación de referencia de la documentación, luego pedirle que reescriba el código para que coincida con el estilo de tu código y agregue el manejo de casos borde requeridos, comparando los resultados con la referencia."
    },
    {
     "key": "C",
     "text": "Proporcionarle a Claude una especificación detallada en lenguaje natural del algoritmo, incluyendo todos los requisitos y casos borde. Revisar cada salida manualmente y proporcionar retroalimentación descriptiva sobre qué comportamiento necesita cambiar."
    },
    {
     "key": "D",
     "text": "Hacer que Claude investigue extensamente el algoritmo y cree un plan de implementación detallado usando pensamiento extendido, luego implementar la solución completa basándose en ese plan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Para un algoritmo complejo, los tests proporcionan retroalimentación concreta y repetible a lo largo de las iteraciones. Cubrir nodos desconectados, ciclos, aristas ponderadas, salidas esperadas y restricciones de rendimiento le da a Claude un objetivo claro y convierte cada refinamiento en una respuesta específica a los casos que fallan. La revisión en lenguaje natural sola es menos precisa, y un plan detallado no garantiza la corrección en los casos borde sin retroalimentación ejecutable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "W1Y7M3MGRXKAR425WHDZETS26Y",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo quiere que Claude siga un checklist de revision detallado (8 items sobre cambios de API, cobertura de tests, documentacion, seguridad, etc.) al revisar PRs. El equipo tambien usa Claude para muchas otras tareas: escribir features, depurar problemas de produccion y generar documentacion. Hoy los desarrolladores pegan el checklist al inicio de cada sesion de revision. ¿Que enfoque atiende mejor esta necesidad del flujo de trabajo?",
   "options": [
    {
     "key": "A",
     "text": "Configurar plan mode como predeterminado para las sesiones de revisión de código."
    },
    {
     "key": "B",
     "text": "Crear un subagente de revisión dedicado con el checklist embebido en su configuración."
    },
    {
     "key": "C",
     "text": "Agregar el checklist al archivo CLAUDE.md del proyecto bajo una sección 'Code Review'."
    },
    {
     "key": "D",
     "text": "Crear un comando slash /review que contenga el checklist, invocado al iniciar las revisiones."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Un comando slash se adapta a un flujo de trabajo repetible que los desarrolladores inician intencionalmente solo para revisiones de pull requests. Mantiene el checklist detallado fuera de las sesiones ordinarias de funcionalidades, depuración y documentación, a la vez que le da al equipo un procedimiento de revisión consistente sin pegar el checklist manualmente cada vez."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VN13YJ110G5WQ8D8GM6YXMFMZ4",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Tu equipo esta configurando servidores MCP en Claude Code. Quieres agregar un servidor compartido de busqueda de venues al que todos deberian tener acceso, y personalmente quieres agregar un servidor experimental de playlists de musica que solo vos estas probando. ¿Que enfoque de configuracion aplica correctamente los scopes de servidores MCP?",
   "options": [
    {
     "key": "A",
     "text": "Agregar el servidor de venues a ~/.claude.json y el servidor de playlists a .mcp.json"
    },
    {
     "key": "B",
     "text": "Agregar ambos servidores al archivo .mcp.json a nivel de proyecto"
    },
    {
     "key": "C",
     "text": "Agregar el servidor de venues a .mcp.json y el servidor de playlists a ~/.claude.json"
    },
    {
     "key": "D",
     "text": "Agregar ambos servidores a tu ~/.claude.json local"
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Un servidor que todos los miembros del equipo deben usar pertenece al `.mcp.json` con scope de proyecto, porque puede compartirse con el repositorio. Un servidor experimental personal pertenece al `~/.claude.json` con scope de usuario, porque debe afectar solo al desarrollador que lo está probando."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "9BPBT5Q4C3GV8EZ3HMC6KVD0Z5",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Un bug critico afecta a usuarios de produccion. Los logs de error muestran excepciones en el modulo OrderProcessing con un stack trace claro que apunta a una funcion especifica. Nunca trabajaste con este modulo. ¿Cual es el enfoque mas efectivo?",
   "options": [
    {
     "key": "A",
     "text": "Entrar en plan mode para explorar la arquitectura y dependencias del módulo antes de intentar cualquier corrección."
    },
    {
     "key": "B",
     "text": "Empezar con ejecución directa para recopilar información inicial, luego cambiar a plan mode para diseñar una solución integral antes de implementar cualquier cambio."
    },
    {
     "key": "C",
     "text": "Usar ejecución directa para examinar el stack trace, leer el código relevante e implementar una corrección una vez que se identifica la causa raíz."
    },
    {
     "key": "D",
     "text": "Usar plan mode para analizar el error en el contexto del diseño del módulo, enumerar las posibles causas raíz y priorizar las correcciones sistemáticamente."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "El problema es urgente y ya está bien delimitado por los logs y el stack trace. La ejecución directa permite a Claude inspeccionar la función que falla, seguir el camino de código inmediato, identificar la causa raíz y aplicar una corrección específica sin gastar tiempo en una fase de planificación arquitectónica más amplia que no es necesaria dada la evidencia disponible."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "M77X3ZA80J8TPBZWGZJFQ7ZAAW",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "scenario": {
    "title": "Generación de Código con Claude Code",
    "body": "Estás usando Claude Code para acelerar el desarrollo de software. Tu equipo lo utiliza para generación de código, refactorización, depuración y documentación. Necesitas integrarlo en tu flujo de trabajo de desarrollo con slash commands personalizados, configuraciones de CLAUDE.md, y entender cuándo usar plan mode versus ejecución directa."
   },
   "prompt": "Le pediste a Claude Code una funcionalidad de generacion de reportes PDF. La implementacion inicial consulta la base de datos correctamente, pero la salida tiene problemas de formato: las columnas de la tabla son muy angostas y truncan contenido, las fechas se muestran sin el formato correcto y el manejo de saltos de pagina es incorrecto. Notaste que estos problemas interactuan: cambiar el ancho de columnas afecta como se renderizan las fechas, y los saltos de pagina dependen de la altura del contenido. ¿Cual es el enfoque mas efectivo para iterar hacia una solucion funcional?",
   "options": [
    {
     "key": "A",
     "text": "Abordar el problema del ancho de columnas primero con medidas específicas, verificar que funcione, luego corregir el formato de fechas dentro de las columnas corregidas, luego ajustar los saltos de página—testeando después de cada cambio."
    },
    {
     "key": "B",
     "text": "Empezar de cero con un prompt detallado que especifique todos los requisitos de formato desde el principio."
    },
    {
     "key": "C",
     "text": "Mostrarle a Claude un ejemplo de un reporte correctamente formateado y pedirle que coincida con esa salida, en lugar de listar los problemas técnicos específicos."
    },
    {
     "key": "D",
     "text": "Proporcionar los tres problemas en un único mensaje detallado con especificaciones exactas para cada uno, permitiendo que Claude los aborde juntos en una sola actualización."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Los problemas de formato interactúan entre sí, por lo que corregirlos de uno en uno puede hacer que los cambios posteriores invaliden el trabajo anterior. Proporcionar los requisitos de ancho de columnas, formato de fechas y saltos de página juntos le da a Claude el conjunto completo de restricciones necesarias para producir una actualización de layout coherente."
   },
   "difficulty": "intermediate"
  }
 ]
};
