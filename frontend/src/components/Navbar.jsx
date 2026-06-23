function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
          }}
        >
          Vellum
        </h2>

        <small>
          Multi-Document Intelligence Platform
        </small>
      </div>

      <div>
        <span>
          AI-Powered RAG
        </span>
      </div>
    </nav>
  );
}

export default Navbar;