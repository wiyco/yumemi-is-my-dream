export function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-dvh w-full place-content-center">{children}</main>
  );
}
