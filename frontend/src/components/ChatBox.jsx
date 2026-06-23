import {
  useState
} from "react";

import api from "../services/api";

import ChatMessage from "./ChatMessage";

function ChatBox({
  documentId
}) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askQuestion =
    async () => {
      if (!documentId) {
        alert(
          "Select a document first"
        );
        return;
      }

      if (
        !question.trim()
      ) {
        return;
      }

      try {
        setLoading(true);

        const response =
          await api.post(
            "/chat/ask",
            null,
            {
              params: {
                document_id:
                  documentId,
                question:
                  question,
              },
            }
          );

        setAnswer(
          response.data
            .answer
        );
      } catch (error) {
        console.error(error);

        setAnswer(
          "Failed to get answer"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>
        Ask Questions
      </h2>

      <input
        type="text"
        value={question}
        placeholder="Ask a question..."
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
      />

      <button
        onClick={
          askQuestion
        }
      >
        Ask
      </button>

      {loading && (
        <p>
          Thinking...
        </p>
      )}

      {answer && (
        <ChatMessage
          answer={answer}
        />
      )}
    </div>
  );
}

export default ChatBox;