/* Every entry declares what kind of thing it is. A flat list of names proved
   nothing; the kind is what makes this a reference table instead of a claim.
   Order runs in three bands of six — what the code is written in, what ships
   it, where it runs — so the grid reads in groups without needing headings. */
export const stackItems = [
  { kind: 'library', name: 'React' },
  { kind: 'language', name: 'TypeScript' },
  { kind: 'language', name: 'JavaScript' },
  { kind: 'framework', name: 'Angular' },
  { kind: 'framework', name: 'Astro' },
  { kind: 'markup', name: 'HTML / CSS' },

  { kind: 'styling', name: 'TailwindCSS' },
  { kind: 'build', name: 'Vite + Vitest' },
  { kind: 'runtime', name: 'Bun' },
  { kind: 'version', name: 'Git' },
  { kind: 'infra', name: 'Docker + Docker Compose' },
  { kind: 'env', name: 'Linux / tmux' },

  { kind: 'mobile', name: 'React Native + Expo' },
  { kind: 'mobile', name: 'Capacitor / Android' },
  { kind: 'desktop', name: 'Tauri / Rust' },
  { kind: 'cms', name: 'WordPress / PHP' },
  { kind: 'api', name: 'REST API / OpenAPI' },
  { kind: 'storage', name: 'IndexedDB' },
] as const;
