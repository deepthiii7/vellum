import json

from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(
    api_key=GROQ_API_KEY
)


def extract_information(text: str):

    prompt = f"""
Extract structured information from the document.

Return ONLY raw JSON.

Do not use markdown.
Do not use code fences.
Do not explain anything.

Format:

{{
  "dates": [],
  "numbers": [],
  "entities": [],
  "key_facts": []
}}

Document:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    content = (
        response.choices[0]
        .message.content
    )

    content = content.strip()

    if content.startswith("```json"):
        content = content.replace(
            "```json",
            "",
            1
        )

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    try:
        return json.loads(content)

    except Exception:
        return {
            "raw_response": content
        }