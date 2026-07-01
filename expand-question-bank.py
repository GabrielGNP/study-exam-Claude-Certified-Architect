#!/usr/bin/env python3
"""Amplia study-question-bank.json con variantes REFORMULADAS de cada pregunta.

Objetivo (pedido por el usuario): agregar mas consignas que siguen exactamente
la misma logica, reescribiendo la redaccion para evitar la memorizacion y
reforzar la comprension.

Estrategia segura: para cada pregunta original se crea una variante que
  - reescribe el enunciado (prompt) con otra redaccion pero identico sentido,
  - REUTILIZA las mismas opciones, la misma opcion correcta y la misma
    justificacion (asi es imposible introducir una respuesta correcta erronea).

El script es idempotente: elimina variantes previas (tag 'variant_reworded')
antes de volver a generarlas, para poder re-ejecutarlo sin duplicar.

Uso:  python expand-question-bank.py   &&   python build-questions.py
"""
import json
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "study-question-bank.json")
VARIANT_TAG = "variant_reworded"

# Enunciados reformulados, indexados por el 'order' original (1..60).
# Cada uno conserva TODOS los detalles que determinan la respuesta correcta.
REWORDED = {
    1: "El revisor automatico de tu CI reincide en marcar decisiones deliberadas de tu equipo: force-unwrap de opcionales en archivos de test, clases coordinadoras grandes propias de tu arquitectura, e imports de modulos internos etiquetados como deprecated en el SDK publico. Alrededor del 30% de los hallazgos terminan descartados como falsos positivos propios del proyecto. ¿Que opcion impide de raiz que el modelo produzca esos hallazgos, entregandole las convenciones del proyecto como contexto permanente en cada revision?",
    2: "Ya en marcha, tu revision automatizada muestra alta precision pero recall bajo: se le escapan bugs reales. Al investigar descubres que el prompt le pide a Claude 'reportar solo problemas de alta confianza de los que este seguro' y 'errar del lado de no comentar'. Al equipo le gusta el bajo ruido, pero una race condition que provoco una caida en produccion estaba a la vista en un PR revisado y no se reporto. Debes elevar sustancialmente la deteccion de bugs sin disparar los falsos positivos a niveles inmanejables. ¿Cual es el enfoque mas efectivo?",
    3: "Tu revision automatizada emite muchos hallazgos por PR, pero los desarrolladores descartan cerca de la mitad como 'no vale la pena'. Al analizarlos ves que los descartados suelen ser tecnicamente correctos pero se refieren a preferencias de estilo menores o a patrones aceptables en tu codebase. Antes de sumar complejidad de infraestructura, ¿que ajuste en el diseño del prompt reduciria mas los descartes sin perder la deteccion de problemas reales?",
    4: "Tu revisor usa un unico prompt que abarca seguridad, diseño de API y correccion de logica de negocio. Tu suite de evaluacion arroja recall alto en diseño de API (82%) pero bajo en casos borde de logica de negocio (34%). Al sumar ejemplos few-shot de bugs de logica, el recall de logica sube a 41% pero el de diseño de API baja a 68%. ¿Como resolver este trade-off para mejorar la deteccion en ambas categorias?",
    5: "Al final de cada ciclo semanal de release, un paso de tu pipeline clasifica y resume unos 200 commits para generar las notas de version. Hoy cada commit se manda como una llamada separada a la Messages API con un modelo tier Sonnet. Las notas no hacen falta hasta la mañana siguiente (toleran ~12 horas de latencia). Necesitas bajar el costo de API por token de este paso conservando el mismo modelo y los mismos prompts (sin cambiar tier ni calidad de salida). ¿Que enfoque cumple todas estas restricciones?",
    6: "Tu revision de codigo automatizada deja pasar bugs reales en los PRs. Investigando, ves que el prompt contiene: 'Marca solo problemas criticos que definitivamente causarian fallas en produccion. Ignora lo menor y todo aquello de lo que no estes seguro.' Los desarrolladores confirman que varios bugs perdidos son errores logicos reales que el modelo si investigo pero decidio no reportar. El equipo exige que la salida siga siendo estructurada (cada hallazgo con metadata) y accionable. ¿Que cambio en el prompt elimina la causa de los hallazgos suprimidos y conserva la salida estructurada y etiquetada para filtrar despues?",
    7: "Con la revision automatizada activa, los desarrolladores reportan que ~35% de los hallazgos son falsos positivos con patrones consistentes: sugerencias de estilo que chocan con las convenciones del equipo, alertas de seguridad para patrones seguros en tu contexto de despliegue, y sugerencias de rendimiento que empeorarian tu caso de uso. Quieres bajar los falsos positivos sin perder la capacidad de detectar problemas reales. ¿Que enfoque le permite mejor al modelo generalizar su criterio a patrones de codigo nuevos que nunca vio?",
    8: "Tu pipeline de revision produce en promedio 18 hallazgos por PR. El feedback revela tres tipos de ruido: (1) estilo y formato que tu linter ya aplica en CI, (2) hallazgos sobre codigo de plantilla autogenerado bajo src/gen/, y (3) helpers de renderizado que son convenciones intencionales del proyecto pero se marcan por parecerse a anti-patrones. Apenas unos 4 hallazgos por PR son bugs logicos reales. ¿Cual es la forma mas efectiva de reducir este ruido sin perder la deteccion de problemas reales?",
    9: "En las pruebas iniciales del pipeline notas que revisar PRs grandes (50+ archivos) a veces supera los 20 minutos y cuesta $8-12 por corrida por los extensos bucles agenticos: Claude lee archivos, corre herramientas de analisis e itera muchas veces. Tu equipo necesita que cada invocacion se detenga al llegar a un numero fijo de iteraciones y a un monto fijo en dolares, aplicado por el propio Claude Code y no por el runner del job. ¿Que ajuste de configuracion impone directamente ambos limites por invocacion?",
    10: "Tu pipeline revisa unos 200 scripts de migracion de base de datos por dia via Message Batches API. Cada request del batch lleva un system prompt compartido de 8.000 tokens (guias de revision de migraciones mas documentacion de esquema) seguido del script individual. Ya pusiste breakpoints de cache_control en ese system prompt compartido en cada request, pero el monitoreo muestra solo 32% de cache hits, con los misses concentrados en las requests procesadas mas tarde dentro de la ventana del batch. ¿Que cambio ataca la causa raiz de esos misses sin agregar latencia de procesamiento secuencial?",
    11: "Tu CI hace revisiones de codigo con foco en seguridad sobre unos 50 PRs diarios, hoy a $150/dia con la API sincrona. Las revisiones no son bloqueantes: los devs mergean cuando pasan los tests y atienden los hallazgos en commits posteriores. Evaluas la Message Batches API por su 50% de ahorro. ¿Que factor determina principalmente si el procesamiento por lotes es apropiado para este caso?",
    12: "Tu revision automatizada llama a la API por cada PR usando tool_use con una herramienta report_findings que devuelve un array JSON de hallazgos (cada uno con file_path, line_number, severity, category y description). Probando con un PR grande que toca 30+ archivos, la respuesta llega al limite de max_tokens y el JSON se trunca a la mitad, haciendo fallar al parser del pipeline. ¿Cual es la forma mas efectiva de manejarlo?",
    13: "Tu pipeline ejecuta un `claude -p` con `--dangerously-skip-permissions` y un `--system-prompt` armado por concatenacion ('You are a code reviewer. Analyze the provided diff for bugs, security issues, and style violations.'), alimentando el diff por stdin. Las revisiones se completan y devuelven feedback, pero Claude solo comenta el texto del diff que recibe por pipe: nunca lee archivos vecinos del repo clonado para entender el contexto mas amplio, incluso cuando el diff toca una funcion llamada por muchos modulos. ¿Que cambio en la invocacion hara que Claude lea los archivos relacionados del repositorio sin perder tus instrucciones de revision personalizadas?",
    14: "Construiste una herramienta de revision basada en LLM que analiza PRs y emite hallazgos estructurados. Cada hallazgo es un objeto JSON con file_path, line_number, issue_category (p. ej. 'security', 'style') y description. Los desarrolladores pueden hacer 'dismiss' en cualquier hallazgo poco util; hoy se descarta el 35%. Quieres analizar esos descartes para entender que falla en tu sistema y mejorar tus prompts. ¿Que cambio en la estructura de salida seria mas util para ese analisis?",
    15: "Tus prompts de revision incluyen tanto el cambio de implementacion como su archivo de tests, pero los comentarios del LLM no señalan caminos de codigo sin pruebas. El analisis muestra que el modelo detecta bien las funciones que no tienen ningun test, pero no identifica cuando ramas condicionales o caminos de manejo de errores dentro de funciones ya testeadas carecen de cobertura. ¿Cual es la forma mas efectiva de mejorar la deteccion de gaps de cobertura a nivel de ramas sin sobrecomplicar el pipeline?",
    16: "Los usuarios reportan que los reportes finales a veces les falta profundidad en ciertos subtemas. Ves que el agente de analisis de documentos suele detectar brechas (por ejemplo, 'las fuentes hablan de autenticacion de API pero no de patrones de token refresh'), pero con el pipeline estricto actual ese insight no es accionable porque la busqueda ya termino. ¿Cual es el cambio arquitectonico mas efectivo?",
    17: "El agente de sintesis termina su paso inicial pero avisa que tres preguntas clave de investigacion quedan sin responder porque los agentes de busqueda web y analisis de documentos no hallaron informacion relevante sobre esos subtemas. Hoy el coordinador pasa directo a generar el reporte, produciendo reportes con cobertura incompleta. ¿Que cambio mejoraria mas la completitud de la investigacion?",
    18: "Terminadas las tareas de los subagentes de busqueda web y analisis de documentos, el coordinador debe poner en marcha al subagente de sintesis para que combine los hallazgos. ¿Cual es la forma correcta de proveerle al subagente de sintesis la informacion que necesita?",
    19: "El agente de busqueda web reunio varias fuentes relevantes para un tema. Ahora el agente de analisis de documentos necesita examinarlas. ¿Como fluye tipicamente la informacion entre estos dos subagentes especializados?",
    20: "Al analizar casos legales complejos que citan multiples precedentes, el subagente de analisis de documentos los procesa de a uno. Un fallo emblematico con 12 precedentes tarda mas de 3 minutos en analizarse por completo. ¿Cual es la forma mas efectiva de bajar esa latencia sin perder la capacidad del coordinador de monitorear y depurar el sistema?",
    21: "Concluidas las tareas del agente de busqueda web y del de analisis de documentos, el coordinador invoca al agente de sintesis. Pero este responde que no puede completar la tarea porque no se le entregaron hallazgos de investigacion. ¿Cual es la causa mas probable?",
    22: "En produccion observas que consultas simples de verificacion de hechos (p. ej. '¿en que año se firmo el Acuerdo de Paris sobre el Clima?') recorren los cuatro subagentes en secuencia, gastando mas de 40 segundos y muchos tokens por consulta. La investigacion comparativa compleja si aprovecha el pipeline completo. La distribucion de consultas es diversa y cambia a medida que los usuarios descubren usos nuevos. ¿Cual es el enfoque mas efectivo para optimizar frente a esa variedad de complejidad?",
    23: "Las revisiones de produccion muestran un manejo inconsistente de la incertidumbre en los reportes finales. A veces hallazgos contradictorios de los subagentes se funden en una unica afirmacion confiada (se pierde el matiz), y otras veces el reporte se llena de salvedades hasta volverse inutil. Cuando busqueda web devuelve 'analistas estiman un mercado de $50B (metodologia varia)' y analisis de documentos devuelve 'estudio revisado por pares estima $35B (±$7B, IC 95%)', el coordinador elige uno al azar o produce frases vagas como 'el mercado podria ser $35B-$50B segun factores'. ¿Que enfoque sistematico lo resuelve mejor?",
    24: "El coordinador le da al subagente de busqueda web instrucciones paso a paso muy detalladas: consultas exactas, prioridades de fuente y filtros de fecha. El monitoreo de produccion revela tres problemas: (1) el subagente reporta 'resultados insuficientes' en vez de probar enfoques alternativos cuando las busquedas prefijadas fallan, (2) la calidad cae para temas emergentes que no encajan con los patrones esperados, y (3) casi nunca encuentra fuentes tangenciales valiosas. ¿Cual es la forma mas efectiva de mejorar la adaptabilidad del subagente?",
    25: "Tu pipeline de investigacion multi-agente fallo tras procesar 12 de 28 documentos. El agente de busqueda web ya habia identificado fuentes relevantes, el analizador de documentos habia completado parcialmente la extraccion y el sintetizador habia empezado a identificar patrones. Necesitas reanudar sin rehacer trabajo ni perder la fidelidad de los hallazgos previos. ¿Que enfoque de gestion de estado equilibra mejor la fidelidad de la informacion y la eficiencia de contexto al restaurar el estado de los agentes?",
    26: "El coordinador tiene AgentDefinitions para los cuatro subagentes, cada una con descripcion, prompt y restricciones de herramientas adecuadas. Probando, notas que el coordinador razona bien cuando corresponde delegar (emite mensajes como 'Le pedire al agente de busqueda web que encuentre fuentes sobre esto') pero nunca se ejecuta ningun subagente. Luego sigue como si la delegacion hubiera ocurrido y continua con informacion incompleta. Los logs no muestran errores. ¿Cual es la causa mas probable?",
    27: "El agente de sintesis recibe hallazgos resumidos de busqueda web y analisis de documentos y luego pasa un resumen consolidado al generador de reportes. Probando, descubres que los reportes hacen afirmaciones factuales sin las citas correctas: el generador no puede atribuir las frases a sus fuentes originales porque esos metadatos se perdieron durante los pasos de resumen. ¿Cual es el enfoque mas efectivo para asegurar una atribucion de fuentes adecuada en los reportes finales?",
    28: "Configuraste el sistema de modo que los cuatro subagentes tengan acceso al conjunto completo de 18 herramientas. Probando, los agentes suelen llamar a herramientas fuera de su especialidad: el de sintesis intenta busquedas web y el generador de reportes intenta analizar documentos. ¿Cual es la causa principal de esta mala seleccion de herramientas?",
    29: "En produccion, los reportes finales suelen contener afirmaciones sin la atribucion de fuente adecuada. El analisis muestra que, mientras los agentes de busqueda web y analisis de documentos si adjuntan bien las citas a sus salidas, el agente de sintesis pierde el rastro de que fuentes respaldan que conclusiones al combinar los hallazgos. ¿Cual es el cambio arquitectonico mas efectivo?",
    30: "El monitoreo de produccion muestra que las consultas de seguimiento como 'resumi lo que aprendimos sobre tendencias de mercado' tardan sistematicamente mas de 40 segundos. Investigando, ves que el coordinador genera el subagente de sintesis para cada pedido de resumen, pasandole mas de 80K tokens de hallazgos acumulados que el coordinador ya tiene en su propio contexto de la orquestacion. ¿Cual es la forma mas efectiva de mejorar el tiempo de respuesta de estos resumenes de seguimiento?",
    31: "Tu agente paso 25 minutos explorando el subsistema de renderizado de un motor de juegos (codigo de shaders, gestion de buffers, logica de sincronizacion de frames). Ahora un ingeniero le pide entender como el motor de fisicas se integra con el renderizado para los overlays de debug de colisiones. Notas que las respuestas recientes hablan de 'patrones tipicos de renderizado' en lugar de las clases concretas VulkanPipeline y FrameGraph que ya habia descubierto. ¿Cual es el enfoque mas efectivo?",
    32: "Configuraste tu agente Claude con tres servidores MCP: uno para operaciones git, uno para gestion de tickets Jira y uno para busqueda de documentacion. Cuando un usuario pide 'crea una rama para JIRA-123 y agrega links de documentacion al ticket', ¿como accede el agente a las herramientas de estos servidores?",
    33: "Ayer un ingeniero uso el agente para analizar un modulo de autenticacion legado e identifico dos enfoques de refactor: extraer un microservicio o refactorizar en el lugar. Hoy quiere explorar ambos a fondo (que el agente proponga cambios de codigo concretos para cada uno) antes de decidir cual implementar. ¿Cual es la forma mas efectiva de estructurar esa exploracion?",
    34: "Tu herramienta de exploracion de codebase guarda IDs de sesion para que los ingenieros retomen investigaciones entre jornadas. Un ingeniero paso una hora ayer analizando un modulo de autenticacion legado, acumulando contexto sobre su arquitectura y dependencias, y quiere seguir hoy. El ID de sesion es valido, pero el control de versiones muestra que 3 de los 12 archivos que el agente habia leido fueron modificados durante la noche por el merge de un compañero. ¿Que enfoque equilibra mejor eficiencia y precision?",
    35: "Probando, ves que en sesiones de exploracion largas (mas de 30 minutos) el agente empieza a dar respuestas inconsistentes sobre la estructura de codigo que ya habia discutido. Los ingenieros dicen tener que repetir el contexto de modulos que ya exploraron. ¿Cual es el enfoque mas efectivo para resolverlo?",
    36: "Un ingeniero le pide a tu agente agregar tests exhaustivos a un codebase legado de 200 archivos con cobertura minima existente. No indico que modulos priorizar. ¿Como deberia el agente descomponer esta tarea abierta?",
    37: "Tu agente necesita insertar una nueva funcion helper en el medio de un modulo utilitario de 150 lineas, entre dos funciones existentes. La herramienta Edit falla porque su old_string no encuentra texto unico para coincidir: el archivo tiene docstrings, nombres de variables y patrones estructurales repetidos. ¿Cual es la forma mas confiable de completar la insercion?",
    38: "Un ingeniero le pide a tu agente identificar los caminos de codigo sin tests en un modulo de procesamiento de pagos legado de 45 archivos. Tras leer los primeros 8 archivos fuente, las respuestas del agente se vuelven bastante menos precisas: olvida patrones ya discutidos y aun no localizo todos los archivos de test ni trazo los flujos de pago criticos. ¿Cual es el enfoque mas efectivo para completar esta investigacion?",
    39: "Un ingeniero le pide al agente encontrar todos los callers de una funcion antes de eliminarla. La funcion se define en una biblioteca central pero tambien se expone via modulos wrapper que la renombran para uso del dominio (por ejemplo, calculateTax en la biblioteca pasa a computeOrderTax en el modulo de ordenes). ¿Que estrategia de exploracion identificara de forma mas confiable todos los callers?",
    40: "Una ingeniera uso Claude Code ayer para investigar los flujos de autenticacion de un monolito legado, acumulando bastante contexto en una sesion de 2 horas. Hoy quiere continuar esa investigacion especifica. Desde entonces trabajo en otros tres codebases y sabe que la sesion se llamaba 'auth-deep-dive'. ¿Como deberia reanudarla?",
    41: "Tu asistente de revision debe analizar PRs y dar feedback sobre tres aspectos: cumplimiento del estilo de codigo, posibles problemas de seguridad y completitud de la documentacion. Cada aspecto requiere leer archivos, correr herramientas de analisis y generar una seccion del reporte. El proceso sigue el mismo flujo de tres pasos en cada PR. ¿Que patron de descomposicion de tareas es el mas apropiado para este flujo?",
    42: "Un ingeniero le pide al agente encontrar todos los archivos del monorepo que importan el paquete @company/auth para entender como se usa la autenticacion en los servicios. ¿Que herramienta integrada es la mas apropiada para esta tarea?",
    43: "Un ingeniero recien incorporado le pide al agente ayuda para entender la arquitectura de autenticacion y autorizacion antes de hacer mejoras de seguridad. El codebase tiene mas de 800 archivos repartidos en varios servicios. ¿Que estrategia de exploracion construira la comprension mas efectivamente, dadas las herramientas integradas de Claude y los limites de contexto?",
    44: "Un ingeniero le pide al agente entender como funciona la capa de cache antes de agregar un nuevo disparador de invalidacion. Tras busquedas iniciales con Grep, el agente determino que la logica de cache abarca 15 archivos entre decoradores, middleware y clases de servicio (~8.000 lineas en total). ¿Cual es el siguiente paso mas efectivo para construir comprension gestionando las restricciones de contexto?",
    45: "El subagente de exploracion de un ingeniero paso 30 minutos analizando un sistema de pagos legado, leyendo 47 archivos y documentando flujos de datos. La sesion se corto cuando cayo la conexion del ingeniero. Mientras estuvo fuera, un compañero mergeo un PR que renombro dos funciones utilitarias. El ingeniero quiere continuar la misma exploracion. ¿Cual es el enfoque mas efectivo?",
    46: "Te asignaron agregar actualizaciones en tiempo real a la aplicacion. Se podria implementar con WebSockets, Server-Sent Events o polling, cada uno con distinta complejidad, soporte de navegador y requisitos de infraestructura. ¿Cual es la forma mas efectiva de arrancar esta tarea?",
    47: "El CLAUDE.md de tu equipo incluye la regla: 'Usar indentacion de 4 espacios y siempre correr el formato Prettier.' Aun asi, las revisiones muestran que ~30% de los archivos que genera Claude Code quedan con formato inconsistente: a veces 2 espacios, a veces sin trailing commas. Agregar enfasis ('IMPORTANTE: DEBES usar el formato Prettier') baja las violaciones a ~15% pero no las elimina. ¿Cual es la forma mas efectiva de garantizar que todo el codigo generado quede con formato consistente?",
    48: "Necesitas agregar una validacion de fechas que asegure que las fechas de los eventos sean futuras. Requiere sumar una condicional a una funcion existente en un unico archivo. ¿Cual es el enfoque mas apropiado?",
    49: "Tu equipo migra seguido componentes de React a Vue. Escribiste un flujo paso a paso para que Claude Code lo siga en cada migracion y quieres que todos lo invoquen escribiendo /migrate-component. El flujo debe mantenerse sincronizado a medida que el equipo lo itera. ¿Donde deberias colocar el archivo del skill?",
    50: "Tu equipo conecto un servidor MCP propio que ofrece plantillas de flujo de trabajo DevOps. El servidor expone varios prompts MCP (como deploy_checklist e incident_response) ademas de herramientas. ¿Como se vuelven accesibles esos prompts MCP dentro de Claude Code?",
    51: "Tu monorepo guarda estandares compartidos en /docs/standards/: security-rules.md (para servicios que manejan datos de usuario), testing-patterns.md (para todos los paquetes) y api-conventions.md (para servicios expuestos como API). Tus 15 paquetes se organizan por dominio de feature (/packages/auth/, /packages/billing/, etc.) sin convenciones de nombre que indiquen cuales manejan datos de usuario o exponen APIs. Se espera que cada mantenedor configure sus ajustes locales, ya que conoce los requisitos de su paquete. Hoy todos los CLAUDE.md de paquete duplican los tres estandares, aplicando guia irrelevante. ¿Cual es el enfoque mas efectivo?",
    52: "Documentaste las convenciones de manejo de errores de API en un CLAUDE.md en la raiz del proyecto, indicando que los handlers de endpoints deben usar una clase ApiError propia. Tras varias sesiones, notas que Claude Code a veces sigue esa convencion y a veces usa try/catch genericos con mensajes de texto. La inconsistencia parece aleatoria entre sesiones. ¿Cual es el primer paso diagnostico mas eficiente?",
    53: "Tu equipo tiene tres requisitos para el comportamiento de Claude Code en el proyecto: (1) Claude nunca debe modificar archivos en db/migrations/; (2) Claude deberia preferir tu modulo de logging propio sobre console.log; (3) todos los archivos TypeScript deben formatearse automaticamente con Prettier despues de cada edicion. Hoy los tres estan escritos como instrucciones en el CLAUDE.md del proyecto. Durante un refactor complejo, un desarrollador descubre que Claude edito un archivo de migracion, violando el requisito #1. ¿Como deberias reestructurar estos requisitos en los mecanismos de configuracion de Claude Code?",
    54: "Una auditoria de seguridad exige actualizar tu biblioteca de autenticacion de v2 a v3. La guia de migracion documenta cambios que rompen compatibilidad: authenticate() ahora devuelve una Promise en vez de aceptar un callback, el tipo User tiene campos reestructurados y se eliminaron tres metodos deprecados. Grep muestra que la biblioteca se importa en 45 archivos de varios modulos. ¿Cual es el enfoque mas efectivo?",
    55: "Estas implementando una capa de cache para respuestas de API para acelerar el endpoint /products. Tienes una idea aproximada (Redis con TTL de 5 minutos) pero sos nuevo en caching en produccion y no estas seguro de que otras consideraciones exige una implementacion robusta. ¿Cual es la forma mas efectiva de iniciar tu flujo de trabajo iterativo?",
    56: "Estas implementando un algoritmo de recorrido de grafos complejo con requisitos de rendimiento especificos y casos borde a manejar (nodos desconectados, ciclos, aristas ponderadas). Quieres estructurar tu flujo para refinar de forma iterativa y eficiente con Claude. ¿Que enfoque habilitara mejor la mejora progresiva a lo largo de varias iteraciones?",
    57: "Tu equipo quiere que Claude siga un checklist de revision detallado (8 items sobre cambios de API, cobertura de tests, documentacion, seguridad, etc.) al revisar PRs. El equipo tambien usa Claude para muchas otras tareas: escribir features, depurar problemas de produccion y generar documentacion. Hoy los desarrolladores pegan el checklist al inicio de cada sesion de revision. ¿Que enfoque atiende mejor esta necesidad del flujo de trabajo?",
    58: "Tu equipo esta configurando servidores MCP en Claude Code. Quieres agregar un servidor compartido de busqueda de venues al que todos deberian tener acceso, y personalmente quieres agregar un servidor experimental de playlists de musica que solo vos estas probando. ¿Que enfoque de configuracion aplica correctamente los scopes de servidores MCP?",
    59: "Un bug critico afecta a usuarios de produccion. Los logs de error muestran excepciones en el modulo OrderProcessing con un stack trace claro que apunta a una funcion especifica. Nunca trabajaste con este modulo. ¿Cual es el enfoque mas efectivo?",
    60: "Le pediste a Claude Code una funcionalidad de generacion de reportes PDF. La implementacion inicial consulta la base de datos correctamente, pero la salida tiene problemas de formato: las columnas de la tabla son muy angostas y truncan contenido, las fechas se muestran sin el formato correcto y el manejo de saltos de pagina es incorrecto. Notaste que estos problemas interactuan: cambiar el ancho de columnas afecta como se renderizan las fechas, y los saltos de pagina dependen de la altura del contenido. ¿Cual es el enfoque mas efectivo para iterar hacia una solucion funcional?",
}

_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"  # Crockford base32 (estilo ULID)


def ulid(rng):
    return "".join(rng.choice(_ALPHABET) for _ in range(26))


def main():
    with open(SRC, encoding="utf-8") as f:
        data = json.load(f)

    # 1) Quitar variantes previas para que el script sea idempotente.
    originals = [q for q in data["questions"]
                 if VARIANT_TAG not in q.get("studyMetadata", {}).get("tags", [])]

    if len(originals) != len(REWORDED):
        raise SystemExit(
            f"Se esperaban {len(REWORDED)} preguntas originales pero hay {len(originals)}. "
            "Revisa REWORDED.")

    rng = random.Random(20260630)  # semilla fija -> IDs reproducibles
    max_order = max(q["order"] for q in originals)
    variants = []

    for q in sorted(originals, key=lambda x: x["order"]):
        reworded = REWORDED.get(q["order"])
        if not reworded:
            raise SystemExit(f"Falta el enunciado reformulado para order={q['order']}")

        # Nuevas opciones: mismo texto y misma key, ids nuevos. Preservamos cual
        # es la correcta emparejando por 'key' (nunca cambia el sentido).
        new_options = []
        correct_key = q["answer"]["correctOptionKey"]
        correct_id = None
        for o in q["options"]:
            oid = ulid(rng)
            new_options.append({"id": oid, "key": o["key"], "text": o["text"]})
            if o["key"] == correct_key:
                correct_id = oid

        max_order += 1
        variants.append({
            "id": ulid(rng),
            "topicId": q["topicId"],
            "order": max_order,
            "type": q.get("type", "multiple_choice"),
            "scenario": q.get("scenario", {}),
            "prompt": reworded,
            "options": new_options,
            "answer": {
                "correctOptionId": correct_id,
                "correctOptionKey": correct_key,
                "text": q["answer"]["text"],
                "justification": q["answer"]["justification"],
            },
            "studyMetadata": {
                "tags": list(q.get("studyMetadata", {}).get("tags", [])) + [VARIANT_TAG],
                "difficulty": q.get("studyMetadata", {}).get("difficulty", "intermediate"),
                "sourceOrder": q["order"],
                "variantOf": q["id"],
            },
        })

    data["questions"] = originals + variants

    # Recalcular questionCount por topic.
    counts = {}
    for q in data["questions"]:
        counts[q["topicId"]] = counts.get(q["topicId"], 0) + 1
    for t in data["topics"]:
        t["questionCount"] = counts.get(t["id"], 0)

    with open(SRC, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"OK: {len(originals)} originales + {len(variants)} variantes = "
          f"{len(data['questions'])} preguntas totales.")


if __name__ == "__main__":
    main()
