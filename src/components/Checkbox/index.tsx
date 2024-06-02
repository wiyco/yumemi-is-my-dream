"use client";

import "./index.scss";

type CheckboxProps = {
  children?: React.ReactNode;
  id?: string;
  checked?: React.ComponentProps<"input">["checked"];
  value?: React.ComponentProps<"input">["value"];
  onChange?: React.ComponentProps<"input">["onChange"];
};

export function Checkbox({
  children,
  id,
  checked,
  value,
  onChange,
}: CheckboxProps) {
  return (
    <div className="checkbox-root">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
