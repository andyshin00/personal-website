import { useState } from "react";
import { Send } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "7524f4f7-6f97-4af0-aefd-cd88f049aa61";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSending(true);
    setStatus("Sending message...");

    const formData = new FormData(event.target);
    const name = formData.get("name");

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `Portfolio contact from ${name}`);
    formData.append("from_name", "Andrew Shin's Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent — thanks for reaching out!");
        event.target.reset();
      } else {
        setStatus("Message failed to send. Please try again.");
      }
    } catch {
      setStatus("Message failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 pb-24 pt-2">
      <h1 className="font-serif font-bold text-4xl md:text-5xl text-text mb-8">
        contact me
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {/* Honeypot spam field — hidden from real visitors, bots fill it in */}
        <input type="checkbox" name="botcheck" className="hidden" />

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="border border-border rounded-lg px-4 py-3 bg-transparent text-text placeholder:text-muted focus:outline-none focus:border-text transition"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="border border-border rounded-lg px-4 py-3 bg-transparent text-text placeholder:text-muted focus:outline-none focus:border-text transition"
          />
        </div>

        <textarea
          name="message"
          required
          rows={5}
          placeholder="Send me a message!"
          className="w-full resize-none border border-border rounded-lg px-4 py-3 bg-transparent text-text placeholder:text-muted focus:outline-none focus:border-text transition mb-4"
        />

        <button
          type="submit"
          disabled={isSending}
          className="w-full flex items-center justify-center gap-2 bg-text text-bg font-medium rounded-lg py-3 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Send Message"}
          <Send size={16} />
        </button>

        {status && (
          <p className="text-sm text-muted mt-3 text-center">{status}</p>
        )}
      </form>
    </div>
  );
}
