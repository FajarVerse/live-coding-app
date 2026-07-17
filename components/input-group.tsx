interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export default function InputGroup({ children, ...props }: InputGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.id} className="font-medium text-sm">
        {children}
      </label>
      <input
        {...props}
        // type="email"
        // id="email"
        // placeholder="Enter your email..."
        className="bg-transparent border-2 border-white px-2.5 py-1.5 rounded-md text-sm"
      />
    </div>
  );
}
