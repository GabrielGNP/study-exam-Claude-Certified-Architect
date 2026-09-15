#!/usr/bin/env python3
"""Agrega los 2 escenarios faltantes al banco: Customer Support Resolution Agent
y Structured Data Extraction (15 preguntas base cada uno).

El banco original solo traia 4 de los 6 escenarios del examen CCA-F. Este script
anade los otros 2, redactados siguiendo el mismo estilo, formato y dificultad, y
alineados con los patrones de respuesta correcta de la Exam Guide oficial.

Idempotente: elimina variantes previas y las preguntas de estos 2 temas antes de
volver a insertarlas, para poder re-ejecutar sin duplicar.

Pipeline completo:
  python add-topics.py && python expand-question-bank.py && python build-en-bank.py && python build-questions.py
"""
import json
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "study-question-bank.json")
VARIANT_TAG = "variant_reworded"

# IDs estables de los 2 temas nuevos (compartidos con build-en-bank.py).
TOPIC5_ID = "01KT81BA4JCST5PP0RTAGENT01"   # Customer Support Resolution Agent
TOPIC6_ID = "01KT81BA4JXTRCTDATA5CHMA01"   # Structured Data Extraction

TOPIC_META = [
    {"id": TOPIC5_ID, "order": 5, "title": "Agente de Resolución de Soporte al Cliente",
     "tag": "customer_support_resolution_agent",
     "scenario": "Estás construyendo un agente de resolución de soporte al cliente con el Claude Agent SDK. El agente usa herramientas MCP (get_customer, lookup_order, process_refund, escalate_to_human) para resolver consultas de clientes, con la meta de resolver el 80%+ en el primer contacto sabiendo cuándo escalar a un humano."},
    {"id": TOPIC6_ID, "order": 6, "title": "Extracción de Datos Estructurados",
     "tag": "structured_data_extraction",
     "scenario": "Estás construyendo un sistema de extracción de datos estructurados que procesa documentos no estructurados (facturas, contratos, informes) y produce salida validada contra JSON schemas. Debes manejar formatos variados, campos ausentes y casos borde manteniendo la fiabilidad."},
]

# --------- 30 preguntas base (15 por tema). order 61..90 ---------
NEW = [
 # ===== Customer Support Resolution Agent (61..75) =====
 {"topic": TOPIC5_ID, "order": 61, "correct": "A",
  "prompt": "En el 12% de los casos el agente omite `get_customer` y llama a `lookup_order` usando solo el nombre que dijo el cliente, lo que a veces identifica mal la cuenta y genera reembolsos incorrectos. ¿Qué cambio lo resuelve de forma más fiable?",
  "A": "Un prerequisito programático que bloquee `lookup_order` y `process_refund` hasta que `get_customer` haya devuelto un customer ID verificado.",
  "B": "Reforzar el system prompt para exigir la verificación de identidad antes de cualquier operación sobre órdenes.",
  "C": "Añadir ejemplos few-shot que muestren al agente llamando siempre a `get_customer` primero.",
  "D": "Un clasificador de ruteo que habilite solo el subconjunto de tools apropiado para cada request.",
  "just": "La lógica de negocio crítica —verificar identidad antes de reembolsar— exige garantías deterministas que el prompt no puede dar. Un prerequisito programático que bloquea las tools posteriores hasta que `get_customer` verifica la cuenta elimina el fallo por diseño. Reforzar el prompt o los few-shot dependen de cumplimiento probabilístico, insuficiente cuando hay dinero e identidad de por medio; el clasificador de ruteo cambia qué tools están disponibles, no el orden de ejecución, que es el problema real."},
 {"topic": TOPIC5_ID, "order": 62, "correct": "B",
  "prompt": "El agente llama a `get_customer` cuando el usuario pregunta por una orden ('revisa mi orden #12345') en vez de a `lookup_order`. Ambas tools tienen descripciones mínimas y aceptan identificadores parecidos. ¿Cuál es el primer paso más efectivo?",
  "A": "Añadir 5-8 ejemplos few-shot de selección correcta de tool.",
  "B": "Expandir la descripción de cada tool con formatos de entrada, consultas de ejemplo, casos borde y fronteras (cuándo usar una frente a la otra).",
  "C": "Un router que parsee la entrada y preseleccione la tool por palabras clave.",
  "D": "Consolidar ambas tools en una única `lookup_entity`.",
  "just": "Las descripciones de las tools son el mecanismo primario de selección del modelo; descripciones mínimas producen confusión entre tools similares. Expandirlas ataca la causa raíz con bajo esfuerzo y alta palanca. Los few-shot añaden tokens sin corregir la causa, el router por keywords es sobre-ingeniería, y consolidar es válido pero más costoso que un primer paso."},
 {"topic": TOPIC5_ID, "order": 63, "correct": "A",
  "prompt": "El agente alcanza un 55% de resolución (meta 80%). Escala casos fáciles (reemplazos por daño con foto) y solo resuelve los complejos (excepciones de política). ¿Cuál es la mejor forma de mejorar la calibración de la escalada?",
  "A": "Definir criterios de escalada explícitos y añadir ejemplos few-shot de cuándo escalar frente a cuándo resolver.",
  "B": "Que el agente reporte su propia confianza (1-10) y rutee a un humano por debajo de un umbral.",
  "C": "Entrenar un clasificador con tickets históricos etiquetados.",
  "D": "Usar análisis de sentimiento para escalar cuando se detecta frustración.",
  "just": "El problema son límites de decisión poco claros; criterios explícitos con few-shot enseñan cuándo escalar y cuándo resolver. La confianza auto-reportada del LLM está mal calibrada, un clasificador entrenado es sobre-ingeniería, y el sentimiento no correlaciona con la complejidad real del caso."},
 {"topic": TOPIC5_ID, "order": 64, "correct": "A",
  "prompt": "La política exige que ningún reembolso automático supere los $500; por encima debe ir a un humano. Hoy la regla está escrita en mayúsculas en el system prompt, pero ocasionalmente el agente procesa reembolsos mayores. ¿Cuál es el enfoque más fiable?",
  "A": "Un hook `PreToolUse` que intercepte las llamadas a `process_refund`, bloquee los montos superiores a $500 y los redirija a escalada humana.",
  "B": "Repetir la regla con mayor énfasis y ejemplos en el system prompt.",
  "C": "Añadir la restricción del límite a la descripción de la tool `process_refund`.",
  "D": "Un paso de revisión posterior que verifique los reembolsos emitidos y revierta los que excedan el límite.",
  "just": "Las reglas de negocio y de cumplimiento críticas deben vivir en la capa determinista de middleware, no en el tejido probabilístico del prompt. Un hook `PreToolUse` bloquea la acción antes de que toque el backend, garantizando el límite. El énfasis en el prompt o en la descripción sigue dependiendo del cumplimiento del modelo, y revertir después ya permitió que ocurriera el reembolso indebido."},
 {"topic": TOPIC5_ID, "order": 65, "correct": "C",
  "prompt": "Cuando `process_refund` falla, la tool devuelve siempre 'Operation failed'. El agente no distingue un timeout transitorio de una violación de política, así que reintenta operaciones que nunca deberían reintentarse. ¿Qué diseño de respuesta de error habilita mejor la recuperación adecuada?",
  "A": "Que la tool reintente internamente con backoff y devuelva 'unavailable' tras agotar los reintentos.",
  "B": "Registrar el error detallado en los logs del servidor y devolver al agente un mensaje genérico para no exponer detalles.",
  "C": "Devolver metadata estructurada con `isError`, `errorCategory` (transient/validation/permission/business) e `isRetryable`, más una descripción legible.",
  "D": "Que el agente escale al humano ante cualquier fallo de la tool.",
  "just": "Respuestas uniformes impiden que el agente decida bien la recuperación. Metadata estructurada con la categoría del error y si es reintentable permite reintentar los transitorios y no reintentar los de negocio. El backoff interno oculta el contexto, un mensaje genérico repite el problema, y escalar ante cualquier fallo desperdicia la recuperación de fallos transitorios."},
 {"topic": TOPIC5_ID, "order": 66, "correct": "A",
  "prompt": "Cuando el agente escala a un humano, el operador recibe todo el registro del chat y pierde tiempo reconstruyendo el caso. ¿Qué mejora el handoff de forma más efectiva?",
  "A": "Generar un paquete de escalada estructurado (customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action, escalation_reason).",
  "B": "Adjuntar la transcripción completa de la conversación con marcas de tiempo.",
  "C": "Un resumen en prosa libre generado por el modelo al momento de escalar.",
  "D": "Un enlace al historial del cliente para que el operador lo consulte manualmente.",
  "just": "El operador humano no debería leer todo el chat; necesita un resumen estructurado y accionable. Un paquete de handoff con los hechos clave y la acción recomendada permite continuar sin reconstruir el caso. La transcripción completa o un enlace trasladan el trabajo al humano, y un resumen en prosa libre es menos fiable y puede omitir campos críticos."},
 {"topic": TOPIC5_ID, "order": 67, "correct": "A",
  "prompt": "Un cliente escribe: 'No quiero un bot, páseme con una persona ahora mismo.' El agente igualmente intenta diagnosticar el problema y ofrecer soluciones antes de escalar. ¿Cuál es el comportamiento correcto?",
  "A": "Escalar a un humano de inmediato al tratarse de un pedido explícito, sin intentar investigar primero.",
  "B": "Intentar resolver el problema una vez y escalar solo si el intento falla.",
  "C": "Analizar el sentimiento para confirmar la frustración antes de decidir escalar.",
  "D": "Pedir al cliente que explique su problema para evaluar si realmente requiere un humano.",
  "just": "Un pedido explícito de hablar con un humano es un disparador de escalada que debe honrarse de inmediato. Insistir en resolver, medir el sentimiento o interrogar al cliente ignora la solicitud directa y degrada la experiencia; esos pasos aplican cuando el issue es directo y el cliente no ha exigido un humano."},
 {"topic": TOPIC5_ID, "order": 68, "correct": "A",
  "prompt": "`get_customer` devuelve tres clientes distintos que coinciden con el nombre proporcionado. ¿Qué debe hacer el agente?",
  "A": "Pedir al cliente identificadores adicionales (email, número de orden o código postal) para desambiguar antes de continuar.",
  "B": "Elegir la coincidencia con la actividad de cuenta más reciente como la más probable.",
  "C": "Elegir la coincidencia cuyo perfil esté más completo.",
  "D": "Procesar la consulta para las tres cuentas y dejar que el cliente identifique la correcta en la respuesta.",
  "just": "Con múltiples coincidencias, elegir por heurística arriesga actuar sobre la cuenta equivocada —especialmente grave antes de operaciones sobre órdenes o reembolsos—. Lo correcto es pedir identificadores adicionales para verificar la identidad. Adivinar por recencia o completitud, o exponer datos de tres cuentas, compromete la exactitud y la privacidad."},
 {"topic": TOPIC5_ID, "order": 69, "correct": "A",
  "prompt": "En conversaciones largas de varios turnos, el agente empieza a olvidar el número de orden y el monto de reembolso acordado porque el historial se va resumiendo. ¿Cuál es la forma más efectiva de preservar estos datos?",
  "A": "Extraer los hechos transaccionales (montos, fechas, order IDs, estados) a un bloque persistente de 'case facts' incluido en cada prompt, fuera del historial resumido.",
  "B": "Aumentar la longitud del resumen para que conserve más detalles de cada turno.",
  "C": "Cambiar a un modelo con ventana de contexto mayor para no resumir nunca.",
  "D": "Repetir todo el historial completo sin resumir en cada request.",
  "just": "Los valores transaccionales precisos se pierden cuando la summarización progresiva los condensa. Mantener un bloque de 'case facts' con esos datos en cada prompt, separado del historial resumido, los preserva de forma fiable. Un resumen más largo sigue arriesgando pérdida, un modelo más grande no garantiza retener el dato exacto, y repetir todo el historial desperdicia contexto."},
 {"topic": TOPIC5_ID, "order": 70, "correct": "A",
  "prompt": "Las tools de pedidos y de facturación devuelven las fechas en formatos distintos (timestamps Unix, ISO 8601 y códigos numéricos de estado), lo que confunde al agente al comparar eventos. ¿Cuál es el enfoque más fiable para unificarlos?",
  "A": "Un hook `PostToolUse` que intercepte los resultados de las tools y normalice fechas y estados a un formato uniforme antes de que el modelo los procese.",
  "B": "Instruir en el prompt al agente para que convierta mentalmente cada formato al comparar.",
  "C": "Añadir a cada descripción de tool una nota sobre el formato que devuelve.",
  "D": "Un paso de post-procesamiento que reformatee la respuesta final del agente al usuario.",
  "just": "Normalizar formatos heterogéneos es una transformación determinista que debe hacerse antes de que el modelo razone. Un hook `PostToolUse` transforma los resultados de las tools a un formato uniforme de forma fiable. Pedirlo en el prompt depende del cumplimiento del modelo, documentar el formato no lo unifica, y reformatear la salida final no ayuda al razonamiento intermedio."},
 {"topic": TOPIC5_ID, "order": 71, "correct": "A",
  "prompt": "Tu equipo propone dar al agente de soporte acceso a las 20 herramientas internas (pedidos, facturación, envíos, marketing, analítica…) 'por si acaso'. En pruebas, el agente a veces invoca tools ajenas a soporte. ¿Cuál es el mejor diseño?",
  "A": "Dar al agente solo el conjunto reducido de tools que su rol necesita (get_customer, lookup_order, process_refund, escalate_to_human) y añadir tools puntuales solo ante necesidades reales de alta frecuencia.",
  "B": "Mantener las 20 tools pero añadir instrucciones en el prompt para que use solo las de soporte.",
  "C": "Mantener las 20 tools y un clasificador que preseleccione cuáles mostrar por request.",
  "D": "Fusionar las tools relacionadas en unas pocas tools genéricas de propósito amplio.",
  "just": "Un conjunto de tools demasiado grande degrada la fiabilidad de selección y fomenta el mal uso entre dominios. El principio de menor privilegio —solo las tools del rol— es el mejor diseño. Las instrucciones en el prompt siguen dependiendo del cumplimiento, un clasificador es sobre-ingeniería, y fusionar en tools genéricas reintroduce la ambigüedad de selección."},
 {"topic": TOPIC5_ID, "order": 72, "correct": "A",
  "prompt": "En el bucle agéntico del agente de soporte, ¿cómo debe decidir la aplicación anfitriona que el turno terminó y que el texto es la respuesta final para el cliente?",
  "A": "Evaluando estrictamente que `stop_reason` sea `end_turn`.",
  "B": "Buscando frases como 'listo' o 'resuelto' en el texto de la respuesta.",
  "C": "Deteniéndose al alcanzar un tope fijo de iteraciones (p. ej. 50).",
  "D": "Comprobando si la respuesta del asistente contiene texto en vez de una llamada a tool.",
  "just": "El control de flujo del bucle agéntico se basa en la señal del servidor `stop_reason`; `end_turn` indica que el modelo terminó. Parsear texto en lenguaje natural es frágil ante variaciones de formato, el tope de iteraciones es solo un fallback de seguridad, y la mera presencia de texto no distingue de forma fiable un turno intermedio de la respuesta final."},
 {"topic": TOPIC5_ID, "order": 73, "correct": "A",
  "prompt": "Cada llamada a `get_customer` devuelve más de 40 campos, pero el agente solo necesita 5 (nombre, email, tier, estado de cuenta y order IDs). En conversaciones largas ese volumen llena el contexto y degrada las respuestas. ¿Cuál es la mejor solución?",
  "A": "Recortar la salida de la tool a solo los campos relevantes antes de que se acumule en el contexto.",
  "B": "Aumentar el tamaño de la ventana de contexto cambiando de modelo.",
  "C": "Resumir periódicamente toda la conversación cuando el contexto crece.",
  "D": "Pedir en el prompt que el agente ignore los campos irrelevantes.",
  "just": "Los resultados de tools acumulan tokens desproporcionados a su relevancia. Recortarlos a los campos necesarios antes de que entren al contexto ataca la causa directa. Un modelo mayor no evita la acumulación, resumir arriesga perder hechos transaccionales precisos, y pedir 'ignorar' en el prompt no impide que esos tokens ocupen y ensucien el contexto."},
 {"topic": TOPIC5_ID, "order": 74, "correct": "A",
  "prompt": "Un cliente pide igualar el precio de un competidor. La política de la empresa solo cubre ajustes de precio dentro del propio sitio y no dice nada sobre competidores. ¿Qué debe hacer el agente?",
  "A": "Escalar a un humano porque la política es ambigua o silenciosa sobre este pedido específico.",
  "B": "Denegar el pedido porque la política no lo contempla explícitamente.",
  "C": "Conceder el ajuste asumiendo que es equivalente a un ajuste del propio sitio.",
  "D": "Reportar alta incertidumbre y dejar que el cliente decida si insiste.",
  "just": "Las excepciones y los vacíos de política —no solo los casos complejos— son disparadores válidos de escalada. Cuando la política no cubre el pedido, un humano debe decidir. Denegar o conceder por cuenta propia inventa política, y trasladar la decisión al cliente no resuelve el vacío."},
 {"topic": TOPIC5_ID, "order": 75, "correct": "A",
  "prompt": "Un cliente escribe un único mensaje con tres asuntos: un reembolso por un artículo dañado, una pregunta sobre el estado de otro pedido y una queja de facturación. ¿Cuál es el mejor enfoque para resolverlo?",
  "A": "Descomponer el mensaje en los tres asuntos, atender cada uno con su tool correspondiente y sintetizar una respuesta unificada.",
  "B": "Atender solo el asunto más urgente y pedir al cliente que reenvíe los demás por separado.",
  "C": "Escalar a un humano porque el mensaje contiene múltiples asuntos.",
  "D": "Responder los tres asuntos con una única llamada a una tool genérica.",
  "just": "Un request multi-tema debe separarse en asuntos distintos, resolver cada uno con la tool adecuada y sintetizar una resolución unificada. Atender solo uno o pedir reenvíos degrada la experiencia, escalar por el mero hecho de haber varios asuntos es innecesario, y no existe una tool genérica que resuelva asuntos heterogéneos en una sola llamada."},

 # ===== Structured Data Extraction (76..90) =====
 {"topic": TOPIC6_ID, "order": 76, "correct": "A",
  "prompt": "Tu extractor a veces produce JSON con errores de sintaxis (comas faltantes, comillas sin cerrar) que rompen el parser posterior. ¿Cuál es el enfoque más fiable para garantizar una salida conforme al esquema?",
  "A": "Definir la extracción como una tool con un JSON schema como input y tomar los datos del bloque `tool_use` de la respuesta.",
  "B": "Pedir en el prompt 'devuelve solo JSON válido' y añadir ejemplos del formato.",
  "C": "Un paso de post-procesamiento que intente reparar el JSON malformado con expresiones regulares.",
  "D": "Bajar la temperatura a 0 para que el modelo sea más consistente con la sintaxis.",
  "just": "`tool_use` con un JSON schema es el mecanismo más fiable para salida conforme al esquema porque elimina los errores de sintaxis JSON por construcción. Pedirlo en el prompt sigue permitiendo errores, reparar con regex es frágil, y bajar la temperatura reduce la variación pero no garantiza JSON válido."},
 {"topic": TOPIC6_ID, "order": 77, "correct": "A",
  "prompt": "Ya usas `tool_use` con un schema estricto y el JSON siempre es sintácticamente válido. Aun así, algunas facturas extraídas tienen line items que no suman el total declarado y valores en campos equivocados. ¿Qué lo explica mejor?",
  "A": "Los schemas estrictos eliminan los errores de sintaxis pero no los semánticos; hace falta validación de contenido (p. ej. comparar la suma de line items con el total).",
  "B": "El schema no es lo bastante estricto; añadir más campos required lo corregirá.",
  "C": "El modelo necesita una temperatura más baja para calcular bien los totales.",
  "D": "El documento fuente debe estar corrupto; conviene rechazarlo.",
  "just": "Un schema garantiza la forma, no el significado: no impide que los números no cuadren o que un valor caiga en el campo equivocado. Se necesita validación semántica del contenido. Más campos required o menor temperatura no atacan la corrección semántica, y asumir corrupción del documento ignora que el fallo es de extracción."},
 {"topic": TOPIC6_ID, "order": 78, "correct": "A",
  "prompt": "Algunos contratos no incluyen una fecha de renovación, pero tu schema la marca como required. El modelo entonces inventa fechas plausibles para satisfacer el campo. ¿Cuál es la mejor solución?",
  "A": "Hacer el campo nullable/opcional para que el modelo pueda dejarlo vacío en vez de fabricar un valor.",
  "B": "Añadir al prompt la instrucción 'no inventes datos que no estén en el documento'.",
  "C": "Un paso de validación posterior que marque las fechas de renovación sospechosas.",
  "D": "Reintentar la extracción con el mismo documento hasta que devuelva un valor consistente.",
  "just": "Marcar como required un campo que puede no existir empuja al modelo a fabricar valores. Hacerlo nullable/opcional le permite dejarlo vacío legítimamente. La instrucción en el prompt es menos fiable, la validación posterior no evita la fabricación, y reintentar no crea información que no está en el documento."},
 {"topic": TOPIC6_ID, "order": 79, "correct": "A",
  "prompt": "Una extracción falla la validación porque el importe total no coincide con la suma de los conceptos. ¿Cuál es la forma más efectiva de que el sistema se autocorrija?",
  "A": "Un follow-up que incluya el documento original, la extracción fallida y los errores de validación específicos para guiar la corrección.",
  "B": "Reintentar la misma solicitud sin cambios varias veces hasta que pase.",
  "C": "Marcar el documento para revisión humana sin intentar corregir.",
  "D": "Reducir el número de campos extraídos para bajar la probabilidad de error.",
  "just": "El retry con feedback de error anexa los errores de validación concretos al reintento para que el modelo corrija el problema específico. Reintentar sin cambios repite el mismo fallo, escalar de inmediato desaprovecha una corrección barata, y reducir campos degrada la extracción en vez de corregirla."},
 {"topic": TOPIC6_ID, "order": 80, "correct": "A",
  "prompt": "La validación falla porque falta el número de identificación fiscal del proveedor. Al inspeccionar el documento, ese dato no aparece en ninguna parte. ¿Cuál es la acción correcta?",
  "A": "Reconocer que el reintento no ayudará porque la información no está en la fuente, y marcar el campo como ausente para revisión u obtención externa.",
  "B": "Reintentar con feedback de error hasta que el modelo lo encuentre.",
  "C": "Dejar que el modelo infiera el identificador a partir del nombre del proveedor.",
  "D": "Bajar la temperatura y volver a extraer el documento completo.",
  "just": "El retry corrige errores de formato o estructura, pero es inútil cuando la información sencillamente no está en el documento. Lo correcto es reconocer la ausencia y marcarla, no reintentar en bucle, ni inferir/inventar el dato, ni reprocesar esperando que aparezca algo que no existe."},
 {"topic": TOPIC6_ID, "order": 81, "correct": "A",
  "prompt": "Clasificas cada documento en un enum de tipos (invoice, receipt, contract). Aparecen documentos que no encajan en ninguna categoría y otros demasiado ambiguos para clasificar. ¿Cuál es el mejor diseño de schema?",
  "A": "Añadir un valor `other` con un campo de detalle en texto para categorías extensibles y un valor `unclear` para los casos ambiguos.",
  "B": "Forzar siempre la categoría más cercana entre las tres existentes.",
  "C": "Ampliar el enum con todas las categorías imaginables por adelantado.",
  "D": "Eliminar el enum y dejar el tipo como texto libre.",
  "just": "Un enum con `other` + detalle permite categorización extensible sin fabricar, y `unclear` captura la ambigüedad de forma explícita. Forzar la categoría más cercana introduce clasificaciones erróneas, enumerar todo por adelantado es inviable, y el texto libre pierde la estructura que aporta el enum."},
 {"topic": TOPIC6_ID, "order": 82, "correct": "A",
  "prompt": "Quieres detectar automáticamente cuándo el total de una factura extraída no cuadra con sus conceptos. ¿Qué diseño de salida lo habilita mejor?",
  "A": "Extraer tanto `stated_total` (el total del documento) como `calculated_total` (la suma de los conceptos) para poder comparar y detectar discrepancias.",
  "B": "Extraer solo `stated_total` y confiar en que el documento es correcto.",
  "C": "Pedir al modelo que confirme en prosa que los números cuadran.",
  "D": "Redondear ambos valores para que las pequeñas diferencias desaparezcan.",
  "just": "Extraer por separado el total declarado y el total calculado permite una comprobación determinista de consistencia. Confiar en el total declarado no detecta discrepancias, una confirmación en prosa no es verificable, y redondear oculta errores reales en vez de detectarlos."},
 {"topic": TOPIC6_ID, "order": 83, "correct": "A",
  "prompt": "Debes extraer datos de 50.000 documentos archivados para una auditoría trimestral. No es urgente y toleras hasta un día de latencia; quieres minimizar el costo. ¿Qué enfoque es el más apropiado?",
  "A": "Enviar las extracciones a la Message Batches API con un `custom_id` por documento y recuperar los resultados al completarse el lote.",
  "B": "Procesar los 50.000 documentos con la API síncrona en paralelo para terminar antes.",
  "C": "Concatenar muchos documentos por request para reducir el número de llamadas.",
  "D": "Esperar a poder revisar cada documento manualmente antes de extraer.",
  "just": "Una carga grande, no bloqueante y tolerante a la latencia encaja con la Message Batches API, que reduce el costo un 50% y usa `custom_id` para correlacionar cada documento. La API síncrona no ofrece el ahorro, concatenar documentos degrada la estructura y la correlación, y la revisión manual previa no aplica a 50.000 documentos."},
 {"topic": TOPIC6_ID, "order": 84, "correct": "A",
  "prompt": "Tras un lote de extracción, 300 de 50.000 documentos fallaron por exceder el contexto. ¿Cuál es la forma más eficiente de completarlos?",
  "A": "Reenviar en un nuevo lote solo los documentos fallidos (por su `custom_id`), troceando los que excedieron el contexto.",
  "B": "Reprocesar el lote completo de 50.000 documentos desde cero.",
  "C": "Descartar los 300 documentos fallidos como no procesables.",
  "D": "Aumentar `max_tokens` y reenviar los 50.000 sin trocear.",
  "just": "Lo eficiente es reenviar únicamente los documentos fallidos, identificados por `custom_id`, y trocear los que excedieron el contexto para que quepan. Reprocesar todo desperdicia trabajo y dinero, descartar pierde datos de la auditoría, y subir `max_tokens` no resuelve documentos que superan la ventana de contexto."},
 {"topic": TOPIC6_ID, "order": 85, "correct": "A",
  "prompt": "Extraes referencias de artículos académicos, pero los documentos varían mucho (citas inline, bibliografías al final, metodología en secciones separadas o embebida) y las instrucciones detalladas dan resultados inconsistentes. ¿Qué técnica es la más efectiva?",
  "A": "Añadir 2-4 ejemplos few-shot que muestren la extracción correcta sobre formatos de documento variados.",
  "B": "Escribir instrucciones aún más largas y exhaustivas que cubran cada formato posible.",
  "C": "Un pipeline distinto por cada formato de documento detectado.",
  "D": "Pedir al modelo que primero describa el formato y luego extraiga.",
  "just": "Los few-shot son la técnica más efectiva cuando las instrucciones detalladas producen resultados inconsistentes: demuestran el manejo de casos variados y permiten generalizar a formatos nuevos. Instrucciones más largas siguen siendo inconsistentes, un pipeline por formato es frágil y costoso, y describir el formato primero no garantiza una extracción correcta."},
 {"topic": TOPIC6_ID, "order": 86, "correct": "A",
  "prompt": "Tu sistema tiene varios schemas de extracción (factura, recibo, contrato) y el tipo de documento entrante es desconocido de antemano. A veces el modelo responde con texto conversacional en vez de extraer. ¿Qué configuración lo corrige mejor?",
  "A": "Usar `tool_choice: \"any\"` para forzar que el modelo llame a una de las tools de extracción en vez de devolver texto.",
  "B": "Usar `tool_choice: \"auto\"` y pedir en el prompt que siempre extraiga.",
  "C": "Forzar siempre la tool de factura como predeterminada.",
  "D": "Añadir una tool de 'respuesta en texto' para capturar los casos sin extracción.",
  "just": "`tool_choice: \"any\"` obliga al modelo a llamar a una tool (eligiendo el schema adecuado) en vez de devolver texto, apropiado cuando hay varios schemas y el tipo es desconocido. `\"auto\"` permite texto, forzar siempre factura clasifica mal los demás tipos, y añadir una tool de texto legitima justamente el comportamiento que quieres evitar."},
 {"topic": TOPIC6_ID, "order": 87, "correct": "A",
  "prompt": "Tu extractor reporta un 97% de exactitud global y el equipo quiere reducir la revisión humana. ¿Qué es lo más prudente antes de automatizar las extracciones de alta confianza?",
  "A": "Validar la exactitud por tipo de documento y por campo mediante muestreo aleatorio estratificado, ya que la métrica global puede enmascarar fallos concretos.",
  "B": "Automatizar todo lo que supere el 90% de confianza reportada por el modelo.",
  "C": "Reducir la revisión humana de forma uniforme en todos los tipos de documento.",
  "D": "Confiar en el 97% global, dado que supera cualquier umbral razonable.",
  "just": "Una métrica agregada puede ocultar un mal desempeño en ciertos tipos de documento o campos. El muestreo estratificado mide la exactitud por tipo y por campo para decidir dónde es seguro automatizar. La confianza auto-reportada está mal calibrada, y reducir la revisión de forma uniforme o confiar en el global ignora los puntos débiles ocultos."},
 {"topic": TOPIC6_ID, "order": 88, "correct": "A",
  "prompt": "Las fechas aparecen en los documentos en formatos diversos (DD/MM/AAAA, 'March 3, 2025', 2025-03-03) y necesitas que la salida use un formato ISO uniforme. El schema estricto define el tipo, pero no la normalización. ¿Cuál es el mejor enfoque?",
  "A": "Incluir reglas de normalización de formato en el prompt junto al schema estricto (p. ej. 'convierte todas las fechas a ISO 8601 AAAA-MM-DD').",
  "B": "Confiar en que el schema estricto por sí solo normalice las fechas.",
  "C": "Un post-procesamiento con regex que intente reformatear cualquier fecha.",
  "D": "Rechazar los documentos cuyas fechas no vengan ya en ISO 8601.",
  "just": "El schema garantiza el tipo del campo, pero la normalización de formato debe indicarse: reglas de normalización en el prompt, junto al schema estricto, producen fechas uniformes. El schema por sí solo no normaliza, el regex posterior es frágil ante la variedad de formatos, y rechazar documentos no procesa datos válidos que solo necesitan normalizarse."},
 {"topic": TOPIC6_ID, "order": 89, "correct": "A",
  "prompt": "Algunos documentos contienen datos internamente inconsistentes (p. ej. un importe distinto en el resumen y en el desglose). Quieres que el sistema los señale en lugar de elegir un valor en silencio. ¿Qué diseño de salida lo habilita?",
  "A": "Incluir un booleano `conflict_detected` (con los valores en conflicto y su ubicación) para marcar las fuentes inconsistentes en lugar de escoger arbitrariamente.",
  "B": "Instruir al modelo para que elija el valor que le parezca más probable.",
  "C": "Promediar los valores en conflicto para obtener un único número.",
  "D": "Descartar los documentos que contengan cualquier inconsistencia.",
  "just": "Ante datos fuente en conflicto, lo correcto es anotar el conflicto con los valores y su procedencia, no elegir uno en silencio. Un booleano `conflict_detected` marca esos casos para revisión. Elegir el 'más probable' o promediar oculta el problema, y descartar pierde documentos que un humano podría reconciliar."},
 {"topic": TOPIC6_ID, "order": 90, "correct": "A",
  "prompt": "Consolidas cifras de mercado extraídas de varios informes y a veces valores de años distintos se interpretan erróneamente como contradicciones. ¿Qué debe requerir la salida estructurada para evitarlo?",
  "A": "Requerir en cada extracción la fecha de publicación o de recolección del dato, para que las diferencias temporales no se confundan con contradicciones.",
  "B": "Quedarse solo con el valor más reciente y descartar los demás.",
  "C": "Promediar los valores de todos los informes en una única cifra.",
  "D": "Marcar cualquier diferencia entre informes como un error de extracción.",
  "just": "Sin contexto temporal, cifras de años distintos parecen contradecirse. Requerir la fecha de publicación/recolección en la salida permite interpretar correctamente las diferencias. Quedarse con el más reciente o promediar descarta información válida, y marcar toda diferencia como error confunde variación temporal legítima con fallo."},

 # ===== Customer Support Resolution Agent — ALTA DENSIDAD (91..100) =====
 {"topic": TOPIC5_ID, "order": 91, "correct": "A", "difficulty": "advanced",
  "prompt": "Tu agente de soporte de una fintech opera con el pipeline get_customer → lookup_order → process_refund. Una auditoría SOC2 detecta que en el 3% de los reembolsos el agente llamó a process_refund sin un customer ID verificado, porque en las conversaciones donde el cliente daba el número de orden por adelantado el modelo saltaba get_customer. El equipo ya reforzó el system prompt dos veces sin éxito. ¿Qué cambio garantiza que ningún reembolso se ejecute sin verificación previa de identidad?",
  "A": "Un gate programático en la capa de middleware que rechace toda llamada a process_refund cuyo estado de sesión no contenga un customer ID ya verificado por get_customer.",
  "B": "Añadir un parámetro required verified_customer_id al JSON schema de process_refund para que el modelo no pueda invocarla sin ese campo.",
  "C": "Un ejemplo few-shot muy detallado por cada flujo posible que muestre a get_customer ejecutándose siempre antes que process_refund.",
  "D": "Instrucciones en mayúsculas al inicio y al final del system prompt exigiendo verificar identidad antes de cualquier reembolso.",
  "just": "La verificación de identidad antes de mover dinero es una regla de negocio crítica que exige cumplimiento determinista y debe imponerse en la capa de middleware como un prerequisito que bloquee process_refund hasta que exista un customer ID verificado en el estado de sesión. Un campo required en el schema solo obliga a que el argumento esté presente en esa llamada, pero el modelo puede rellenarlo con un valor no verificado; los few-shot y el énfasis en el prompt ya fallaron porque dependen de cumplimiento probabilístico."},
 {"topic": TOPIC5_ID, "order": 92, "correct": "C", "difficulty": "advanced",
  "prompt": "Reescribiste las descripciones de get_customer y lookup_order con formatos de entrada, ejemplos y fronteras claras, y aun así el agente sigue llamando a get_customer cuando el cliente menciona 'mi cuenta' aunque pregunte por una orden. Al revisar la configuración notas que el system prompt incluye la línea 'cuando el usuario hable de su cuenta, recupera primero los datos del cliente'. ¿Cuál es la causa raíz y el arreglo más efectivo?",
  "A": "Las descripciones siguen siendo ambiguas; hay que añadir más ejemplos de queries a get_customer y lookup_order.",
  "B": "El modelo necesita un router de keywords que mapee 'orden' a lookup_order y 'cuenta' a get_customer antes de invocar la tool.",
  "C": "Una instrucción sensible a la keyword 'cuenta' en el system prompt está anulando las descripciones; hay que reformularla o quitarla para que no fuerce la selección.",
  "D": "Consolidar ambas tools en una sola get_account_data que decida internamente qué devolver.",
  "just": "El wording del system prompt puede crear asociaciones por keyword que anulan descripciones de tools bien escritas: aquí 'cuando el usuario hable de su cuenta, recupera primero los datos del cliente' empuja hacia get_customer ante la palabra 'cuenta' aunque la intención sea consultar una orden. La solución es reformular o quitar esa instrucción keyword-sensible. Añadir más ejemplos no vence la instrucción conflictiva, un router es sobre-ingeniería, y consolidar tools elimina una distinción útil en lugar de corregir la causa."},
 {"topic": TOPIC5_ID, "order": 93, "correct": "A", "difficulty": "advanced",
  "prompt": "El agente resuelve el 55% en primer contacto (meta 80%). Segmentando por categoría ves que sobre-escala las devoluciones estándar con foto (que debería resolver) e intenta resolver por su cuenta las excepciones de política (que debería escalar). Un ingeniero propone añadir 15 ejemplos few-shot de casos complejos ya resueltos para 'enseñarle a resolver más'. ¿Cuál es el enfoque más efectivo?",
  "A": "Definir criterios de escalada explícitos y aportar few-shot balanceados que muestren tanto cuándo resolver (devoluciones estándar) como cuándo escalar (excepciones de política).",
  "B": "Añadir los 15 ejemplos de casos complejos resueltos para que el agente gane confianza y resuelva más casos por su cuenta.",
  "C": "Hacer que el agente puntúe su confianza (1-10) y escale por debajo de 7, calibrando el umbral con datos históricos.",
  "D": "Añadir análisis de sentimiento para no escalar cuando el cliente está tranquilo, reservando la escalada a clientes molestos.",
  "just": "El fallo es un límite de decisión mal calibrado en ambos sentidos, no falta de capacidad: sobre-escala lo fácil y sub-escala lo que debería derivar. Se corrige con criterios de escalada explícitos y few-shot balanceados que muestren ambos lados de la frontera. Añadir solo ejemplos de casos complejos resueltos sesga al agente a intentar resolver excepciones de política; la confianza auto-reportada está mal calibrada; y el sentimiento no correlaciona con la complejidad del caso."},
 {"topic": TOPIC5_ID, "order": 94, "correct": "B", "difficulty": "advanced",
  "prompt": "La política permite reembolsos automáticos hasta $500; por encima requiere aprobación humana y un registro auditable. Hoy la regla vive en el system prompt y en el 2% de los casos el agente aprobó montos mayores. Además, cumplimiento exige un log inmutable de cada bloqueo. ¿Qué diseño satisface ambos requisitos de forma fiable?",
  "A": "Reforzar el system prompt con la regla del límite y pedir al agente que registre en el chat cada vez que bloquee un reembolso alto.",
  "B": "Un hook PreToolUse sobre process_refund que bloquee de forma determinista los montos superiores a $500, los redirija a escalada humana y escriba el evento en el log de auditoría.",
  "C": "Añadir un campo max_amount al schema de process_refund y confiar en que el modelo lo respete.",
  "D": "Un paso posterior que revise los reembolsos emitidos cada noche y revierta los que excedieron el límite, registrando la reversión.",
  "just": "El límite de reembolso es una regla de cumplimiento crítica y debe imponerse en la capa de middleware, no en el prompt. Un hook PreToolUse bloquea de forma determinista antes de tocar el backend, redirige a escalada humana y puede escribir el log de auditoría inmutable que exige cumplimiento. El énfasis en el prompt y el campo de schema dependen del cumplimiento del modelo, y la reversión nocturna permite que el reembolso indebido ocurra y solo lo corrige tarde."},
 {"topic": TOPIC5_ID, "order": 95, "correct": "A", "difficulty": "advanced",
  "prompt": "Un incidente muestra que, cuando el gateway de pagos tuvo una caída de 4 minutos, el agente reintentó process_refund decenas de veces y, al recuperarse el servicio, emitió reembolsos duplicados. La tool devuelve siempre el string 'error' sin distinguir el tipo de fallo. ¿Qué cambio previene mejor este tipo de incidente?",
  "A": "Devolver errores estructurados con errorCategory (transient/validation/permission/business) e isRetryable, y aplicar recuperación local acotada solo a los transitorios, tratando los reembolsos ya iniciados como no reintentables por defecto.",
  "B": "Aumentar el número máximo de reintentos y añadir jitter aleatorio para espaciar las llamadas durante las caídas del gateway.",
  "C": "Capturar el error y devolver un resultado vacío marcado como éxito para que el agente no reintente.",
  "D": "Escalar a un humano cada vez que process_refund falle, sin importar la causa.",
  "just": "El incidente nace de errores indistinguibles: el agente no sabía que el fallo era transitorio ni que la operación podía haberse iniciado, así que reintentó a ciegas y duplicó reembolsos. Errores estructurados con categoría e isRetryable permiten reintentar solo lo transitorio y tratar los reembolsos como no reintentables salvo confirmación. Más reintentos agravan el problema, marcar vacío como éxito oculta fallos reales, y escalar ante cualquier fallo desperdicia la recuperación de errores transitorios benignos."},
 {"topic": TOPIC5_ID, "order": 96, "correct": "C", "difficulty": "advanced",
  "prompt": "En una conversación de 30 turnos sobre tres pedidos, el agente confunde a mitad de charla el monto de reembolso acordado ($85) con el total de otro pedido ($120) y ofrece la cifra equivocada. El historial se resume de forma progresiva para caber en el contexto, y los datos clave quedaron sepultados en el medio del historial. ¿Cuál es la forma más fiable de evitarlo?",
  "A": "Cambiar a un modelo con ventana de contexto mayor para no tener que resumir el historial.",
  "B": "Aumentar la longitud de cada resumen progresivo para que retenga más detalle de los turnos intermedios.",
  "C": "Mantener un bloque persistente de 'case facts' (montos, order IDs, estados por pedido) inyectado en cada prompt, fuera del historial resumido y colocado al inicio o al final.",
  "D": "Pedir al agente que, antes de responder, relea todo el historial de la conversación para recuperar los datos correctos.",
  "just": "Los valores transaccionales se pierden por dos efectos combinados: la summarización progresiva los condensa y el 'lost in the middle' hace que el modelo ignore lo que quedó en el centro del historial. Un bloque de 'case facts' con los datos exactos por pedido, inyectado en cada prompt y ubicado al inicio o al final, los preserva de forma fiable. Un modelo mayor no evita la condensación, resúmenes más largos siguen sepultando datos en el medio, y releer el historial es costoso y poco fiable."},
 {"topic": TOPIC5_ID, "order": 97, "correct": "A", "difficulty": "advanced",
  "prompt": "Cuando el agente escala, el operador humano tarda de media 6 minutos en retomar el caso porque recibe la transcripción completa de la conversación y debe reconstruir qué se intentó. Cumplimiento además exige registrar el motivo de cada escalada. ¿Qué mejora el handoff de forma más efectiva?",
  "A": "Generar un paquete de escalada estructurado con customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action y escalation_reason.",
  "B": "Adjuntar la transcripción completa con marcas de tiempo y resaltar los mensajes del cliente.",
  "C": "Un resumen en prosa libre generado por el modelo en el momento de escalar, anexado al inicio del chat.",
  "D": "Un enlace al CRM con el historial del cliente para que el operador lo consulte durante la llamada.",
  "just": "El operador no debería reconstruir el caso a partir del chat; necesita un resumen estructurado y accionable. Un paquete de escalada con los hechos clave, lo ya intentado, la acción recomendada y el motivo de escalada permite retomar de inmediato y satisface el registro que exige cumplimiento. La transcripción completa y el enlace al CRM trasladan el trabajo al humano, y un resumen en prosa libre es menos fiable y puede omitir el escalation_reason requerido."},
 {"topic": TOPIC5_ID, "order": 98, "correct": "D", "difficulty": "advanced",
  "prompt": "get_customer devuelve dos clientes con el mismo nombre y apellido. Uno tiene un email cuyo dominio coincide con el de la empresa desde la que el cliente escribe; el otro tiene actividad de cuenta más reciente. El cliente pide un reembolso de $300. ¿Qué debe hacer el agente?",
  "A": "Elegir el cliente cuyo dominio de email coincide con el de la empresa del remitente, por ser la señal más fuerte.",
  "B": "Elegir el cliente con actividad de cuenta más reciente, ya que es más probable que sea quien escribe.",
  "C": "Procesar el reembolso en ambas cuentas y avisar al cliente de que confirme cuál era la correcta.",
  "D": "Pedir al cliente un identificador adicional (número de orden, últimos dígitos del método de pago o código postal) para desambiguar antes de tocar ninguna cuenta.",
  "just": "Con múltiples coincidencias y una operación financiera de por medio, cualquier heurística —dominio de email o recencia— puede seleccionar la cuenta equivocada y ejecutar un reembolso indebido. Lo correcto es pedir un identificador adicional que verifique la identidad antes de actuar. Elegir por dominio o recencia es adivinar, y procesar en ambas cuentas viola la privacidad y puede duplicar el reembolso."},
 {"topic": TOPIC5_ID, "order": 99, "correct": "A", "difficulty": "advanced",
  "prompt": "Cada get_customer devuelve un objeto de 45 campos (preferencias de marketing, historial de sesiones, flags internos) del que el agente solo usa 5. En conversaciones largas, ese volumen empuja el contexto por encima del 70% y las respuestas empiezan a degradarse y a citar datos de pedidos equivocados. ¿Cuál es la mejor solución?",
  "A": "Recortar (mediante un hook PostToolUse o un wrapper) la salida de get_customer a los 5 campos relevantes antes de que se acumule en el contexto.",
  "B": "Cambiar a un modelo con una ventana de contexto mayor para absorber los 45 campos sin degradación.",
  "C": "Resumir toda la conversación automáticamente cada vez que el contexto supere el 80%.",
  "D": "Instruir al agente en el prompt para que ignore los 40 campos que no necesita.",
  "just": "Los resultados de tools acumulan tokens desproporcionados a su relevancia, y aquí 40 campos inútiles por llamada saturan el contexto y provocan context rot. Recortar la salida a los campos necesarios antes de que se acumulen ataca la causa directa. Un modelo mayor solo retrasa el problema, resumir al 80% ya llega tarde (el modelo ya está degradado y puede alucinar su propio resumen), y pedir 'ignorar' en el prompt no impide que esos tokens ocupen el contexto."},
 {"topic": TOPIC5_ID, "order": 100, "correct": "C", "difficulty": "advanced",
  "prompt": "Tu bucle agéntico termina el turno cuando detecta en el texto del asistente frases como 'he procesado tu reembolso'. En producción, el agente a veces menciona esa frase mientras aún planifica y el bucle corta antes de ejecutar realmente process_refund, dejando al cliente sin reembolso; otras veces la menciona dos veces y se duplica la acción. ¿Cómo debe decidir el bucle que el turno terminó?",
  "A": "Ampliar la lista de frases de finalización y exigir que aparezcan al final del mensaje para reducir los falsos positivos.",
  "B": "Detener el bucle al alcanzar un tope de iteraciones que garantice que la acción ya se ejecutó.",
  "C": "Evaluar estrictamente stop_reason == 'end_turn' como única señal de finalización, ejecutando las tools solo cuando stop_reason == 'tool_use'.",
  "D": "Comprobar si la respuesta contiene texto del asistente en lugar de una llamada a tool y, si es así, terminar.",
  "just": "Parsear lenguaje natural para decidir la terminación es una abstracción con fugas: frágil ante variaciones de redacción y ante que el modelo mencione una acción antes de ejecutarla. El control de flujo debe basarse en la señal del servidor stop_reason: end_turn indica fin del turno y tool_use indica que hay que ejecutar herramientas. Ampliar la lista de frases no elimina la fragilidad, el tope de iteraciones es solo un fallback de seguridad, y la mera presencia de texto no distingue un turno intermedio del final."},

 # ===== Structured Data Extraction — ALTA DENSIDAD (101..110) =====
 {"topic": TOPIC6_ID, "order": 101, "correct": "B", "difficulty": "advanced",
  "prompt": "Tu extractor de facturas usa un prompt que pide 'devuelve un objeto JSON con estos campos' y, pese a la temperatura 0, un 4% de las respuestas trae comentarios en prosa antes del JSON o comas finales que rompen tu parser en producción. Necesitas una garantía de que la salida sea siempre JSON parseable y conforme a tus campos. ¿Cuál es el enfoque más fiable?",
  "A": "Añadir un post-procesador que extraiga el primer bloque {...} de la respuesta y le quite las comas finales con regex.",
  "B": "Definir una tool de extracción cuyo input sea un JSON schema y tomar los datos del bloque tool_use de la respuesta, eliminando los errores de sintaxis por construcción.",
  "C": "Reforzar el prompt con 'RESPONDE SOLO CON JSON, SIN TEXTO ADICIONAL' y varios ejemplos del formato exacto.",
  "D": "Bajar aún más la aleatoriedad (top_p) y validar el JSON, reintentando cuando el parseo falle.",
  "just": "tool_use con un JSON schema es el mecanismo más fiable para salida conforme al esquema porque el JSON se genera contra el schema y se eliminan los errores de sintaxis por construcción, tomando los datos del bloque tool_use. El post-procesado con regex es frágil ante variaciones, reforzar el prompt sigue permitiendo texto en prosa y comas finales, y ajustar top_p con reintentos reduce la frecuencia pero no garantiza JSON válido."},
 {"topic": TOPIC6_ID, "order": 102, "correct": "A", "difficulty": "advanced",
  "prompt": "Migraste tu extractor a tool_use con un schema estricto y desde entonces el JSON es siempre sintácticamente válido. Aun así, contabilidad reporta que en un 6% de las facturas la suma de line_items no coincide con el total, y en algunas el impuesto quedó cargado en el campo del subtotal. ¿Qué diagnóstico y arreglo es el correcto?",
  "A": "El schema garantiza la forma pero no la semántica; hay que extraer stated_total y calculated_total, comparar y, ante discrepancia, reintentar con el error específico o marcar para revisión.",
  "B": "El schema no es lo bastante estricto; convertir subtotal, impuesto y total en campos required forzará al modelo a cuadrarlos.",
  "C": "El problema es de cálculo del modelo; bajar la temperatura y añadir 'suma con cuidado' al prompt lo resuelve.",
  "D": "Los documentos fuente están mal escaneados; conviene rechazarlos y solicitar mejores copias.",
  "just": "Un schema estricto elimina los errores de sintaxis pero no los semánticos: no impide que los importes no cuadren ni que un valor caiga en el campo equivocado. La solución es validar el contenido —extraer stated_total y calculated_total, compararlos y reintentar con el error concreto o derivar a revisión—. Más campos required no fuerzan coherencia aritmética, la temperatura no ataca la corrección semántica, y culpar al escaneo ignora que el fallo está en la extracción."},
 {"topic": TOPIC6_ID, "order": 103, "correct": "A", "difficulty": "advanced",
  "prompt": "Extraes cláusulas de contratos y tu schema marca governing_law como required. Cuando un contrato no especifica jurisdicción, el modelo rellena el campo con una plausible ('State of Delaware') en vez de dejarlo vacío, introduciendo datos falsos que legal detectó por casualidad. Ya añadiste 'no inventes datos ausentes' al prompt sin éxito total. ¿Cuál es la mejor solución?",
  "A": "Hacer governing_law nullable/opcional en el schema para que el modelo pueda omitirlo legítimamente cuando el documento no lo contiene.",
  "B": "Reforzar la instrucción 'no inventes datos ausentes' con ejemplos few-shot de campos dejados en blanco.",
  "C": "Un validador posterior que compruebe si la jurisdicción aparece literalmente en el texto y, si no, borre el valor.",
  "D": "Reintentar la extracción del contrato hasta que el modelo devuelva el mismo valor dos veces seguidas.",
  "just": "Marcar como required un campo que puede no existir empuja al modelo a fabricar un valor para satisfacer el schema. Hacerlo nullable/opcional le permite omitirlo de forma legítima cuando el documento no lo contiene, que es la causa raíz. La instrucción en el prompt ya falló y sigue siendo probabilística, el validador posterior es un parche que no evita la fabricación inicial, y reintentar no crea información que no está en el contrato."},
 {"topic": TOPIC6_ID, "order": 104, "correct": "C", "difficulty": "advanced",
  "prompt": "En un lote de 2.000 facturas, 180 fallan la validación. Al inspeccionarlas, unas fallan porque las fechas vienen en formato local y no cuadran con el patrón esperado, y otras porque el documento sencillamente no incluye el número de pedido que tu schema espera. Un ingeniero propone reintentar las 180 con feedback de error. ¿Cuál es el enfoque correcto?",
  "A": "Reintentar las 180 con feedback de error, ya que anexar el error específico permite al modelo corregir cualquier fallo de validación.",
  "B": "Marcar las 180 para revisión humana sin reintentar, porque los reintentos rara vez ayudan en extracción.",
  "C": "Distinguir los tipos de fallo: reintentar con feedback las que fallan por formato de fecha, y marcar como ausente (sin reintentar) las que carecen del número de pedido en el documento.",
  "D": "Reprocesar todo el lote con un prompt más estricto sobre fechas y números de pedido.",
  "just": "El retry con feedback corrige errores de formato o estructura —como fechas en formato local que solo necesitan normalizarse—, pero es inútil cuando la información simplemente no está en el documento, como un número de pedido ausente. Lo correcto es ramificar: reintentar las de formato con el error específico y marcar como ausentes las que no contienen el dato. Reintentar las 180 malgasta llamadas en las irrecuperables, marcarlas todas descarta correcciones baratas, y reprocesar el lote entero es caro e innecesario."},
 {"topic": TOPIC6_ID, "order": 105, "correct": "A", "difficulty": "advanced",
  "prompt": "Clasificas documentos entrantes en un enum de 6 tipos. Un 9% cae en 'None of the above' porque llegan tipos nuevos (notas de crédito, órdenes de compra) que no anticipaste, y otro 3% son ilegibles o ambiguos. Forzar la clasificación al tipo más cercano generó errores aguas abajo. ¿Cuál es el mejor diseño de schema?",
  "A": "Añadir un valor 'other' con un campo de detalle en texto para tipos no anticipados y un valor 'unclear' para los documentos ambiguos o ilegibles.",
  "B": "Ampliar el enum ahora con notas de crédito y órdenes de compra, y repetir la ampliación cada vez que aparezca un tipo nuevo.",
  "C": "Forzar siempre el tipo más cercano del enum y registrar la confianza para revisar después los de baja confianza.",
  "D": "Eliminar el enum y dejar document_type como texto libre para que el modelo escriba lo que corresponda.",
  "just": "Un enum con 'other' + detalle absorbe los tipos no anticipados sin fabricar una categoría incorrecta, y 'unclear' captura de forma explícita lo ilegible o ambiguo, evitando los errores aguas abajo de forzar el tipo más cercano. Ampliar el enum manualmente ante cada tipo nuevo es un mantenimiento interminable, forzar el más cercano reintroduce las clasificaciones erróneas, y el texto libre pierde la estructura y la consistencia que aporta el enum."},
 {"topic": TOPIC6_ID, "order": 106, "correct": "C", "difficulty": "advanced",
  "prompt": "Tienes dos cargas de extracción: (1) validar la factura en el checkout en tiempo real, donde el cliente espera la confirmación en segundos, y (2) un reproceso nocturno de 200.000 facturas históricas para un data warehouse. Un manager propone pasar ambas a la Message Batches API para ahorrar un 50%. ¿Cómo deberías evaluarlo?",
  "A": "Pasar ambas a batch y hacer polling del estado, aceptando la latencia a cambio del ahorro del 50%.",
  "B": "Mantener ambas en la API síncrona para evitar problemas de correlación y orden de resultados.",
  "C": "Solo el reproceso nocturno va a batch (tolera latencia); la validación en checkout se queda en la API síncrona porque es bloqueante y sensible a la latencia.",
  "D": "Pasar ambas a batch con un fallback a la API síncrona si el lote tarda más de lo esperado.",
  "just": "La Message Batches API ahorra un 50% pero puede tardar hasta 24 horas sin SLA de latencia, así que solo sirve para cargas no bloqueantes y tolerantes a la latencia como el reproceso nocturno. La validación en el checkout es bloqueante —el cliente espera— y debe seguir en la API síncrona. Pasar ambas a batch rompe el requisito de tiempo real, mantener todo síncrono renuncia al ahorro donde sí aplica, y el fallback añade complejidad sin resolver que el batch no garantiza latencia."},
 {"topic": TOPIC6_ID, "order": 107, "correct": "B", "difficulty": "advanced",
  "prompt": "Extraes datos de informes clínicos con estructuras muy dispares: unos ponen la dosis en una tabla, otros en prosa dentro de la sección de tratamiento, otros en notas al pie. Instrucciones cada vez más largas dan resultados inconsistentes entre formatos. El equipo baraja opciones. ¿Cuál es la técnica más efectiva?",
  "A": "Escribir una especificación aún más exhaustiva que describa cada ubicación posible de la dosis en todos los formatos conocidos.",
  "B": "Añadir 2-4 ejemplos few-shot que muestren la extracción correcta de la dosis sobre formatos variados (tabla, prosa, nota al pie), enseñando el criterio para generalizar.",
  "C": "Hacer fine-tuning del modelo con miles de informes clínicos etiquetados para que aprenda todos los formatos.",
  "D": "Construir un pipeline distinto por cada formato de informe detectado por reglas.",
  "just": "Cuando instrucciones detalladas dan resultados inconsistentes ante formatos variados, los few-shot son la técnica más efectiva: 2-4 ejemplos que muestren la extracción correcta en distintas ubicaciones enseñan el criterio subyacente y permiten generalizar a formatos nuevos. Una especificación más larga sigue siendo inconsistente, el fine-tuning es costoso y rígido (y fuera del enfoque práctico del examen), y un pipeline por formato es frágil y no escala a variantes no previstas."},
 {"topic": TOPIC6_ID, "order": 108, "correct": "D", "difficulty": "advanced",
  "prompt": "Tu pipeline de extracción debe ejecutar extract_metadata (tipo de documento, fecha, emisor) antes de un paso de enriquecimiento que depende de esos metadatos. A veces el modelo salta directamente al enriquecimiento o responde con texto, rompiendo el orden. ¿Qué configuración garantiza que extract_metadata se ejecute primero?",
  "A": "Usar tool_choice 'auto' y describir en el prompt que extract_metadata debe ir primero.",
  "B": "Usar tool_choice 'any' para que el modelo llame alguna tool en cada paso y confiar en que elija bien el orden.",
  "C": "Fusionar extract_metadata y el enriquecimiento en una sola tool para que el orden sea irrelevante.",
  "D": "Forzar tool_choice a la tool específica ({'type':'tool','name':'extract_metadata'}) en la primera llamada para garantizar que corra antes del enriquecimiento.",
  "just": "Cuando un paso debe ejecutarse antes que otro, forzar tool_choice a esa tool específica en la primera llamada garantiza de forma determinista que extract_metadata corra primero. 'auto' permite que el modelo salte el paso o devuelva texto, 'any' obliga a llamar alguna tool pero no fija cuál, y fusionar ambas tools mezcla responsabilidades y pierde la separación que hace el enriquecimiento dependiente de metadatos ya validados."},
 {"topic": TOPIC6_ID, "order": 109, "correct": "A", "difficulty": "advanced",
  "prompt": "Tu extractor reporta un 97% de exactitud global sobre un set mixto de facturas, recibos y contratos. Antes de reducir la revisión humana, un muestreo rápido sugiere que los contratos —el 8% del volumen— rinden mucho peor que la media. ¿Cuál es el paso más prudente antes de automatizar las extracciones de alta confianza?",
  "A": "Medir la exactitud por tipo de documento y por campo mediante muestreo aleatorio estratificado, ya que la media global puede enmascarar un tipo (contratos) con desempeño bajo.",
  "B": "Automatizar todo lo que supere el 90% de confianza auto-reportada por el modelo y revisar el resto.",
  "C": "Reducir la revisión humana de forma uniforme en los tres tipos, dado que el global es del 97%.",
  "D": "Confiar en el 97% global porque ya supera el umbral de negocio, y monitorear quejas para detectar problemas.",
  "just": "Una métrica agregada puede enmascarar un mal desempeño en un subgrupo —aquí los contratos—, así que automatizar según el global arriesga aceptar extracciones erróneas de ese tipo. El muestreo estratificado por tipo de documento y por campo revela dónde es seguro automatizar y dónde no. La confianza auto-reportada está mal calibrada, reducir la revisión de forma uniforme ignora el punto débil, y esperar a las quejas detecta el problema demasiado tarde."},
 {"topic": TOPIC6_ID, "order": 110, "correct": "A", "difficulty": "advanced",
  "prompt": "Consolidas el 'tamaño de mercado' extraído de 15 informes. Algunos citan $40B, otros $52B; al revisar, unos son de 2021 y otros de 2024, y dos informes recientes se contradicen entre sí para el mismo año. Tu salida actual elige un valor y descarta el resto, ocultando el matiz. ¿Qué debe requerir la salida estructurada?",
  "A": "Requerir la fecha de publicación/recolección de cada cifra y marcar los desacuerdos reales con un conflict_detected que conserve los valores y su fuente, sin elegir uno en silencio.",
  "B": "Quedarse con la cifra más reciente ($52B) y descartar las demás por obsoletas.",
  "C": "Promediar las 15 cifras para obtener un único tamaño de mercado representativo.",
  "D": "Marcar todo el conjunto como no fiable porque las cifras no coinciden entre sí.",
  "just": "Sin contexto temporal, cifras de años distintos parecen contradecirse cuando no lo son, y los conflictos reales entre fuentes creíbles deben anotarse, no resolverse en silencio. Requerir la fecha de cada cifra distingue variación temporal de contradicción, y un conflict_detected que preserve valores y fuentes deja el juicio final a un humano o al coordinador. Quedarse con la más reciente o promediar descarta información válida, y marcar todo como no fiable tira matices legítimos."},
]

_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
NEW_TOPIC_IDS = {TOPIC5_ID, TOPIC6_ID}


def ulid(rng):
    return "".join(rng.choice(_ALPHABET) for _ in range(26))


def main():
    with open(SRC, encoding="utf-8") as f:
        data = json.load(f)

    # 1) Idempotencia: quitar variantes y las preguntas de los 2 temas nuevos.
    data["questions"] = [
        q for q in data["questions"]
        if VARIANT_TAG not in q.get("studyMetadata", {}).get("tags", [])
        and q.get("topicId") not in NEW_TOPIC_IDS
    ]
    data["topics"] = [t for t in data["topics"] if t["id"] not in NEW_TOPIC_IDS]

    # 2) Añadir los temas nuevos.
    for tm in TOPIC_META:
        data["topics"].append({
            "id": tm["id"], "order": tm["order"], "title": tm["title"], "questionCount": 15,
        })
    scen_by_topic = {tm["id"]: tm["scenario"] for tm in TOPIC_META}
    title_by_topic = {tm["id"]: tm["title"] for tm in TOPIC_META}
    tag_by_topic = {tm["id"]: tm["tag"] for tm in TOPIC_META}

    # 3) Construir las preguntas base nuevas.
    rng = random.Random(20260725)
    for item in NEW:
        tid = item["topic"]
        correct_key = item["correct"]
        options = []
        correct_id = None
        correct_text = ""
        for key in ["A", "B", "C", "D"]:
            oid = ulid(rng)
            options.append({"id": oid, "key": key, "text": item[key]})
            if key == correct_key:
                correct_id = oid
                correct_text = item[key]
        data["questions"].append({
            "id": ulid(rng),
            "topicId": tid,
            "order": item["order"],
            "type": "multiple_choice",
            "scenario": {"title": title_by_topic[tid], "body": scen_by_topic[tid]},
            "prompt": item["prompt"],
            "options": options,
            "answer": {
                "correctOptionId": correct_id,
                "correctOptionKey": correct_key,
                "text": correct_text,
                "justification": item["just"],
            },
            "studyMetadata": {
                "tags": [tag_by_topic[tid]],
                "difficulty": item.get("difficulty", "intermediate"),
                "sourceOrder": item["order"],
            },
        })

    # 4) Recalcular questionCount por topic.
    counts = {}
    for q in data["questions"]:
        counts[q["topicId"]] = counts.get(q["topicId"], 0) + 1
    for t in data["topics"]:
        t["questionCount"] = counts.get(t["id"], 0)

    with open(SRC, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    total = len(data["questions"])
    print(f"OK: banco base con {total} preguntas ({len(data['topics'])} temas). "
          f"Ahora ejecuta: python expand-question-bank.py")


if __name__ == "__main__":
    main()
