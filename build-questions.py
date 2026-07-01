#!/usr/bin/env python3
"""Genera los archivos de datos que consume la web estatica, uno por idioma.

El sitio es 100% estatico y debe funcionar abriendo index.html con doble clic
(protocolo file://), donde fetch() sobre archivos locales esta bloqueado por el
navegador. Por eso los datos se embeben en archivos .js que registran cada
banco en window.QUESTION_BANKS[<lang>].

Salidas:
  study-question-bank.json     -> questions.js      (window.QUESTION_BANKS['es'])
  study-question-bank.en.json  -> questions.en.js   (window.QUESTION_BANKS['en'])

Uso:  python build-questions.py
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# (archivo fuente, archivo salida, codigo de idioma)
TARGETS = [
    ("study-question-bank.json", "questions.js", "es"),
    ("study-question-bank.en.json", "questions.en.js", "en"),
]


def slim(data):
    """Deja solo lo que la app necesita, para mantener el archivo liviano."""
    out = {
        "title": data.get("title"),
        "description": data.get("description"),
        "language": data.get("language", ""),
        "topics": data.get("topics", []),
        "questions": [],
    }
    for q in data["questions"]:
        out["questions"].append({
            "id": q["id"],
            "topicId": q.get("topicId"),
            "scenario": q.get("scenario", {}),
            "prompt": q.get("prompt", ""),
            "options": [{"key": o["key"], "text": o["text"]} for o in q["options"]],
            "answer": {
                "correctOptionKey": q["answer"]["correctOptionKey"],
                "justification": q["answer"].get("justification", ""),
            },
            "difficulty": q.get("studyMetadata", {}).get("difficulty", ""),
        })
    return out


def main():
    for src_name, out_name, lang in TARGETS:
        src = os.path.join(HERE, src_name)
        out = os.path.join(HERE, out_name)
        if not os.path.exists(src):
            print(f"AVISO: no existe {src_name}, se omite {out_name}.")
            continue
        with open(src, encoding="utf-8") as f:
            data = json.load(f)
        payload = json.dumps(slim(data), ensure_ascii=False, indent=1)
        banner = (
            "/* ARCHIVO GENERADO AUTOMATICAMENTE por build-questions.py. NO editar a mano. */\n"
            f"/* Fuente de verdad: {src_name} */\n"
        )
        with open(out, "w", encoding="utf-8") as f:
            f.write(banner)
            f.write("window.QUESTION_BANKS = window.QUESTION_BANKS || {};\n")
            f.write(f"window.QUESTION_BANKS[{json.dumps(lang)}] = ")
            f.write(payload)
            f.write(";\n")
        print(f"OK: {len(data['questions'])} preguntas ({lang}) -> {out_name}")


if __name__ == "__main__":
    main()
