import { useState } from "react";

export default function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xdklvjnk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Soft button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition"
      >
        Join the Waitlist 🚀
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Join the Waitlist ✨</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 text-black placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 text-black placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 text-black placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition"
              >
                {status === "loading" ? "Submitting..." : "Join Now"}
              </button>
            </form>
            {status === "success" && <p className="mt-2 text-emerald-600">✅ You're on the waitlist!</p>}
            {status === "error" && <p className="mt-2 text-red-600">❌ Something went wrong. Try again.</p>}
          </div>
        </div>
      )}
    </>
  );
}
