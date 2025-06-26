import { useState } from "react";

export default function CopyToClipboard({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    setIsCopied((prev) => {
      return !prev;
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    await navigator.clipboard.writeText(textToCopy);
  }

  return (
    <button onClick={handleCopy}> {isCopied ? "Copied!" : "Copy"} </button>
  );
}
