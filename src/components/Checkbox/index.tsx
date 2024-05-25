"use client";

import "./index.scss";

export function Checkbox({
  children,
  id,
  value,
  onChange,
}: {
  children?: React.ReactNode;
  id?: string;
  value?: React.ComponentProps<"input">["value"];
  onChange?: React.ComponentProps<"input">["onChange"];
}) {
  return (
    <div className="checkbox-root">
      <input type="checkbox" id={id} value={value} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
