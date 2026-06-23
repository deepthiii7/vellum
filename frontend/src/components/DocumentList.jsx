function DocumentList({
  documents
}) {
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
            >
              {doc.filename}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default DocumentList;