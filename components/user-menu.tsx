"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type UserMenuProps = {
  user: { name?: string | null; email: string };
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const initial = (user.name?.trim()[0] ?? user.email[0]).toUpperCase();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="user-menu" ref={containerRef}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Account menu"
      >
        {initial}
      </button>

      {isOpen && (
        <div className="user-menu__dropdown" role="menu">
          <div className="user-menu__header">
            <strong>{user.name || "Your account"}</strong>
            <span>{user.email}</span>
          </div>

          <Link
            href="/dashboard"
            className="user-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <Link
            href="/account"
            className="user-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            Account settings
          </Link>

          <button
            type="button"
            className="user-menu__item user-menu__item--danger"
            role="menuitem"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={16} />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}
