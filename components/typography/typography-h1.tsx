interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyH1({
  children,
  className,
}: TypographyH1Props) {
  return (
    <h1 className={`font-bold text-2xl text-white ${className}`}>{children}</h1>
  );
}
