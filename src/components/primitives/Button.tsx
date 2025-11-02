import React from "react";

type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

/* Responsive Button */
const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  children,
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes =
    "px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:ring-neutral-400",
    ghost:
      "bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-300",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {label || children}
    </button>
  );
};

export default Button;