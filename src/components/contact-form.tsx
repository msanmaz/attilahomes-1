"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { submitInquiry } from "@/lib/actions/inquiry-actions";
import { useDictionary } from "@/components/providers/dictionary-provider";

export function ContactForm() {
  const dict = useDictionary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("sending");
    try {
      await submitInquiry({
        propertyId: null,
        name,
        email,
        phone: phone || null,
        message: message || null,
      });
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-bg-card border border-border p-8">
      <h2 className="font-display text-xl font-normal mb-6">{dict.contactForm.title}</h2>

      {status === "sent" ? (
        <div className="text-center py-8">
          <div className="font-display text-2xl mb-2 text-accent">{dict.contactForm.thankYou}</div>
          <p className="text-text-secondary text-[0.85rem]">
            {dict.contactForm.sentMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-[0.72rem] text-accent uppercase tracking-[0.1em] bg-transparent border-none cursor-pointer font-body hover:text-accent-hover transition-colors"
          >
            {dict.contactForm.anotherMessage}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{dict.contactForm.fullName}</Label>
              <Input placeholder={dict.contactForm.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dict.contactForm.email}</Label>
              <Input type="email" placeholder={dict.contactForm.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dict.contactForm.phone}</Label>
            <Input type="tel" placeholder={dict.contactForm.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dict.contactForm.message}</Label>
            <Textarea placeholder={dict.contactForm.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          {status === "error" && (
            <div className="text-[0.78rem] text-rose bg-rose-muted px-3 py-2">
              {dict.contactForm.error}
            </div>
          )}

          <Button variant="primary" className="w-full justify-center" disabled={status === "sending"}>
            {status === "sending" ? dict.contactForm.sending : dict.contactForm.send}
          </Button>
          <p className="text-[0.72rem] text-text-muted text-center">
            {dict.contactForm.disclaimer}
          </p>
        </form>
      )}
    </div>
  );
}
