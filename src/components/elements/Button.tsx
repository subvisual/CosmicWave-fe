import classNames from "classnames";

interface Props {
  type: "button" | "submit";
  disabled?: boolean;
  handleClick?: () => void;
  variant?: "primary" | "secondary";
  extraClass?: string;
  children: string | React.ReactNode;
}

export default function Button({
  type = "button",
  disabled = false,
  handleClick,
  extraClass,
  variant = "primary",
  children,
}: Props) {
  const variantClasses = {
    primary: "bg-slate-200 text-white hover:bg-slate-300",
    secondary:
      "bg-transparent text-slate-100 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 hover:bg-opacity-20",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        variantClasses[variant],
        extraClass,
        "inline-flex items-center rounded-full selection:justify-center px-4 py-2.5 text-sm font-medium shadow-sm disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:ring-gray-200"
      )}
    >
      {children}
    </button>
  );
}
