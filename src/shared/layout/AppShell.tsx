import type { ReactNode } from "react";

export function AppShell({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[380px_1fr] md:p-6">
        <aside className="h-[calc(100vh-3rem)] rounded-2xl border bg-white p-4 md:sticky md:top-6">
          {left}
        </aside>
        <main className="h-[calc(100vh-3rem)]">{right}</main>
      </div>
    </div>
  );
}
