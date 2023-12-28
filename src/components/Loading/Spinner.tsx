import SpinnerIconSrc from "@/assets/icons/spinner.svg";
import Image from "next/image";

interface SpinnerProps {
  src?: string;
}

const Spinner = ({ src = SpinnerIconSrc }: SpinnerProps) => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="me-2 inline h-4 w-4 animate-spin text-gray-600">
        <Image priority src={src} alt="spinner" />
      </div>
      Loading
    </div>
  );
};

export default Spinner;
