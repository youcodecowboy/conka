/**
 * Copy text to clipboard with fallback support
 * 
 * Attempts to use the modern Clipboard API first, then falls back to
 * document.execCommand for older browsers and mobile contexts.
 * 
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves to true if copy was successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    console.warn("No text provided to copy");
    return false;
  }

  try {
    // Try modern clipboard API first (works on HTTPS/localhost)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers/mobile contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      console.error("Failed to copy using execCommand:", err);
      return false;
    }
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}
