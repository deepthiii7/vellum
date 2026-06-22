from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(
    api_key=GROQ_API_KEY
)


def compare_documents(
    document_a: str,
    document_b: str
):

    prompt = f"""
Compare these two documents.

Document A:
{document_a}

Document B:
{document_b}

Provide:

1. Executive Summary

2. Key Differences

3. Information Present In A But Missing In B

4. Information Present In B But Missing In A

Keep response concise and structured.
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