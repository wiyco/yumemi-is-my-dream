"use client";

import "./index.scss";

import { Xmark } from "iconoir-react";
import { atom, useAtom } from "jotai";

import { cn } from "@/utils/cn";

export const modalAtom = atom(false);

export function Modal({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useAtom(modalAtom);

  return (
    <div
      className={cn(
        "modal-root",
        isModalOpen ? "grid opacity-100" : "hidden opacity-0"
      )}
      onClick={(e) =>
        e.target === e.currentTarget && setIsModalOpen((prev) => !prev)
      }
    >
      <div className={cn("modal-wrap", isModalOpen ? "scale-100" : "scale-0")}>
        <section className="modal-header">
          <span>{header}</span>
          <button onClick={() => setIsModalOpen((prev) => !prev)}>
            <Xmark />
          </button>
        </section>
        <section className="modal-body">{children}</section>
      </div>
    </div>
  );
}
