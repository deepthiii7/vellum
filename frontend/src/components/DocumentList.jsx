import api from "../services/api";

function DocumentList({
  documents,
  onDeleteSuccess
}) {

  const handleDelete =
    async (documentId) => {

      const confirmed =
        window.confirm(
          "Delete this document?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await api.delete(
          `/documents/${documentId}`
        );

        if (
          onDeleteSuccess
        ) {
          onDeleteSuccess();
        }

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete document"
        );
      }
    };

  return (
    <div>
      <h2>
        Uploaded Documents
      </h2>

      <ul>
        {documents.map(
          (doc) => (
            <li
              key={doc.id}
              style={{
                marginBottom:
                  "10px",
              }}
            >
              {doc.filename}

              <button
                style={{
                  marginLeft:
                    "10px",
                  background:
                    "#dc2626",
                }}
                onClick={() =>
                  handleDelete(
                    doc.id
                  )
                }
              >
                Delete
              </button>

            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default DocumentList;