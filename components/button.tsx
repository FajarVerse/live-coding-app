interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`text-sm font-medium py-1.5 px-3 rounded-sm md:px-5 md:rounded-md lg:text-base cursor-pointer ${className}`}
      {...props}
    >
      {children}  
    </button>
  );
}
