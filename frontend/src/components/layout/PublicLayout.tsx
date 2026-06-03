export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>{/* TODO: nav + lang switch */}</header>
      <main className="flex-1">{children}</main>
      <footer>{/* TODO: footer */}</footer>
    </div>
  )
}
