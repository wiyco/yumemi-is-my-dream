import "./index.scss";

import React from "react";

import { cn } from "@/utils/cn";

export function Sidebar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <aside className={cn("sidebar-root", className)}>{children}</aside>;
}
