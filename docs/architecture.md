# Architecture

## System Overview

Vellum is a Multi-Document Intelligence Platform built using FastAPI, React, PostgreSQL, FAISS, and Groq.

---

## Processing Pipeline

```text
PDF Upload
↓
Text Extraction
↓
Chunking
↓
Embeddings
↓
FAISS Index
↓
Semantic Retrieval
↓
Groq LLM
↓
Answer Generation
```

---

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL

Responsibilities:

* Document management
* Text extraction
* Vector indexing
* RAG orchestration

---

## AI Layer

* SentenceTransformers
* FAISS
* Groq

Responsibilities:

* Embeddings
* Semantic Search
* Question Answering
* Comparison
* Extraction

---

## Frontend

* React
* Vite
* Axios

Responsibilities:

* Upload UI
* Chat Interface
* Comparison Interface
* Extraction Interface

---

## Storage

### PostgreSQL

Stores:

* Document metadata

### Local Storage

Stores:

* Uploaded PDFs
* FAISS indexes
* Chunk metadata
