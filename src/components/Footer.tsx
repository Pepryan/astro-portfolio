export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="max-w-3xl mx-auto px-4 py-3 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          © {currentYear} | Febryan Ramadhan. All rights reserved.
        </p>
        <p className="flex items-center justify-center gap-2 mt-0.5 text-xs text-neutral-500 dark:text-neutral-500">
          <span>Built with Astro and Claude AI</span>
        </p>
      </div>
    </footer>
  );
}
