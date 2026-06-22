from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(
    api_key=GROQ_API_KEY
)


def generate_answer(
    question: str,
    context_chunks: list[str]
):

    context = "\n\n".join(context_chunks)

    prompt = f"""
You are a document assistant.

Answer ONLY using the provided context.

If the answer is not present in the context,
say:

"I could not find that information in the document."

Context:
{context}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1
    )

    return response.choices[0].message.content