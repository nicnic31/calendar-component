import cn from "classnames";

type ShapeNames = "circle" | "rounded" | "pill";

type VariantNames = "contained" | "outlined" | "text";

type ColorNames = "primary" | "default" | "success" | "error" | "info";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ShapeNames;
  variant?: VariantNames;
  children: React.ReactNode;
  color?: ColorNames;
}

const colors = (color: string) => {
  switch (color) {
    case "primary":
      return "red";
    case "default":
      return "blue-500";
    case "success":
      return "emerald-500";
    case "error":
      return "rose-600";
    case "info":
      return "slate-600";
    default:
      return "white";
  }
};

const shapes = (shapes: string) => {
  switch (shapes) {
    case "pill":
    case "circle":
      return "rounded-full";
    case "rounded":
      return "rounded-md";
    default:
      return "";
  }
};

const variants = (variant: string, color: string) => {
  switch (variant) {
    case "contained":
      return `bg-${color} text-white`;
    case "outlined":
      return `bg-white border border-${color} text-${color}`;
    case "text":
      return `bg-transparent text-${color}`;
    default:
      return "";
  }
};

export default function Button({
  shape = "circle",
  variant = "text",
  color = "primary",
  children,
  ...buttonProps
}: IButtonProps) {
  return (
    <button
      className={cn(
        "p-2 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-300 duration-300",
        shapes(shape),
        variants(variant, colors(color))
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
