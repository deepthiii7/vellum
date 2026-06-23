import json
from pathlib import Path

import faiss
import numpy as np

from app.services.embedding_service import (
    generate_embeddings
)

INDEX_DIR = Path(
    "app/vectorstore/faiss_index"
)

METADATA_DIR = Path(
    "app/vectorstore/metadata"
)

INDEX_DIR.mkdir(
    parents=True,
    exist_ok=True
)

METADATA_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def build_and_save_index(
    document_id,
    chunks
):

    embeddings = generate_embeddings(
        chunks
    )

    embeddings = np.array(
        embeddings,
        dtype="float32"
    )

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(
        dimension
    )

    index.add(embeddings)

    index_path = (
        INDEX_DIR /
        f"doc_{document_id}.index"
    )

    faiss.write_index(
        index,
        str(index_path)
    )

    metadata_path = (
        METADATA_DIR /
        f"doc_{document_id}.json"
    )

    with open(
        metadata_path,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            chunks,
            f,
            ensure_ascii=False
        )

def load_index(
    document_id
):

    index_path = (
        INDEX_DIR /
        f"doc_{document_id}.index"
    )

    metadata_path = (
        METADATA_DIR /
        f"doc_{document_id}.json"
    )

    index = faiss.read_index(
        str(index_path)
    )

    with open(
        metadata_path,
        encoding="utf-8"
    ) as f:
        chunks = json.load(f)

    return index, chunks

def search_chunks(
    query,
    index,
    chunks,
    model,
    top_k=3
):

    query_embedding = model.encode(
        [query]
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for idx in indices[0]:

        if idx < len(chunks):
            results.append(
                chunks[idx]
            )

    return results

def delete_index(document_id):
    index_path = (
        INDEX_DIR /
        f"doc_{document_id}.index"
    )

    metadata_path = (
        METADATA_DIR /
        f"doc_{document_id}.json"
    )

    if index_path.exists():
        index_path.unlink()

    if metadata_path.exists():
        metadata_path.unlink()