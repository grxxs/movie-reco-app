import Link from "next/link";

type ButtonProps = React.ComponentProps<typeof Link>;

const base = "py-2 px-4 text-sm font-bold rounded border";

export default function LinkButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Link {...rest} className={`${base} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
