const base = "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";

const sizes = {
  sm: "py-1 px-3 text-xs",
  md: "py-2 px-4 text-sm",
  lg: "py-3 px-6 text-base",
};

type ButtonProps = React.ComponentProps<"button"> & {
  size?: keyof typeof sizes;
};

export default function Button({
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={`${base} ${sizes[size]} ${className ?? ""}`}>
      {children}
    </button>
  );
}
