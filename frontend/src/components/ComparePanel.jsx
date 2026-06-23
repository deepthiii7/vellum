import { useState } from "react";
import api from "../services/api";

function ComparePanel({
  documents
}) {
  const [documentA,
    setDocumentA] =
    useState("");

  const [documentB,
    setDocumentB] =
    useState("");

  const [comparison,
    setComparison] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleCompare =
    async () => {
      if (
        !documentA ||
        !documentB
      ) {
        alert(
          "Select two documents"
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await api.post(
            "/compare",
            null,
            {
              params: {
                document_a_id:
                  documentA,
                document_b_id:
                  documentB,
              },
            }
          );

        setComparison(
          response.data
            .comparison
        );
      } catch (error) {
        console.error(error);

        setComparison(
          "Comparison failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>
        Compare Documents
      </h2>

      <select
        value={documentA}
        onChange={(e) =>
          setDocumentA(
            e.target.value
          )
        }
      >
        <option value="">
          Select Document A
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

      <br />
      <br />

      <select
        value={documentB}
        onChange={(e) =>
          setDocumentB(
            e.target.value
          )
        }
      >
        <option value="">
          Select Document B
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

      <br />
      <br />

      <button
        onClick={
          handleCompare
        }
      >
        Compare
      </button>

      {loading && (
        <p>
          Comparing...
        </p>
      )}

      {comparison && (
        <>
          <h3>
            Result
          </h3>

          <div
            style={{
              whiteSpace:
                "pre-wrap",
            }}
          >
            {comparison}
          </div>
        </>
      )}
    </div>
  );
}

export default ComparePanel;