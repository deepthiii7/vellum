import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import ExtractionTable from "../components/ExtractionTable";

function ExtractPage() {
  const [documents,
    setDocuments] =
    useState([]);

  const [selectedDocument,
    setSelectedDocument] =
    useState("");

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
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Information Extraction
      </h1>

      <select
        value={
          selectedDocument
        }
        onChange={(e) =>
          setSelectedDocument(
            e.target.value
          )
        }
      >
        <option value="">
          Select Document
        </option>

        {documents.map(
          (doc) => (
            <option
              key={doc.id}
              value={doc.id}
            >
              {doc.filename}
            </option>
          )
        )}
      </select>

      <hr />

      <ExtractionTable
        documentId={
          selectedDocument
        }
      />
    </div>
  );
}

export default ExtractPage;