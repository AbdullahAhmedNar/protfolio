import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

const ADMIN_SESSION_KEY = "portfolio-admin-session-v1";
const SECRET_CLICK_THRESHOLD = 7;
const ADMIN_HASH_PARTS = ["tRJMlaHI9F7Vhsix", "yA8tZTwMtDaL5g9r", "VVU7YfrT65k="];
const ADMIN_SALT = "portfolio-admin-salt-v1";

interface AdminContextValue {
  isAdmin: boolean;
  isLoginOpen: boolean;
  registerSecretTap: () => void;
  closeLoginModal: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

function secureEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;

  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

async function deriveCredentialHash(value: string) {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey("raw", encoder.encode(value), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(ADMIN_SALT),
      iterations: 210000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const bytes = new Uint8Array(bits);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => window.localStorage.getItem(ADMIN_SESSION_KEY) === "1");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const clickCount = useRef(0);

  const registerSecretTap = useCallback(() => {
    clickCount.current += 1;

    if (clickCount.current >= SECRET_CLICK_THRESHOLD) {
      clickCount.current = 0;
      setIsLoginOpen(true);
    }
  }, []);

  const closeLoginModal = useCallback(() => {
    clickCount.current = 0;
    setIsLoginOpen(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    if (!window.crypto?.subtle) {
      return false;
    }

    if (username !== password) {
      return false;
    }

    const providedHash = await deriveCredentialHash(password);
    const expectedHash = ADMIN_HASH_PARTS.join("");

    if (!secureEqual(providedHash, expectedHash)) {
      return false;
    }

    window.localStorage.setItem(ADMIN_SESSION_KEY, "1");
    setIsAdmin(true);
    setIsLoginOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      isAdmin,
      isLoginOpen,
      registerSecretTap,
      closeLoginModal,
      login,
      logout,
    }),
    [isAdmin, isLoginOpen, registerSecretTap, closeLoginModal, login, logout]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used inside an AdminProvider");
  }

  return context;
}
