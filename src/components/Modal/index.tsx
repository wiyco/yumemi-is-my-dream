"use client";

import "./index.scss";

import { Xmark } from "iconoir-react";
import { atom, useAtom } from "jotai";

import { cn } from "@/utils/cn";

/**
 * Jotai atom for modal state.
 * ```tsx
 * const [isModalOpen, setIsModalOpen] = useAtom(modalAtom);
 * ```
 */
export const modalAtom = atom(false);

/**
 * Modal (Dialog) component.
 * ```tsx
 * <Modal header="String or Element">
 *  <p>Children content</p>
 * </Modal>
 * ```
 * Use `modalAtom` to open and close the modal.
 * @param header - Header content
 * @param children - Children content
 */
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
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
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
