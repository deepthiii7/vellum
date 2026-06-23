# API Reference

## Base URL

```text
http://localhost:8000
```

---

## Upload Document

### Endpoint

```http
POST /documents/upload
```

### Description

Uploads a PDF document and creates a FAISS index.

---

## List Documents

### Endpoint

```http
GET /documents
```

### Description

Returns all uploaded documents.

---

## Delete Document

### Endpoint

```http
DELETE /documents/{document_id}
```

### Description

Deletes:

* PDF file
* FAISS index
* Metadata
* Database record

---

## Ask Question

### Endpoint

```http
POST /chat/ask
```

### Parameters

```json
{
  "document_id": 1,
  "question": "What skills are mentioned?"
}
```

### Description

Performs Retrieval-Augmented Generation using FAISS and Groq.

---

## Compare Documents

### Endpoint

```http
POST /compare
```

### Parameters

```json
{
  "document_a_id": 1,
  "document_b_id": 2
}
```

### Description

Compares two PDF documents and returns differences.

---

## Extract Information

### Endpoint

```http
POST /extract
```

### Parameters

```json
{
  "document_id": 1
}
```

### Description

Extracts:

* Dates
* Numbers
* Entities
* Key Facts
