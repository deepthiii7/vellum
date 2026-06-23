import { useState } from "react";
import api from "../services/api";

function UploadCard({
  onUploadSuccess
}) {
  const [file, setFile] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const handleUpload =
    async () => {
      if (!file) {
        setMessage(
          "Please select a PDF"
        );
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      try {
        const response =
          await api.post(
            "/documents/upload",
            formData
          );

        setMessage(
          `Uploaded: ${response.data.filename}`
        );

        if (
          onUploadSuccess
        ) {
          onUploadSuccess();
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "Upload failed"
        );
      }
    };

  return (
    <div>
      <h2>
        Upload PDF
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          handleUpload
        }
      >
        Upload
      </button>

      <p>{message}</p>
    </div>
  );
}

export default UploadCard;