"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display text-3xl font-light tracking-[0.35em] uppercase mb-2">
            ATTIL<span className="text-accent">A</span>
          </div>
          <p className="text-[0.75rem] text-text-muted tracking-[0.1em] uppercase">
            Yönetim Paneli
          </p>
        </div>

        {/* Form */}
        <div className="bg-bg-card border border-border p-8">
          <h1 className="font-display text-xl font-normal mb-6">Giriş Yap</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <Label>E-posta</Label>
              <Input
                type="email"
                placeholder="admin@attila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Şifre</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-[0.78rem] text-rose bg-rose-muted px-3 py-2">
                {error}
              </div>
            )}

            <Button
              variant="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </Button>
          </form>
        </div>

        <p className="text-center text-[0.68rem] text-text-muted mt-6">
          Erişim yalnızca yetkili acentelere açıktır.
        </p>
      </div>
    </div>
  );
}
