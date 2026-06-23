import { useState } from "react";
import api from "../services/api";

function ExtractionTable({
  documentId
}) {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleExtraction =
    async () => {
      if (!documentId) {
        alert(
          "Select a document first"
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await api.post(
            "/extract",
            null,
            {
              params: {
                document_id:
                  documentId,
              },
            }
          );

        setData(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <button
        onClick={
          handleExtraction
        }
      >
        Extract Insights
      </button>

      {loading && (
        <p>
          Extracting...
        </p>
      )}

      {data && (
        <>
          <hr />

          <h2>Dates</h2>

          <ul>
            {data.dates?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <h2>Numbers</h2>

          <ul>
            {data.numbers?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <h2>Entities</h2>

          <ul>
            {data.entities?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <h2>
            Key Facts
          </h2>

          <ul>
            {data.key_facts?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default ExtractionTable;