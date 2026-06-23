import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import ComparePanel from "../components/ComparePanel";

function ComparePage() {
  const [documents,
    setDocuments] =
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
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Document Comparison
      </h1>

      <ComparePanel
        documents={
          documents
        }
      />
    </div>
  );
}

export default ComparePage;