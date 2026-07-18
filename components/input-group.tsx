import Input from "@/components/input";
import Label from "@/components/label";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export default function InputGroup({ children, ...props }: InputGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.id as string}>{children}</Label>
      <Input {...props} />
    </div>
  );
}
