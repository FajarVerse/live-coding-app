interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="font-medium text-sm">
      {children}
    </label>
  );
}
