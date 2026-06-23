import {
  useEffect,
  useState
} from "react";

import UploadCard from "../components/UploadCard";
import DocumentList from "../components/DocumentList";

import api from "../services/api";

function UploadPage() {
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
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Upload Documents
      </h1>

      <UploadCard
        onUploadSuccess={
          loadDocuments
        }
      />

      <hr />

      <DocumentList
        documents={
          documents
        }
        onDeleteSuccess={
          loadDocuments
        }
      />
    </div>
  );
}

export default UploadPage;