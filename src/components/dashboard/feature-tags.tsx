"use client";

import { useState, type KeyboardEvent } from "react";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function FeatureTags({ value, onChange }: Props) {
  const [input, setInput] = useState("");

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 p-2 bg-bg-input border border-border min-h-[48px] cursor-text transition-[border-color] duration-300 focus-within:border-accent"
        onClick={() => document.getElementById("feature-input")?.focus()}
      >
        {value.map((tag, i) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-muted text-accent text-[0.72rem] font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex items-center justify-center w-3.5 h-3.5 bg-transparent border-none text-accent opacity-60 hover:opacity-100 cursor-pointer text-sm leading-none p-0"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id="feature-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={value.length === 0 ? "Type and press Enter…" : ""}
          className="bg-transparent border-none text-text-primary font-body text-[0.82rem] outline-none flex-1 min-w-[120px] p-0.5 placeholder:text-text-muted"
        />
      </div>
      <span className="text-[0.65rem] text-text-muted mt-1 block">
        Press Enter to add each feature
      </span>
    </div>
  );
}
