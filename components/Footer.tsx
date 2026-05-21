export function Footer() {
  return (
    <footer className="border-t border-gray-800/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} processing.platform — MVP build</div>
        <div className="flex gap-6">
          <a href="/api/health" className="hover:text-brand transition">Status</a>
          <a href="https://github.com/simba-stack/processing-platform" target="_blank" rel="noopener" className="hover:text-brand transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
