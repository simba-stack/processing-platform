import { LkSidebar } from "@/components/LkSidebar";

export default function LkLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 md:gap-16">
      <LkSidebar />
      <section className="flex-1 min-w-0">{children}</section>
    </main>
  );
}
