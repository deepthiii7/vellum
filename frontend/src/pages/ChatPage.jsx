import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import ChatBox from "../components/ChatBox";

function ChatPage() {
  const [documents, setDocuments] =
    useState([]);

  console.log(documents);

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
        Document Chat
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

      <ChatBox
        documentId={
          selectedDocument
        }
      />
    </div>
  );
}

export default ChatPage;