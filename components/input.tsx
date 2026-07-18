type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`bg-transparent border border-zinc-400 px-2.5 py-1.5 rounded-md text-sm active:border-white ${props.className}`}
    />
  );
}
