import Button from "@/components/button";
import type { Option } from "@/types/option.type";

interface SelectButton<T> {
  children: React.ReactNode;
  options: Option<T>[];
  showSelected: boolean;
  setShowSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export default function SelectButton<T>({
  children,
  options,
  showSelected,
  setShowSelected,
  setValue,
}: SelectButton<T>) {
  return (
    <div className="w-fit relative">
      <Button
        type="button"
        onClick={() => setShowSelected(!showSelected)}
        className="bg-blue-800"
      >
        {children}
      </Button>
      {showSelected === true && (
        <div className="min-w-40 bg-white rounded-md shadow-md shadow-zinc-600 overflow-hidden absolute top-12 right-1/12">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                setValue(option.value);
                setShowSelected(false);
              }}
              className={`font-medium text-sm text-left w-full py-2 px-5 text-zinc-700 border-b border-zinc-300 hover:bg-blue-800 hover:text-white ${i == options.length - 1 ? "border-b-0" : ""} `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
