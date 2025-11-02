import React from "react";

type SelectOption = { value: string; label: string };

type SelectProps = {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
};

/* Responsive Select */
const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-sm sm:text-base font-medium text-neutral-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          border border-neutral-300 rounded-md
          px-2 py-1.5 sm:px-3 sm:py-2
          text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-white
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;