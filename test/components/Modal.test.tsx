import "@testing-library/jest-dom";

import { Modal, useModal } from "@components/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

/** Test component for Modal */
const ModalTest = ({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) => {
  const [, setIsModalOpen] = useModal();
  return (
    <>
      <Modal header={header}>{children}</Modal>
      <button onClick={() => setIsModalOpen((prev) => !prev)}>
        Open Modal
      </button>
    </>
  );
};

describe("Modal component", () => {
  // Reset modal state before each test
  beforeEach(() => {
    render(<ModalTest header="Test Header">Test Content</ModalTest>);
  });

  test("Should not be visible initially", () => {
    const modalRoot = screen.getByTestId("modal-root");
    expect(modalRoot).toHaveClass("invisible", "opacity-0");
  });

  test("Open and Close", () => {
    // Open modal by clicking the button
    const openButton = screen.getByText("Open Modal");
    fireEvent.click(openButton);
    const modalRoot = screen.getByTestId("modal-root");
    expect(modalRoot).toHaveClass("visible", "opacity-100");

    // Close modal by clicking the close button
    const closeButton = screen.getByTestId("modal-close");
    fireEvent.click(closeButton);
    expect(modalRoot).toHaveClass("invisible", "opacity-0");

    // Open modal again
    fireEvent.click(openButton);
    expect(modalRoot).toHaveClass("visible", "opacity-100");

    // Close modal by clicking outside the modal
    fireEvent.click(modalRoot);
    expect(modalRoot).toHaveClass("invisible", "opacity-0");
  });
});
