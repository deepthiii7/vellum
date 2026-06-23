import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "white",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
        }}
      >
        Workspace
      </h3>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <li>
          <Link to="/">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/upload">
            📄 Upload
          </Link>
        </li>

        <li>
          <Link to="/chat">
            💬 Chat
          </Link>
        </li>

        <li>
          <Link to="/compare">
            ⚖️ Compare
          </Link>
        </li>

        <li>
          <Link to="/extract">
            🔍 Extract
          </Link>
        </li>
      </ul>

      <hr
        style={{
          marginTop: "25px",
          marginBottom: "25px",
        }}
      />

      <div>
        <h4>Capabilities</h4>

        <small>
          RAG
          <br />
          Semantic Search
          <br />
          Document Comparison
          <br />
          Information Extraction
        </small>
      </div>
    </aside>
  );
}

export default Sidebar;