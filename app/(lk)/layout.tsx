import { LkSidebar } from "@/components/LkSidebar";

export default function LkLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      <LkSidebar />
      <section className="flex-1 min-w-0">{children}</section>
    </main>
  );
}
