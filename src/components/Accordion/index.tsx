import "./index.scss";

import { NavArrowDown } from "iconoir-react";
import { atom, useAtom } from "jotai";

import { cn } from "@/utils/cn";

const accordionAtom = atom(false);

/**
 * Accordion state hook.
 * ```tsx
 * const [isOpen, setIsOpen] = useAccordion();
 * ```
 */
export const useAccordion = () => useAtom(accordionAtom);

/**
 * Accordion component.
 * ```tsx
 * <Accordion header="String or Element">
 *  <p>Children content</p>
 * </Accordion>
 * ```
 * Use `useAccordion` to open and close the accordion.
 * @param header - Header content
 * @param children - Children content
 */
export function Accordion({
  children,
  header,
  showIcon = true,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  showIcon?: boolean;
}) {
  const [isOpen, setIsOpen] = useAccordion();

  return (
    <div className="accordion-root">
      <button
        className="accordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {header}
        {showIcon && (
          <span
            className={cn(
              "accordion-header-chevron",
              isOpen ? "rotate-0" : "rotate-90"
            )}
          >
            <NavArrowDown />
          </span>
        )}
      </button>
      <section className={cn("accordion-body", isOpen ? "h-full" : "h-0")}>
        {children}
      </section>
    </div>
  );
}
