import Button from "@/components/button";

interface ErrorHandleProps {
  onRetry: () => void;
}

export default function ErrorHandle({ onRetry }: ErrorHandleProps) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 py-24 flex flex-col items-center gap-1">
      <h3 className="font-semibold text-6xl text-red-300 text-center">ERROR</h3>
      <p className="font-medium text-base text-red-600 text-center">
        Oops, something went wrong. Please try again.
      </p>
      <Button type="button" onClick={onRetry} className="bg-white text-black w-fit mt-2">
        Try Again
      </Button>
    </div>
  );
}
