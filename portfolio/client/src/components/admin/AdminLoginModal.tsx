import { useState, type ChangeEvent, type FormEvent } from "react";
import { ShieldCheck, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useAdmin } from "../../hooks/useAdmin";

export default function AdminLoginModal() {
  const { isDark } = useTheme();
  const { isLoginOpen, closeLoginModal, login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoginOpen) {
    return null;
  }

  const onClose = () => {
    setUsername("");
    setPassword("");
    setError(null);
    closeLoginModal();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const isLoggedIn = await login(username.trim(), password.trim());

    if (!isLoggedIn) {
      setError("Invalid credentials.");
      setSubmitting(false);
      return;
    }

    setUsername("");
    setPassword("");
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
          isDark ? "border-white/10 bg-bg-surface text-text-main" : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mint">Hidden Access</p>
            <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold">
              <ShieldCheck className="h-5 w-5 text-mint" />
              Admin Login
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-2 transition-colors ${
              isDark ? "text-text-muted hover:bg-white/10 hover:text-text-main" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
            aria-label="Close login modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors ${
                isDark
                  ? "border-white/10 bg-bg-main text-text-main placeholder:text-text-muted focus:border-mint/60"
                  : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-mint/60"
              }`}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors ${
                isDark
                  ? "border-white/10 bg-bg-main text-text-main placeholder:text-text-muted focus:border-mint/60"
                  : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-mint/60"
              }`}
              autoComplete="off"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
