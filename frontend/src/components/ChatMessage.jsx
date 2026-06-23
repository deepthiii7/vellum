function ChatMessage({
  answer
}) {
  return (
    <div>
      <h3>Answer</h3>

      <div
        style={{
          whiteSpace:
            "pre-wrap",
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default ChatMessage;