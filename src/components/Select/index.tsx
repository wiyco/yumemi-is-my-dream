import "./index.scss";

import { cn } from "@/utils/cn";

type SelectProps = {
  className?: string;
  label?: string;
  id?: string;
  onChange?: React.ComponentProps<"select">["onChange"];
  options?: React.ComponentProps<"option">[];
};

export function Select({
  className,
  id,
  label,
  onChange,
  options,
}: SelectProps) {
  return (
    <div className={cn("select-root", className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select className="select-selector" id={id} onChange={onChange}>
        {options?.map((option, index) => (
          <option key={index} {...option}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
