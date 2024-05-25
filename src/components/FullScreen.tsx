export function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-full w-full place-content-center">
      {children}
    </main>
  );
}
