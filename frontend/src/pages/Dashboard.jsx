import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

function Dashboard() {
  const [documents, setDocuments] =
    useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments =
    async () => {
      try {
        const response =
          await api.get(
            "/documents"
          );

        setDocuments(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h1
        className="page-title"
      >
        Vellum Dashboard
      </h1>

      <div className="card">
        <h2>
          Total Documents
        </h2>

        <h1>
          {documents.length}
        </h1>
      </div>

      <div className="card">
        <h2>
          Quick Actions
        </h2>

        <br />

        <p>
          • Upload PDFs
        </p>

        <p>
          • Ask Questions
        </p>

        <p>
          • Compare Documents
        </p>

        <p>
          • Extract Insights
        </p>

        <br />

        <Link to="/upload">
          <button>
            Upload Document
          </button>
        </Link>
      </div>

      <div className="card">
        <h2>
          Recent Documents
        </h2>

        <br />

        <ul>
          {documents
            .slice(-5)
            .reverse()
            .map(
              (doc) => (
                <li
                  key={doc.id}
                >
                  {doc.filename}
                </li>
              )
            )}
        </ul>
      </div>

      <div className="card">
        <h2>
          Platform Features
        </h2>

        <br />

        <p>
          ✓ PDF Upload
        </p>

        <p>
          ✓ Retrieval-Augmented Generation (RAG)
        </p>

        <p>
          ✓ Semantic Search
        </p>

        <p>
          ✓ Document Comparison
        </p>

        <p>
          ✓ Structured Extraction
        </p>

        <p>
          ✓ FAISS Vector Search
        </p>
      </div>
    </div>
  );
}

export default Dashboard;