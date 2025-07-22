import { cn } from "@/lib/utils";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { IoIosRadioButtonOn } from "react-icons/io";

export const COD = ({ method, isSelectedPayment }) => {
  const { setValue } = useFormContext();

  return (
    <div
      onClick={() => {
        setValue(
          "paymentMethod",
          {
            type: method.value,
            data: null,
          },
          {
            shouldValidate: true,
          }
        );
      }}
      className={cn(
        "flex justify-between items-center p-3 rounded cursor-pointer",
        isSelectedPayment ? "border border-orange-500" : "border"
      )}
    >
      <div className="flex items-center gap-x-2">
        <div className="relative w-10 h-10">
          <Image
            src={method.icon}
            alt="icon"
            fill
            sizes="(min-width: 768px) 64px, 40px"
            className="object-contain"
          />
        </div>
        {method.label}
      </div>

      <div>
        {isSelectedPayment && (
          <IoIosRadioButtonOn className="text-orange-500" />
        )}
      </div>
    </div>
  );
};
