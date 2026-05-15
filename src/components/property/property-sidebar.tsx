"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/lib/actions/inquiry-actions";
import { useDictionary } from "@/components/providers/dictionary-provider";
import type { PropertyWithImages } from "@/lib/types";

type ModalType = "viewing" | "info" | null;

type Props = {
  property: PropertyWithImages;
};

export function PropertySidebar({ property: p }: Props) {
  const dict = useDictionary();
  const [modal, setModal] = useState<ModalType>(null);
  const priceNote =
    p.type === "rent" ? dict.sidebar.monthlyFurnished : dict.sidebar.askingPrice;

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <>
      <div className="sticky top-24 self-start">
        <div className="bg-bg-card border border-border p-8">
          <div className="font-display text-[2.2rem] text-accent font-medium mb-1">
            {p.priceDisplay}
          </div>
          <div className="text-[0.72rem] text-text-muted mb-6">{priceNote}</div>

          <Button
            variant="primary"
            className="w-full mb-2.5 justify-center"
            onClick={() => setModal("viewing")}
          >
            {p.type === "sale" ? dict.sidebar.scheduleViewing : dict.sidebar.applyNow}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => setModal("info")}
          >
            {dict.sidebar.requestInfo}
          </Button>

          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
            <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center font-display text-[1.1rem] text-accent shrink-0">
              {p.agentName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-[0.9rem] font-medium">{p.agentName}</div>
              <div className="text-[0.7rem] text-text-muted">{p.agentTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <ContactSheet
          type={modal}
          propertyId={p.id}
          propertyName={p.name}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

/* ─── CONTACT SHEET ─── */

type SheetProps = {
  type: "viewing" | "info";
  propertyId: string;
  propertyName: string;
  onClose: () => void;
};

function ContactSheet({ type, propertyId, propertyName, onClose }: SheetProps) {
  const dict = useDictionary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const isViewing = type === "viewing";
  const title = isViewing ? dict.sheet.viewingTitle : dict.sheet.infoTitle;
  const subtitle = isViewing ? dict.sheet.viewingSubtitle : dict.sheet.infoSubtitle;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("sending");

    const fullMessage = [
      isViewing && date ? `Preferred date: ${date}` : null,
      isViewing && timeSlot ? `Preferred time: ${timeSlot}` : null,
      message || null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await submitInquiry({
        propertyId,
        name,
        email,
        phone: phone || null,
        message: fullMessage || null,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-[8px]"
        style={{ animation: "sheet-backdrop 0.35s ease both" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-[480px] bg-[#0f0f0f] border-l border-accent/20 flex flex-col overflow-y-auto"
        style={{ animation: "sheet-slide 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-10 pb-6 border-b border-white/5">
          <div>
            <p className="text-[0.55rem] tracking-[0.35em] uppercase text-accent/70 mb-2">
              {propertyName}
            </p>
            <h2 className="font-display text-[1.9rem] font-light leading-tight">
              {title}
            </h2>
            <p className="text-[0.78rem] text-text-muted mt-2 leading-relaxed max-w-[300px]">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-accent/40 transition-colors duration-300 mt-1 shrink-0"
            aria-label={dict.sheet.close}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-text-muted fill-none stroke-[1.5]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-8">
          {status === "done" ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center py-16"
              style={{ animation: "sheet-backdrop 0.4s ease both" }}
            >
              <div className="w-14 h-14 border border-accent/30 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-[1.5]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light mb-3">{dict.sheet.submitted}</h3>
              <p className="text-text-muted text-[0.82rem] leading-relaxed max-w-[260px]">
                {dict.sheet.confirmBefore}{" "}
                <span className="text-text-secondary">{email}</span>{" "}
                {dict.sheet.confirmAfter}
              </p>
              <button
                onClick={onClose}
                className="mt-8 text-[0.68rem] tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer font-body"
              >
                {dict.sheet.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={`${dict.sheet.fullName} *`}>
                <SheetInput
                  placeholder={dict.sheet.fullName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field label={`${dict.sheet.email} *`}>
                <SheetInput
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field label={isViewing ? `${dict.sheet.phone} *` : dict.sheet.phone}>
                <SheetInput
                  type="tel"
                  placeholder="+90 5__ ___ __ __"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={isViewing}
                />
              </Field>

              {isViewing && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label={dict.sheet.preferredDate}>
                    <SheetInput
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Field>
                  <Field label={dict.sheet.timeSlot}>
                    <SheetSelect
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      <option value="">{dict.sheet.selectTime}</option>
                      <option value="morning">{dict.sheet.morning}</option>
                      <option value="afternoon">{dict.sheet.afternoon}</option>
                      <option value="evening">{dict.sheet.evening}</option>
                    </SheetSelect>
                  </Field>
                </div>
              )}

              <Field label={dict.sheet.messageOptional}>
                <textarea
                  placeholder={isViewing ? dict.sheet.viewingNotes : dict.sheet.infoQuestion}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary placeholder:text-text-muted/50 outline-none transition-colors duration-300 focus:border-accent/40 resize-none font-body"
                />
              </Field>

              {status === "error" && (
                <p className="text-[0.75rem] text-rose bg-rose/10 px-3 py-2">
                  {dict.sheet.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-accent text-bg-primary text-[0.7rem] tracking-[0.2em] uppercase font-semibold font-body transition-all duration-400 hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending"
                  ? dict.sheet.sending
                  : isViewing
                    ? dict.sheet.submitViewing
                    : dict.sheet.submitInfo}
              </button>

              <p className="text-center text-[0.65rem] text-text-muted/60">
                {dict.sheet.privacyNote}
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes sheet-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sheet-slide {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

/* ─── FIELD PRIMITIVES ─── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.62rem] tracking-[0.15em] uppercase text-text-muted/80">
        {label}
      </label>
      {children}
    </div>
  );
}

function SheetInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full bg-white/[0.03] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary placeholder:text-text-muted/50 outline-none transition-colors duration-300 focus:border-accent/40 font-body ${className ?? ""}`}
      {...props}
    />
  );
}

function SheetSelect({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full bg-[#0f0f0f] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary outline-none transition-colors duration-300 focus:border-accent/40 font-body appearance-none"
      {...props}
    >
      {children}
    </select>
  );
}
