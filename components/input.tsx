type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="bg-transparent border-2 border-white px-2.5 py-1.5 rounded-md text-sm"
    />
  );
}
