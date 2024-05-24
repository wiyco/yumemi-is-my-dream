import "./index.scss";

import { cn } from "@/utils/cn";

export function Header({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <header className={cn("header-root", className)}>{children}</header>;
}
